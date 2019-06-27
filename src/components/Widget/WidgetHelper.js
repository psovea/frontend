import * as R from 'ramda'

const DAY = 86400

/* Inner list should be joined again. */
const fromJoinableList = (ys, n) => ys.map(x => n + "=" + x).join("&")

/* Transport types must be upper case. */
const fromJoinableListToUpper = (ys, n) => ys.map(x => n + "=" + x.toUpperCase()).join("&")

/* We need to strip the line number from the line number string, before we are
 * able to merge them.
 */
const fromJoinableListLine = (ys, n) =>
    ys.map(R.tryCatch(
        (x) => n + "=" + x.match(/([0-9]*):.*/i)[1],
        R.always("")
    )).filter(x => x != "").join("&")

/* Join function for a period. For example: 86000 => 86000s */
const fromPeriod = (y, n) => n + "=" + y.toString() + "s"

/* Some keys have a specific function that is able to join them correctly.
 * Given a key, return that function.
 */
const zipFunc = (n) => (
    {
        "return_filter[]" : fromJoinableList,
        "district[]"      : fromJoinableList,
        "transport_type[]": fromJoinableListToUpper,
        "line_number[]"   : fromJoinableListLine,
        "period"          : fromPeriod
    }[n]
)

/* Implements a custom zipWith function. It checks for each value
 * if it needs a special function, if not, it uses the provided function.
 */
const zipWith = (f, xs, ys) => xs.map((n, i) => {
    const func = zipFunc(n)
    return (func ? func : f)(ys[i], n)
})

/* Set up a query for a period. */
const dayQuery = (start, end) => `start_time=${start}&end_time=${end}`

/* Filter specific keys from a list. TODO: use */
// const filterKeys = R.filter(x => x != "days" && x != "offset" && x != "range")

/* Create a URI that can be used for accessing prometheus. */
const createURI = (keys, vals) =>
    '?' + zipWith((x, y) => y.toString() + "=" + x.toString(), keys, vals).join("&")

/* Create a URI for a specific period */
const periodURI = (keys, vals, dayq) => `${createURI(keys, vals)}&${dayq}`

/* Create uris for a range per day. TODO: refactor even further. */
const rangePerDay = (settings, keys) => {
    let uris = [...Array(settings.range.days + 1).keys()].slice(1).map(day => {
        let offsetDay = day + settings.range.offset
        let day_query = dayQuery(offsetDay * -DAY, (offsetDay - 1) * -DAY)
        let new_keys = keys.filter(x => x != "days" && x != "offset" && x != "range")
        let new_vals = new_keys.map(x => settings[x])
        return periodURI(new_keys, new_vals, day_query)
    })

    return uris.some(x => x == "") ? null : uris
}

/* Create uris for a range cumsum for a period. TODO: refactor even further. */
const rangeCum = (settings, keys) => {
    let start_day = (settings.range.days + settings.range.offset + 1) * -DAY
    let end_day = (settings.range.offset + 1) * -DAY
    let day_query = dayQuery(start_day, end_day)
    let new_keys = keys.filter(x => x != "days" && x != "offset" && x != "range")
    let new_vals = new_keys.map(x => settings[x])

    let uri = periodURI(new_keys, new_vals, day_query)

    return uri == "" ? null : [uri]
}

/* URI for a specific range, can be either per day or cumsum, depending on the settings. */
export const rangeURI = (settings, keys) => (settings.range.perDay ? rangePerDay : rangeCum)(settings, keys)

/* URI for specific days, depending on the settings. */
export const daysURI = (settings, keys) => {
    let uris = [...Array(settings.days + 1).keys()].slice(1).map(day => {
        let new_keys = keys.filter(x => x != "days")
        let new_vals = new_keys.map(x => this.state.currentSettings[x])
        return periodURI(new_keys, new_vals, dayQuery(day * -DAY, (day - 1) * -DAY))
    })

    return uris.some(x => x == "") ? null : uris
}

/* Creates a uri based on keys and values given. */
export const uri = (keys, vals) => {
    let uri = createURI(keys, vals)
    return uri == "" ? null : [uri]
}