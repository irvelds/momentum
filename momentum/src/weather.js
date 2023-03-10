import { state } from './settings.js';
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherInfo = document.querySelector('.weather-info');
const weatherDescription = document.querySelector('.weather-description');
const weatherCity = document.querySelector('.city');
const weatherHumidity = document.querySelector('.humidity');
const weatherWind = document.querySelector('.wind');
const weatherError = document.querySelector('.weather-error');



let humidity = '';
let wind = '';
let ms = '';



export async function getWeather(lng) {

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${weatherCity.value}&lang=${lng}&appid=40e213fbac776cc0243fd83571be2c75&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data);
    if (data.cod === 200) {     
        weatherInfo.classList.add('active');
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        weatherHumidity.textContent = `${humidity}: ${Math.round(data.main.humidity)} %`;
        weatherWind.textContent = `${wind}: ${data.wind.speed.toFixed(0)} ${ms}`;
        showError(data, lng)
    }
    else {
        weatherInfo.classList.remove('active');
        showError(data, lng)
        weatherIcon.className = 'weather-icon none owf';
        temperature.textContent = '';
        weatherDescription.textContent = '';
        weatherHumidity.textContent = '';
        weatherWind.textContent = '';
    }

}


function showError(data, lng) {
    if (data.message === 'city not found' || data.message === 'Nothing to geocode') {
        weatherError.classList.add('active');
        lng === 'ru' ? weatherError.textContent = 'Город не найден.' : weatherError.textContent = 'City is not found. Please check spelling'
    }
    else {
        weatherError.classList.remove('active');
        weatherError.textContent = '';
    }
}


function setCity(e) {
    setLocalStorageCity();
    getWeather(state.language);
}

weatherCity.addEventListener('change', setCity);
weatherCity.addEventListener('keypress', (event) => {
    if ((event.which === 13)) {
        weatherCity.blur();
    }
});

window.addEventListener('beforeunload', ()=>{
    weatherCity.blur();
})



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
    getWeather(state.language)
    lng === 'ru' ? humidity = 'Относительная влажность' : humidity = 'Humidity';
    lng === 'ru' ? wind = 'Cкорость ветра' : wind = 'Wind speed';
    lng === 'ru' ? ms = 'м/с' : ms = 'm/s';
    lng === 'ru' ? weatherCity.placeholder = '[Введите город]' : weatherCity.placeholder = '[Enter the city]';

}
