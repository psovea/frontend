import * as R from 'ramda';

const URI = "http://localhost:5000"

export default function getStopNames(town, district="%") {
    var url = `${URI}/get-stops?town=${town}&district=${district}`
    console.log("URL: " + url)

    var stops = fetch(url).then(res => res.json())

    Promise.all([stops]).then(data => {
        console.log('comes here')
        console.log("DATA: " + data);

        return R.map(obj => obj.stopName, data)
    })
}
