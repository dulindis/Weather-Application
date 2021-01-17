const weatherForm = document.querySelector('.weather-form');
const input = document.querySelector('.input');
const submitBtn = document.getElementById('submit-btn');
const cityName = document.querySelector('.city-name')
const task = document.querySelector('.task')
const forecast = document.querySelector('.forecast')
const coordinates = document.querySelector('.coordinates');
const forecastContainer = document.querySelector('.forecast-container')
const forecastImg = document.getElementById('forecast-image')

task.textContent = "write your city name";
forecast.textContent = "";

weatherForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const searchedCity = input.value;
    cityName.innerHTML=`
    <div class="margin-left-30" data-title=".dot-flashing">
        <div class="stage">
            <div class="dot-flashing"></div>
        </div>
    </div>
    `;
    //cityName.textContent = "Loading...";
    cityName.classList.remove("incorrect");
    coordinates.textContent = ``;
    forecast.textContent = ``;
    forecastImg.setAttribute("src", '');

    fetch(`/weather?address=${searchedCity}`).then(data => console.log(data))

    fetch(`/weather?address=${searchedCity}`)
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
})
