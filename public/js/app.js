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

weatherForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const searchedCity = input.value;
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
});

geolocationBtn.addEventListener('click', ev => {
    //ev.preventDefault();
    // const url = `https://google.com/maps?q=${coords.latitude},${coords.longitude}`
    if (!navigator.geolocation) {
        //you can use a modal instead of an alert
        return alert('Geolocation is not supported by your browser.')
    }
    geolocationBtn.setAttribute('disabled', 'disabled');

    navigator.geolocation.getCurrentPosition((position) => {

        const coordinates = {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude

        }

        const cityName = input.value;
        input.value = `${coordinates.longitude}, ${coordinates.latitude}`;
    
        geolocationBtn.removeAttribute('disabled');
        console.log('location shared sucessfully', coordinates);

    })

})



$sendLocationButton.addEventListener('click', (ev) => {
    if (!navigator.geolocation) {
        //you can use a modal instead of an alert
        return alert('Geolocation is not supported by your browser.')
    }
    $sendLocationButton.setAttribute('disabled', 'disabled');

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            $sendLocationButton.removeAttribute('disabled');
            console.log('location shared sucessfully');
        });
    })
});