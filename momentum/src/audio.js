import playList from './playList.js';

const playBtn = document.querySelector('.play');
const playNextBtn = document.querySelector('.play-next');
const playPrevBtn = document.querySelector('.play-prev');
const playListContainer = document.querySelector('.play-list-container');
const playtrackName = document.querySelector('.play-track-name');
const playerRange = document.querySelector('.player-range');

let isPlay = false;
let playNum = 0;

const audio = new Audio();






/*Плейлист генерируется средствами JavaScript*/
for (let i = 0; i < playList.length; i++) {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = playList[i].title
    playListContainer.append(li);
}


// Определяем массив items уже после построения
const playListItems = document.querySelectorAll('.play-item');
playListItems.forEach((item, index) => item.addEventListener('click', () => playByItem(index)));


// Выводим заголовок первого трека и активный стиль(начальная настройка)
playtrackName.innerHTML = '1.' + playList[0].title;
playListItems[0].classList.add('item-active');





/*Трек, который в данный момент проигрывается, в блоке Play-list выделяется стилем +3*/
function setActivePlayItem() {
    const playListItems = document.querySelectorAll('.play-item');
    playListItems.forEach((e, index) => {
        if (index === playNum) {
            playtrackName.innerHTML = `${playNum + 1}. ${playList[playNum].title}`;
            e.classList.add('item-active');
        }
        else (e.classList.remove('item-active'));
    })

}


/*Функция смены иконок play-pause*/

function toggleIcon() {
    if (!isPlay) {
        playBtn.classList.remove('pause');
        playListItems.forEach(item => item.classList.remove('playing'));
    }
    else {
        playBtn.classList.add('pause');
        playListItems.forEach(item => item.classList.remove('playing'));
        playListItems[playNum].classList.add('playing');
    }
}


function playAudio() {
    audio.src = playList[playNum].src;
    audio.play();
    audio.currentTime = 0;
    isPlay = true;
    setActivePlayItem();
    toggleIcon();

}

function pauseAudio() {
    audio.pause();
    isPlay = false;
    toggleIcon();
}



function toggleAudio() {
    if (isPlay) {
        pauseAudio();
    }
    else if (!isPlay) {
        playAudio();
    }
}


function playByItem(itemIndex) {
    if (itemIndex === playNum) {
        toggleAudio();
    }
    else {
        playNum = itemIndex;
        playAudio();
    }
}


function playPrev() {
    console.log(playNum)
    playNum > 0 ? playNum-- : playNum = playList.length - 1;
    playAudio();
}

function playNext() {
    console.log(playNum)
    playNum < playList.length - 1 ? playNum++ : playNum = 0;
    playAudio();
}




// Принимает время в секундах и преобразует его в минуты и секунды
function formatTime(timeInSeconds) {
    const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);
    return {
        minutes: result.substr(3, 2),
        seconds: result.substr(6, 2),
    };
};


// initializeAudio
function initializeAudio() {
    const time = formatTime(Math.round(audio.duration));
    playerRange.setAttribute('max', Math.round(audio.duration));
    document.querySelector('.play-track-duration').innerHTML = `${time.minutes}:${time.seconds}`;
    document.querySelector('.play-track-duration').setAttribute('datetime', `${time.minutes}m ${time.seconds}s`)
}


// Обновляем время, прошедшее с момента воспроизведения видео
function updateTime() {
    const time = formatTime(Math.round(audio.currentTime));
    document.querySelector('.play-track-current-time').innerHTML = `${time.minutes}:${time.seconds}`;
    document.querySelector('.play-track-current-time').setAttribute('datetime', `${time.minutes}m ${time.seconds}s`)
}



function updateProgress() {
    playerRange.value = Math.floor(audio.currentTime);
    let background = Math.floor((audio.currentTime / audio.duration) * 100);
    playerRange.style.background = `linear-gradient(to right, #c1ff06, 0%,  #c1ff06, ${background}%, #ffffff ${background}%)`;
}





