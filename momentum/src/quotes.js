let random = '';
let length = 0;
let quote = '';
let author = '';
const quoteContainer = document.querySelector('.quote');
const authorContainer = document.querySelector('.author');

export async function getQuotes() {
    const quotes = 'src/data.json';
    const res = await fetch(quotes);
    let data = await res.json();
    random = Math.floor(Math.random() * data[0].length);
    length = data[0].length;
    return data
}
export const result = getQuotes().then(data => {
    return data
})


function setQuotes(lang, data) {
    if (lang === 'ru') {
        quote = data[0][random].textRu;
        author = data[0][random].authorRu;
    }
    if (lang === 'en') {
        quote = data[0][random].textEn;
        author = data[0][random].authorEn;
    }
    quoteContainer.classList.add('active');
    quoteContainer.innerHTML = `"${quote}"`;
    authorContainer.classList.add('active');
    authorContainer.innerHTML = author;
}


export function showQuotes(lang) {
    result.then(data => {
        setQuotes(lang, data);
    }
    );
}

export function reloadQuotes(lang) {
    random++;
    if (random === length) {
        random = 0;
    }
    result.then(data => {
        quoteContainer.classList.remove('active');
        authorContainer.classList.remove('active');
        setTimeout(()=>{
            setQuotes(lang, data);
        }, 500)
   
    })
}

