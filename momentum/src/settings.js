const settingsBtn = document.querySelector('.settings-btn');
const settingsContainer = document.querySelector('.settings-wrapper');
const settingsPanelItems = document.querySelectorAll('.settings-panels-list input');


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
    // panels: [
    //     { widget: 'weather', shown: true, translateEn: 'Weather', translateRu: 'Погода'},
    //     { widget: 'time', shown: true, translateEn: 'Time', translateRu: 'Время'},
    //     { widget: 'date', shown: true, translateEn: 'Date', translateRu: 'Дата' },
    //     { widget: 'greeting', shown: true, translateEn: 'Greeting', translateRu: 'Приветствие'},
    //     { widget: 'quote', shown: true, translateEn: 'Quote' , translateRu: 'Цитаты'},
    //     { widget: 'player', shown: true, translateEn: 'Player', translateRu: 'Плеер' },
    // ],
    // panels: JSON.parse(localStorage.getItem('panels')) ? JSON.parse(localStorage.getItem('panels')) : [
    //     { widget: 'weather', shown: true, translateEn: 'weather', translateRu: 'погода' },
    //     { widget: 'time', shown: true, translateEn: 'time', translateRu: 'время' },
    //     { widget: 'date', shown: true, translateEn: 'date', translateRu: 'дата' },
    //     { widget: 'greeting', shown: true, translateEn: 'greeting', translateRu: 'приветствие' },
    //     { widget: 'quote', shown: true, translateEn: 'quote', translateRu: 'цитаты' },
    //     { widget: 'player', shown: true, translateEn: 'player', translateRu: 'плеер' },
    // ],

    panels: JSON.parse(localStorage.getItem('panels')) ? JSON.parse(localStorage.getItem('panels')) : [
        { widget: 'weather', shown: true, en: 'Weather', ru: 'Погода' },
        { widget: 'time', shown: true, en: 'Time', ru: 'Время' },
        { widget: 'date', shown: true, en: 'Date', ru: 'Дата' },
        { widget: 'greeting', shown: true, en: 'Greeting', ru: 'Приветствие' },
        { widget: 'quote', shown: true, en: 'Quote', ru: 'Цитаты' },
        { widget: 'player', shown: true, en: 'Player', ru: 'Плеер' },
    ]

};


//присваиваем checkboxaм значение из stage но не мутируем объект
// settingsPanelItems.forEach(e => {
//     const array = JSON.parse(JSON.stringify(state.panels));
//     const obj = array.find(el => el.widget == e.value);
//     state.panels.find(el => el.widget == e.value);
//     e.checked = obj.shown;
// })



// export function setPanelItemsContent(lang) {
//     settingsPanelItems.forEach(e => {
//         const el = state.panels.find(el => el.widget === e.value);
//         var element = e.closest('label');
//         console.log(element.firstElementChild.innerHTML)
//         lang === 'en' ? element.firstElementChild.innerHTML = el.translateEn : element.firstElementChild.innerHTML = el.translateRu;

//     })
// }

// console.log(state)



//присваиваем checkboxaм значение из stage
settingsPanelItems.forEach(e => {
    const element = state.panels.find(el => el.widget === e.value);
    e.checked = element.shown;
})

export function setPanelItemsContent(lang){
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
    lang === 'ru' ? document.querySelector('.tag-error').innerHTML = 'Тег должен содержать только латинские буквы и не более 15 символов' : document.querySelector('.tag-error').innerHTML = 'The tag must contain only latin letters and no more than 15 characters';
}