audio.addEventListener('loadedmetadata', initializeAudio);
audio.addEventListener('timeupdate', updateTime);
audio.addEventListener('timeupdate', updateProgress);




const seekTooltip = document.getElementById('player-tooltip');


// Отображаем время в Tooltip, когда курсор находится над индикатором выполнения

function updateTooltip(event) {
    const skipTo = Math.round((event.offsetX / event.target.clientWidth) * parseInt(event.target.getAttribute('max'), 10));
    playerRange.setAttribute('data-seek', skipTo)
    const t = formatTime(skipTo);
    seekTooltip.textContent = `${t.minutes}:${t.seconds}`;
    const rect = audio.getBoundingClientRect();
    seekTooltip.style.left = `${event.pageX - rect.left}px`;
}

playerRange.addEventListener('mousemove', updateTooltip);



// Переходит к другому моменту видео, когда нажимается индикатор выполнения
function skipAhead(event) {
    const skipTo = event.target.dataset.playerRange ? event.target.dataset.playerRange : event.target.value;
    audio.currentTime = skipTo;
    playerRange.value = skipTo;
}


playerRange.addEventListener('input', skipAhead);




/* Регулятор громкости */

const volumeButton = document.querySelector('.volume-button');
const volumeIcons = document.querySelectorAll('.volume-button use');
const volumeMute = document.querySelector('use[href="#volume-mute"]');
const volumeLow = document.querySelector('use[href="#volume-low"]');
const volumeHigh = document.querySelector('use[href="#volume-high"]');
const volumeRange = document.querySelector('.volume-range');
volumeRange.style.background = `linear-gradient(to right, #c1ff06, 0%,  #c1ff06, ${volumeRange.value * 100}%, #ffffff ${volumeRange.value * 100}%)`;

//Обновления громкости при перетаскивании ползунка
function updateVolume() {
    if (audio.muted) {
        audio.muted = false;
    }
    audio.volume = volumeRange.value;
    volumeRange.style.background = `linear-gradient(to right, #c1ff06, 0%,  #c1ff06, ${volumeRange.value * 100}%, #ffffff ${volumeRange.value * 100}%)`;
}

volumeRange.addEventListener('input', updateVolume);




// Включать/выключать видео по кнопке громкости
function toggleMute() {
    audio.muted = !audio.muted;
    if (audio.muted) {
        volumeRange.setAttribute('data-volume', volumeRange.value);
        volumeRange.value = 0;
        volumeRange.style.background = `linear-gradient(to right, #c1ff06, 0%,  #c1ff06, 0%, #ffffff 0%)`;
    } else {
        volumeRange.value = volumeRange.dataset.volume;
        volumeRange.style.background = `linear-gradient(to right, #c1ff06, 0%,  #c1ff06, ${volumeRange.value * 100}%, #ffffff ${volumeRange.value * 100}%)`;

    }
}

volumeButton.addEventListener('click', toggleMute);




// Обновления значка при изменении громкости
function updateVolumeIcon() {
    volumeIcons.forEach(icon => {
        icon.classList.add('hidden');
    });
    // volumeButton.setAttribute('data-title', 'Mute (m)');
    if (audio.muted || audio.volume === 0) {
        volumeMute.classList.remove('hidden');
        // volumeButton.setAttribute('data-title', 'Unmute (m)');

    } else if (audio.volume > 0 && audio.volume <= 0.5) {
        volumeLow.classList.remove('hidden');
    }
    else {
        volumeHigh.classList.remove('hidden');
    }
    if (audio.muted && audio.volume === 0 && volumeRange.dataset.volume === '0') {
        volumeIcons.forEach(icon => {
            icon.classList.add('hidden');
        });
        volumeLow.classList.remove('hidden');
    }
    console.log(audio.muted)

}

audio.addEventListener('volumechange', updateVolumeIcon);

/* End Регулятор громкости */





audio.addEventListener('ended', playNext);
playPrevBtn.addEventListener('click', playPrev);
playNextBtn.addEventListener('click', playNext);
playBtn.addEventListener('click', toggleAudio);

// window.addEventListener('load', addPlayList)




