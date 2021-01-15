import request from 'postman-request';

// access token for mapbox

const geocode = (address, callback) => {
    let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZmVycmFyaW5rYSIsImEiOiJja2pmcnlrdWYyeHlkMnRtdHBnMWl4ZHowIn0.ZYrsSMH-oyAkYvK6sChWbg`;

    request({
        url,
        json: true
    }, (err, {
        body
    }) => {
        if (err) {
            callback('server error -i.e network connection issue', undefined)
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
    // console.log(address);
    // console.log({
    //     location: body.features[0].place_name,
    //     latitude: body.features[0].center[1],
    //     longitude: body.features[0].center[0]
    // });
}

export default geocode;