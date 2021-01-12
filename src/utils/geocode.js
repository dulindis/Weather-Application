import request from 'postman-request';

// access token for mapbox

const geocode  = (address = "default address", callback) => {
    let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZmVycmFyaW5rYSIsImEiOiJja2pmcnlrdWYyeHlkMnRtdHBnMWl4ZHowIn0.ZYrsSMH-oyAkYvK6sChWbg`;

    //request(url, (fn, pes, body) => {})
    console.log(address);
}

export default geocode;