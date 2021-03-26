import {
    EBADF
} from "node:constants";

const weatherForm = document.querySelector('.weather-form');
const input = document.querySelector('.input');
const submitBtn = document.getElementById('submit-btn');
const cityName = document.querySelector('.city-name')
const task = document.querySelector('.task')
const forecast = document.querySelector('.forecast')
const coordinates = document.querySelector('.coordinates');
const forecastContainer = document.querySelector('.forecast-container')
const forecastImg = document.getElementById('forecast-image');
const geolocationBtn = document.getElementById('geolocation-btn');

task.textContent = "write your city name";
forecast.textContent = "";

const fetchForecast = (option) => {
    // const searchedCity = option || input.value;
    ///geocoding/v5/{endpoint}/{longitude},{latitude}.json

    cityName.innerHTML = `
   <div class="margin-left-30" data-title=".dot-flashing">
       <div class="stage">
           <div class="dot-flashing"></div>
       </div>
   </div>`;
    cityName.classList.remove("incorrect");
    coordinates.textContent = ``;
    forecast.textContent = ``;
    forecastImg.setAttribute("src", '');

    let fetchUrl;

    let searchedCity;
    if (option) {
        searchedCity = option;
        const {
            longitude,
            latitude
        } = searchedCity;
        fetchUrl = `/weather?longitude=${longitude}&latitude=${latitude}`
    } else {
        searchedCity = input.value
        fetchUrl = `/weather?address=${searchedCity}`
    };
    fetch(fetchUrl)
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                cityName.textContent = `error: ${res.body}`
                return Promise.reject(`http error: ${res.status}`)
            }
        }).then(data => {
            if (data.error) {
                cityName.classList.add("incorrect");
                cityName.textContent = `${data.error}`
            } else {
                cityName.textContent = `${data.location}`;
                coordinates.textContent = `Lat: ${data.lat}, Long: ${data.long}`;
                forecast.textContent = `${ data.forecast}`;
                forecastContainer.classList.add("active");
                forecastImg.setAttribute("src", data.forecastImgUrl);
                input.value = "";
            }
        }).catch(error => {
            console.log(`error from fetch`, error);
        })
};
const geolocateNavigator = () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.')
    }
    geolocationBtn.setAttribute('disabled', 'disabled');

    navigator.geolocation.getCurrentPosition((position) => {
        const coordinates = {
            longitude: (position.coords.longitude).toFixed(4),
            latitude: (position.coords.latitude).toFixed(4)
        };
        //input.value = `${coordinates.longitude}, ${coordinates.latitude}`;
        geolocationBtn.removeAttribute('disabled');
        return coordinates
        //console.log('location shared sucessfully', coordinates);
    })


}

weatherForm.addEventListener('submit', (ev) => {
    //console.log('event', ev.submitter.id);
    ev.preventDefault();
    if (ev.submitter.id === "submit-btn") {
        fetchForecast()
    } else {
        const coordinates = geolocateNavigator();
        fetchForecast(coordinates)
    }

});

// geolocationBtn.addEventListener('submit', ev => {
//     ev.preventDefault();
//     const coordinates = geolocateNavigator();
//     fetchForecast(coordinates)
// })