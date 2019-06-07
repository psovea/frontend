var request = require("request")

var url = "http://184.72.120.43:9800/getStops"

request({
    url: url,
    json: true
}, function (error, response, body) {
    if (!error && response.statusCode === 200) {

        var latlons = body.map(o => {
            var x = o[Object.keys(o)[0]];
            return {
                lat: x.lat,
                lon: x.lon,
                name: x.name
            }
        })
        return latlons
    }
})

