import request from 'postman-request';

const geocode = (address, callback) => {
    let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZmVycmFyaW5rYSIsImEiOiJja2pmcnlrdWYyeHlkMnRtdHBnMWl4ZHowIn0.ZYrsSMH-oyAkYvK6sChWbg`;

    request({
        url,
        json: true
    }, (err, {body}) => {
        console.log(body.features[0]);
        if (err) {
            callback('Network connection issue - Unable to connect to location services ', undefined)
        } else if (body.features.length === 0) {
            callback(`Unable to find the location - Try another search`, undefined)
        } else {
            callback(undefined, {
                location: body.features[0].place_name,
                latitude:(body.features[0].center[1]).toFixed(2),
                longitude: (body.features[0].center[0]).toFixed(2)
            })
        }
    })
}

export default geocode;