
import { state } from './settings';



function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
let numberImg = String(getRandomNum(1, 21));


// const getFolder = ['night', 'morning', 'afternoon', 'evening'];

// let folderImgApi = getFolder[state.tagsApi];
const folderImg = state.tags;
let folderImgApi = state.tagsApi;
let urlImg;
let sourceImg;

const tagImg = document.querySelector('.tag-img');
const tagContainer = document.querySelector('.tag-container');
export const tagError = document.querySelector('.tag-error');



export function hideContainer(display){
    tagError.style.display = display;
    const tagContainerGithub = document.querySelectorAll('.tag-container span:not(:first-child)');
        tagContainerGithub.forEach(e =>{
            localStorage.setItem('tagsApiContainer', display);
            state.tagsApiContainer = display;
            e.style.display = state.tagsApiContainer;

        })
}


export function getSourceImg() {
    if (state.photoSource === 'github') {
        sourceImg = getGithubImage();
        tagImg.disabled = !tagImg.disabled;
        // tagError.display = 'none'
        hideContainer('none')
    }
    else if (state.photoSource === 'unsplash') {
        sourceImg = getUnsplashImage();
        //sourceImg = getGithubImage();
        tagImg.disabled = false;
        hideContainer('flex')
    }
    else if (state.photoSource === 'flickr') {
        sourceImg = getFlickrImage();
        tagImg.disabled = false;
        hideContainer('flex')
    }
    return sourceImg
}

getSourceImg();


function getGithubImage() {
    const url = `https://raw.githubusercontent.com/irvelds/stage1-tasks/assets/images/${folderImg}/${numberImg.padStart(2, '0')}.jpg`;
    urlImg = url;
    return url;
}

async function getUnsplashImage() {
    const id = 'ZtvWCVVtYpqIknQlYxjgcsgBx4sy-IEZV2M8RtD3tUs';
    //const id = 'e2077ad31a806c894c460aec8f81bc2af4d09c4f8104ae3177bb809faf0eac17';
    const url = `https://api.unsplash.com/photos/random?lang=en&orientation=landscape&query=${folderImgApi}&client_id=${id}`;
    const res = await fetch(url);
    const data = await res.json();
    urlImg = data.urls.regular;
    showSlider();
}


async function getFlickrImage() {
    const id = '433d357743e76a7ff1fdd1796c3e244f';
    //const id = 'e2077ad31a806c894c460aec8f81bc2af4d09c4f8104ae3177bb809faf0eac17';
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${id}&tags=${folderImgApi}&extras=url_l&format=json&nojsoncallback=1`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    const index = Math.round(Math.random() * (data.photos.photo).length);
    urlImg = data.photos.photo[index].url_l;
    showSlider();
}







export function showSlider() {
    const img = new Image();
    img.src = urlImg;
    img.addEventListener('load', () => {
        document.querySelector('body').style.backgroundImage = `url('${urlImg}')`;
    })

}

function getSlideNext() {
    numberImg < 20 ? numberImg++ : numberImg = 1;
    numberImg = String(numberImg);
    getSourceImg();
    showSlider();
}
document.querySelector('.slide-next').addEventListener('click', getSlideNext);

function getSlidePrev() {
    numberImg > 1 ? numberImg-- : numberImg = 20;
    numberImg = String(numberImg);
    getSourceImg();
    showSlider();
}

document.querySelector('.slide-prev').addEventListener('click', getSlidePrev);









function tagValidate(tag) {
    const regex = /^[a-zA-Z-]{0,20}$/g;
    return regex.test(tag.value) ? true : false;
  }


function setTagsImg() {
    tagImg.addEventListener('change', (e => {
        if(tagValidate(e.target) && e.target.value.length < 20){
        let tegArr = [];
        tegArr.push((e.target.value).trim());
        folderImgApi = ([folderImgApi, ...tegArr]).join(',');
        console.log(folderImgApi);
        localStorage.setItem('tagsApi', folderImgApi);

        /*Перенести в функцию*/
        let newTag = document.createElement('span');
        newTag.innerHTML = `${e.target.value}<button class="close-tag">x</button>`
        tagContainer.appendChild(newTag)
        e.target.value = '';
        tagError.textContent = '';
        delTagsImg();
    }

    else {
       // tagError.textContent = 'The tag must contain only latin letters and no more than 15 characters';
  
        translateError(state.language)
    }

    }));
}

window.addEventListener('load', setTagsImg);



function getTagsImg() {
    function getLocalStorageTags() {
        if (localStorage.getItem('tagsApi')) {
            folderImgApi = [localStorage.getItem('tagsApi')].join(',');
        }
          let set = new Set(folderImgApi.split(','));
          set.forEach((e) =>{
            /*Перенести в функцию*/
            let newTag = document.createElement('span');
            newTag.innerHTML = `${e}<button class="close-tag">x</button>`
            tagContainer.appendChild(newTag);
       
           })   
           hideContainer(state.tagsApiContainer);
    }
    window.addEventListener('load', getLocalStorageTags);
}

getTagsImg();


function delTagsImg() {
    const tagElement = document.querySelectorAll('.close-tag');
    tagElement.forEach(e => {
        e.addEventListener('click', (btn) =>{
            btn.target.parentNode.remove();
            const element = (btn.target.closest('span').textContent).slice(0, -1);
            const filterArray =  localStorage.getItem('tagsApi').split(',').filter(e =>{
                return e !== element;
            })
            localStorage.setItem('tagsApi', filterArray);
            folderImgApi = filterArray.join(',');
            btn.stopPropagation();
        })
    })
   
}

window.addEventListener('load', delTagsImg);


export function translateError(lang) {
        lang === 'ru' ? tagError.textContent = 'Тег должен содержать только латинские буквы и не более 15 символов' : tagError.textContent = 'The tag must contain only latin letters and no more than 15 characters';
}












