import { timeOfDay} from './settings';
const greetingTranslation = [
    {
        night: {
            ru: 'Доброй/Спокойной ночи',
            en: 'Good night'
        }
    },

    {
        morning: {
            ru: 'Доброе утро',
            en: 'Good morning'
        }
    },

    {
        afternoon: {
            ru: 'Добрый день',
            en: 'Good afternoon'
        }
    },
    {
        evening: {
            ru: 'Добрый вечер',
            en: 'Good evening'
        }
    },

]
const userName = document.querySelector('.name');


export function showGreeting(lang) {
    let timesOfDay = Object.values(greetingTranslation[timeOfDay])[0];
    document.querySelector('.greeting').innerHTML = timesOfDay[lang];
}

export function showUserName() {

    function setLocalStorage() {
        localStorage.setItem('name', userName.value);
    }
    window.addEventListener('beforeunload', setLocalStorage)

    function getLocalStorage() {
        if (localStorage.getItem('name')) {
            userName.value = localStorage.getItem('name');
        }
    }
    window.addEventListener('load', getLocalStorage)
}

export function translateUserNamePlaceholder(lang) {
    lang === 'ru' ? userName.placeholder = '[Введите ваше имя]' : userName.placeholder = '[Enter your name]';
}





