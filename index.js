const pageContent = document.querySelector(".page-content"),
searchInput = pageContent.querySelector("input"),

infoText = pageContent.querySelector(".info-text"),

removeIcon = pageContent.querySelector(".search span");
resetBtn = pageContent.querySelector('.btn')

//function to fetch data from the API
function fetchApi(word){
    pageContent.classList.remove("active");
    infoText.style.color = "#000";
    infoText.innerHTML = 'Searching...';
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(url)
    .then(response => response.json())
    .then(result => data(result, word))
    .catch(() =>{
        infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Check your spelling or try another word`;
    });
}

