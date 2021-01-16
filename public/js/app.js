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
const task = document.querySelector('.task')
const forecast = document.querySelector('.forecast')
const coordinates = document.querySelector('.coordinates');
//const forecastImg = document.getElementById('forecast-image')
//#TODO:active class and images o the div for forecast;
//const forecastImg = document.getElementById('forecast-image')

task.textContent = "write your city name";
forecast.textContent = "";

//#FIXME: need to add focus style to the input
input.addEventListener('focus',()=>{
    this.style.backgroundColor = '#000'
})


weatherForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const searchedCity = input.value;
    cityName.textContent = "Loading...";
//FIXME:fix the class toggle at the h3 in city-name
    cityName.classList.remove("incorrect");
    coordinates.textContent = ``;
    forecast.textContent = ``;
   //forecastImg.className=""; 


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
                coordinates.textContent = `latitude: ${data.lat}, longitude: ${data.long}`;
                forecast.textContent = `${ data.forecast}`;
                //forecastImg.className="active"; 
                console.log(data.location);
                console.log(data.forecast);
                input.value="";

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