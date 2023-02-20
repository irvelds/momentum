import { showTime, showDate } from './date.js';
import { showGreeting, showUserName, translateUserNamePlaceholder} from './greeting.js';
import { showSlider, getSourceImg, translateError, tagError} from './slider.js';
import { showQuotes, reloadQuotes } from './quotes.js';
import { getWeather, translateWeather } from './weather.js';
import { state, showSettingsPanel,  setPanelItemsContent, saveSettingsStorage, getSettingsStorage, translateSettings} from './settings.js'


import  { }  from './audio.js';
import  { }  from './todo.js';
// import './../css/style.css';
// import './../css/owfont-regular.css';




function setLangSource() {
    document.querySelectorAll('[name="radio-lng"]').forEach(e =>{
        e.addEventListener('change', (chk)=>{
            state.language = chk.target.value;
            showDate(state.language);
            showGreeting(state.language);
            translateUserNamePlaceholder(state.language);
            showQuotes(state.language);
            translateWeather(state.language);
            translateSettings(state.language);
            setPanelItemsContent(state.language);
            if ( tagError.textContent !== ''){
            translateError(state.language);
            }
        });
        if (e.value === localStorage.getItem('language')) {
            e.checked = true;
        }
    })
}
setLangSource();


function setImageSource() {
    document.querySelectorAll('[name="widget-img"]').forEach(e =>{
        e.addEventListener('change', (chk)=>{
            state.photoSource = chk.target.value;
            getSourceImg();
            showSlider(); 
        });
        if (e.value === localStorage.getItem('photoSource')) {
            e.checked = true;
        }
    })
}

setImageSource();



/*Установка даты*/
showDate(state.language);

/*Установка времени*/
showTime();
setInterval(function () {
    showTime();
}, 1000);

/*Приветствие*/
showGreeting(state.language);

/*Имя пользователя*/
showUserName();
translateUserNamePlaceholder(state.language);

/*Слайдер*/
showSlider();
/*Цитаты*/

showQuotes(state.language)

document.querySelector('.change-quote').addEventListener('click', (e => {
    e.target.classList.toggle('active');
    reloadQuotes(state.language)
}))

/*Погода*/
translateWeather(state.language)

/*Настройки*/
showSettingsPanel();
translateSettings(state.language);

window.addEventListener('beforeunload', saveSettingsStorage);
window.addEventListener('load', getSettingsStorage);
setPanelItemsContent(state.language);




