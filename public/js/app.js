// import io from 'socket.io';
// const socket = io();

// socket.on('connect',function(){
//     console.log('connected to the server');
// })

// socket.on('disconnect',function(){
//     console.log('disconnected from the server');
// })


//client side js

const weatherForm = document.querySelector('.weather-form');
const input = document.querySelector('.input');
const submitBtn = document.getElementById('submit-btn');
const cityName = document.querySelector('.city-name')
const forecast = document.querySelector('.forecast')

cityName.textContent = "Write your city name";
forecast.textContent = "";

weatherForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const searchedCity = input.value;
    cityName.textContent = "Loading...";

    fetch(`/weather?address=${searchedCity}`).then(data => console.log(data))

    fetch(`/weather?address=${searchedCity}`)
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                return Promise.reject(`http error: ${res.status}`)
            }
        }).then(data => {
            if (data.error) {
                cityName.textContent('error', data.error)
            } else {
                cityName.textContent = `${data.location}`;
                cityName.textContent = `${ data.forecast}`;
                console.log(data.location);
                console.log(data.forecast);

            }
            console.log(data);
        }).catch(error => {
            console.log(`error from fetch`, error);
        })

})



// submitBtn.addEventListener('click',function(ev){
//     ev.preventDefault();
//     socket.emit("createMessage", {
//         from:"User",
//         text:input.value
//     },function(){

//     })