
export function showDate(lang) {
    const date = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    let currentDate = date.toLocaleDateString(lang, options);
    currentDate = currentDate.split(' ').map(e => {
        return e[0].toUpperCase() + e.slice(1);
    }).join(' ');
    document.querySelector('.date').innerHTML = currentDate;
}




export function showTime() {
    const time = new Date();
    document.querySelector('.time').innerHTML = time.toLocaleTimeString('ru');
}















// export function showTime() {
//     const time = new Date();
//     const currentTime = time.toLocaleTimeString('ru');
//     document.querySelector('.time').innerHTML = showTime();
//     return currentTime
// }


/* функция добавления ведущих нулей (если число меньше десяти, перед числом добавляем ноль) */
// function zero_first_format(value) {
//     if (value < 10) {
//         value = '0' + value;
//     }
//     return value;
// }
// export function getTime() {
//     var current_datetime = new Date();
//     var hours = zero_first_format(current_datetime.getHours());
//     var minutes = zero_first_format(current_datetime.getMinutes());
//     var seconds = zero_first_format(current_datetime.getSeconds());
//     return hours + ":" + minutes + ":" + seconds;
// }

// document.querySelector('.time').innerHTML = getTime();




