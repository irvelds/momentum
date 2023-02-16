import { state } from './settings.js';
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const weatherCity = document.querySelector('.city');
const weatherHumidity = document.querySelector('.humidity');
const weatherWind = document.querySelector('.wind');
const weatherError = document.querySelector('.weather-error')



let humidity = '';
let wind = '';
let ms = ''; 



export async function getWeather(lng) {

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${weatherCity.value}&lang=${lng}&appid=40e213fbac776cc0243fd83571be2c75&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    if (data.cod === 200) {
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${data.main.temp}°C`;
        weatherDescription.textContent = data.weather[0].description;
        weatherHumidity.textContent = `${humidity}: ${data.main.humidity} %`;
        weatherWind.textContent = `${wind}: ${data.wind.speed.toFixed(0)} ${ms}`;
        // weatherError.textContent = '';
        showError(data, lng)
    }
    else {
        showError(data, lng)
        // weatherError.textContent = `Error! ${data.message}`;
        weatherIcon.className = 'weather-icon none owf';
        temperature.textContent = '';
        weatherDescription.textContent = '';
        weatherHumidity.textContent = '';
        weatherWind.textContent = '';
    }

}


function showError(data, lng) {
    if (data.message === 'city not found' || data.message === 'Nothing to geocode') {
        lng === 'ru' ? weatherError.textContent = 'Город не найден.': weatherError.textContent = 'City is not found. Please check spelling'  
    }
    else {
        weatherError.textContent = '';
    }
  }






function setCity(e) {
    getWeather(state.language);
    weatherCity.blur();
    setLocalStorageCity();
    // if (e.code === 'Enter' || e.type === 'blur') {
    //     getWeather(lng);
    //     weatherCity.blur();
    //     setLocalStorageCity();
    // }
}
weatherCity.addEventListener('change', setCity);

// document.addEventListener('DOMContentLoaded', getWeather);
// weatherCity.addEventListener('keypress', setCity);
// weatherCity.addEventListener('blur', setCity);



function setLocalStorageCity() {
    localStorage.setItem('city', weatherCity.value);
}

function getLocalStorage() {
    if (localStorage.getItem('city')) {
        weatherCity.value = localStorage.getItem('city');
    }
}
getLocalStorage();






export function translateWeather(lng) {
    if (weatherCity.value === 'Минск' || weatherCity.value === 'Minsk') {
        lng === 'ru' ? weatherCity.value = 'Минск' : weatherCity.value = 'Minsk';
    }

    // if (!localStorage.getItem('city')) {
    //     lng === 'ru' ? weatherCity.value = 'Минск' : weatherCity.value = 'Minsk';
    // }

    getWeather(state.language)
    lng === 'ru' ? humidity = 'Относительная влажность' : humidity = 'Humidity';
    lng === 'ru' ? wind = 'Cкорость ветра' : wind = 'Wind speed';
    lng === 'ru' ? ms = 'м/с' : ms = 'm/s';
    lng === 'ru' ? weatherCity.placeholder = '[Введите город]' : weatherCity.placeholder = '[Enter the city]';
    
}
