import request from 'postman-request';

// access token for mapbox

const geocode = (address, callback) => {
    let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZmVycmFyaW5rYSIsImEiOiJja2pmcnlrdWYyeHlkMnRtdHBnMWl4ZHowIn0.ZYrsSMH-oyAkYvK6sChWbg`;

    request({
        url,
        json: true
    }, (err, res, body) => {
        if (err) {
            // console.log('error:', err); // Print the error if one occurred
            // console.log('statusCode:', res && res.statusCode); // Print the response status code if a response was received
            callback('server error -i.e network connection issue', undefined)
            //send the reply though callback
        } else if (body.features === 0) {
            callback(`no results to show-no matches found`, undefined)
        } else {
            callback(undefined, {
                location: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            })
        }
    })
    console.log(address);
}

export default geocode;