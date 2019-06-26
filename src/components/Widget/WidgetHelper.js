import {tryCatch, always} from 'ramda'

const fromJoinableList = (ys, n) => ys.map(x => n + "=" + x).join("&")

const fromJoinableListToUpper = (ys, n) => ys.map(x => n + "=" + x.toUpperCase()).join("&")

const fromJoinableListLine = (ys, n) =>
    ys.map(tryCatch(
        (x) => n + "=" + x.match(/([0-9]*):.*/i)[1]
        , always("")))
      .filter(x => x != "").join("&")

const fromPeriod = (y, n) => n + "=" + y.toString() + "s"

const zipFunc = (n) => ({
    "return_filter[]": fromJoinableList,
    "district[]"     : fromJoinableList,
    "line_number[]"  : fromJoinableListLine,
    "period"         : fromPeriod
}[n])

export const zipWith = (f, xs, ys) => xs.map((n, i) => {
    const func = zipFunc(n)
    return (func ? func : f)(ys[i], n)
})