import request from 'postman-request';

// access token for mapbox

const geocode = (address, callback) => {
    let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZmVycmFyaW5rYSIsImEiOiJja2pmcnlrdWYyeHlkMnRtdHBnMWl4ZHowIn0.ZYrsSMH-oyAkYvK6sChWbg`;

    request({
        url,
        json: true
    }, (err, {body}) => {
        console.log(body.features[0]);
        if (err) {
            callback('Unable to connect to location sercives. server error -i.e network connection issue', undefined)
        } else if (body.features.length === 0) {
            callback(`Unable to find the provided location. Try another search`, undefined)
        } else {
            callback(undefined, {
                // location: body.features[0].place_name,
                location: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            })
        }
    })
}

export default geocode;