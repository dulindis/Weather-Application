//client side js

const weatherForm  = document.querySelector('.weather-form');
const input = document.querySelector('.input');
const submitBtn = document.getElementById('submit-btn');

weatherForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    console.log(input.value);
})