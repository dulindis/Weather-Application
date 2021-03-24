//postman request
import request from 'postman-request';

const forecast = (address, lat, long, callback) => {
    let url;
    if (lat, long) {
        url = `http://api.weatherstack.com/current?access_key=382d14da2cc8605b1e21e3d45ceb637f&query=${lat},${long}`
    } else if (address) {
        url = `http://api.weatherstack.com/current?access_key=382d14da2cc8605b1e21e3d45ceb637f&query=${address}`
    }
    request(url, (err, {
        body
    }) => {
        if (err) {
            callback,
            callback2(`unable to connect to weather service`, undefined)
        }
        else if (body.error) {
            callback,
            callback2(`unable to find location ${error.info}`, undefined)
            //callback(undefined,`unable to find location ${error.info}`)
        }
        else {
            const parsedData = JSON.parse(body);
            console.log(parsedData);
            callback(undefined, {
                forecastImgUrl: `${parsedData.current.weather_icons}`,
                forecastData: `${parsedData.current.weather_descriptions}.
                Date and local time:${parsedData.location.localtime}. Currently is ${parsedData.location.is_day ? "day" : "night" }. The temperaure at the moment is estimated to be ${parsedData.current.temperature}\u00B0 C , feels like ${parsedData.current.feelslike}\u00B0 C. The atmospheric pressure of ${parsedData.current.pressure} millibar. Cloud cover ${parsedData.current.cloudcover}%. Humidity ${parsedData.current.humidity}% and precipitation ${parsedData.current.precip}mm. UV index for today: ${parsedData.current.uv_index}. `
            })
        }
    })
}

export default forecast;
