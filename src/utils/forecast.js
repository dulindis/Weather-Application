//postman request
import request from 'postman-request';


const forecast = (address, lat, long) => {
    let url;
    if (address) {
        url = `http://api.weatherstack.com/current?access_key=382d14da2cc8605b1e21e3d45ceb637f&query=${address}`
    } else if (lat, long) {
        url = `http://api.weatherstack.com/current?access_key=382d14da2cc8605b1e21e3d45ceb637f&query=${lat},${long}`
    }
    request(url, (err, res, body) => {
        console.log('error:', err);
        console.log('statusCode:', res && res.statusCode);
        console.log('body', body);
        const parsedData = JSON.parse(body);
        console.log(parsedData);
        return res.send({
            forecast: `The weather forecast for: ${parsedData.location.name} in ${parsedData.location.country}. 
            In ${parsedData.location.name} is ${parsedData.location.is_day ? "day" : "night" }. The time now is ${parsedData.current.observation_time} o'clock. The current temperaure is ${parsedData.current.temperature} degrees, feels like ${parsedData.current.feelslike} degrees. The atmospheric pressure: ${parsedData.current.pressure}millibar. Cloud cover ${parsedData.current.cloudcover}. Humidity ${parsedData.current.humidity}% and precipitation ${parsedData.current.percip}mm. UV index for today: ${parsedData.current.uv_index}`
        })
    })
}

export default forecast;