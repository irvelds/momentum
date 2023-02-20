const settingsBtn = document.querySelector('.settings-btn');
const settingsContainer = document.querySelector('.settings-wrapper');
const settingsPanelItems = document.querySelectorAll('.settings-panels-list input');
const settingsWidget = document.querySelectorAll('.settings-widget');


export function showSettingsPanel() {
    settingsBtn.addEventListener('click', (e) => {
        e.target.classList.toggle('active');
        if (settingsContainer.classList.contains('active')) {
            settingsContainer.classList.remove('active');
        }
        else {
            settingsContainer.classList.add('active');
        }
    })
}

/*Закрываем настройки не только по кнопке*/
document.body.addEventListener('click', (e) => {
    if (!e.target.closest('.settings-wrapper')) {
        settingsContainer.classList.remove('active');
    }
})

export function getTimesOfDay() {
    const hours = new Date().getHours();
    return Math.floor(hours / 6);
}

export const timeOfDay = getTimesOfDay();
export const getFolder = ['night', 'morning', 'afternoon', 'evening'];



export let state = {
    language: localStorage.getItem('language') ? localStorage.getItem('language') : 'en',
    photoSource: localStorage.getItem('photoSource') ? localStorage.getItem('photoSource') : 'github',
    tags: getFolder[timeOfDay],
    tagsApiContainer: localStorage.getItem('tagsApiContainer') ? localStorage.getItem('tagsApiContainer') : 'none',
    tagsApi: localStorage.getItem('tagsApi') ? localStorage.getItem('tagsApi') : getFolder[timeOfDay],
    panels: JSON.parse(localStorage.getItem('panels')) ? JSON.parse(localStorage.getItem('panels')) : [
        { widget: 'time', shown: true, en: 'Time', ru: 'Время' },
        { widget: 'date', shown: true, en: 'Date', ru: 'Дата' },
        { widget: 'greeting', shown: true, en: 'Greeting', ru: 'Приветствие' },
        { widget: 'quote', shown: true, en: 'Quote', ru: 'Цитаты' },
        { widget: 'weather', shown: true, en: 'Weather', ru: 'Погода' },
        { widget: 'player', shown: true, en: 'Player', ru: 'Плеер' },
        { widget: 'todo', shown: true, en: 'Todo', ru: 'Список дел' }
    ]

};


//присваиваем checkboxaм значение из stage
settingsPanelItems.forEach(e => {
    const element = state.panels.find(el => el.widget === e.value);
    if(element.shown){
        e.checked = element.shown;
    }
    
})

export function setPanelItemsContent(lang) {
    settingsPanelItems.forEach(e => {
        const el = state.panels.find(el => el.widget === e.value);
        var element = e.closest('label');
        lang === 'en' ? element.firstElementChild.innerHTML = el.en : element.firstElementChild.innerHTML = el.ru;

    })
}





settingsPanelItems.forEach(e => {
    if (e.checked) {
        document.querySelector(`.${e.value}-panel`).classList.remove('panel-hidden');
        // state.panels = state.panels.map((el)=> {
        //     return  el.widget === e.value 
        //       ? {...el, shown: true} 
        //       : el;
        //   })
        const stateItem = state.panels.find(el => el.widget === e.value);
        stateItem.shown = true;
    }
    else {
        document.querySelector(`.${e.value}-panel`).classList.add('panel-hidden');
        // state.panels = state.panels.map((el)=> {
        //     return  el.widget === e.value 
        //       ? {...el, shown: false} 
        //       : el;
        //   })
        const stateItem = state.panels.find(el => el.widget === e.value);
        stateItem.shown = false;
    }
})

function ShowHidePanel(e) {
    document.querySelector(`.${e.target.value}-panel`).classList.toggle('panel-hidden')
    if (e.target.checked) {
        // currentPanel.classList.remove('panel-hidden');
        // state.panels = state.panels.map((el) => {
        //     return el.widget === e.target.value
        //         ? { ...el, shown: true }
        //         : el;
        // });

        const stateItem = state.panels.find(el => el.widget === e.target.value);
        stateItem.shown = true;
    }
    else {
        // currentPanel.classList.add('panel-hidden');
        // state.panels = state.panels.map((el) => {
        //     return el.widget === e.target.value
        //         ? { ...el, shown: false }
        //         : el;
        // });
        const stateItem = state.panels.find(el => el.widget === e.target.value);
        stateItem.shown = false;
    };
    //return state.panels
}

settingsPanelItems.forEach(el => {
    el.addEventListener('change', ShowHidePanel);
})











export function saveSettingsStorage() {
    localStorage.setItem('language', state.language);
    localStorage.setItem('photoSource', state.photoSource);
    localStorage.setItem('panels', JSON.stringify(state.panels));
    // localStorage.setItem('tagsApiContainer', state.tagsApiContainer);

}
// window.addEventListener('beforeunload', saveSettingsStorage)

export function getSettingsStorage() {
    if (localStorage.getItem('language')) {
        state.language = localStorage.getItem('language');
    }
    if (localStorage.getItem('photoSource')) {
        state.photoSource = localStorage.getItem('photoSource');
    }
    if (localStorage.getItem('panels')) {
        state.panels = JSON.parse(localStorage.getItem('panels'));
    }
    // if (localStorage.getItem('tagsApiContainer')) {
    //     state.tagsApiContainer = localStorage.getItem('tagsApiContainer');
    // }
    // console.log(JSON.parse(localStorage.getItem('panels')));

}
// window.addEventListener('load', getSettingsStorage);



export function translateSettings(lang) {
    lang === 'ru' ? document.querySelector('.settings-language h4').innerHTML = 'Язык' : document.querySelector('.settings-language h4').innerHTML = 'Language';
    lang === 'ru' ? document.querySelector('.settings-img h4').innerHTML = 'Фотографии' : document.querySelector('.settings-img h4').innerHTML = 'Photos';
    lang === 'ru' ? document.querySelector('.settings-panels h4').innerHTML = 'Основные' : document.querySelector('.settings-panels h4').innerHTML = 'General';
}



