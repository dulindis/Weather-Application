import request from 'postman-request';

// access token for mapbox

const geocode = (address, callback) => {
    let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZmVycmFyaW5rYSIsImEiOiJja2pmcnlrdWYyeHlkMnRtdHBnMWl4ZHowIn0.ZYrsSMH-oyAkYvK6sChWbg`;

    request({
        url
    }, (err, res, body) => {
        const parsedData = JSON.parse(body);
        if (err) {
            console.log('error:', err); // Print the error if one occurred
            console.log('statusCode:', res && res.statusCode); // Print the response status code if a response was received
            //send the reply though callback
        } else if (parsedData.features === 0) {
            console.log(`no results to show`);
        } else {
            const location = parsedData.features[0].place_name;
            const latitude = parsedData.features[0].center[1];
            const longitude = parsedData.features[0].center[0];

            callback(location, latitude, longitude)
        }


        //     console.log('body:', JSON.parse(body)); // Print the HTML for the Google homepage.
        //   console.log(body.features[0].center); 
        // console.log('coordinates:', body.features);
        // console.log(body.current);

    })
    console.log(address);
}

export default geocode;