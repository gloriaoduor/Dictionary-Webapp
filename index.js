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

//function to search for the word
function search(word){
    fetchApi(word);
    searchInput.value = word;
}

//function to display the result of the query 
function data(result, word){
    if(result.title){
        infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Check your spelling or try another word`;
    }else{
        pageContent.classList.add("active");
        let definitions = result[0].meanings[0].definitions[0];
        document.querySelector(".word p").innerText = result[0].word;
        document.querySelector(".meaning span").innerText = definitions.definition;
    }
}
//Events
searchInput.addEventListener("keyup", e =>{
    let word = e.target.value.replace(/\s+/g, ' ');
    if(e.key == "Enter" && word){
        fetchApi(word);
    }
});

removeIcon.addEventListener("click", ()=>{
    searchInput.value = "";
    searchInput.focus();
    pageContent.classList.remove("active");
    infoText.style.color = "#9A9A9A";
    infoText.innerHTML = "Type any existing word and press enter to get meaning";
});

resetBtn.addEventListener('click', (e)=>{
    pageContent.classList.remove("active");
    infoText.innerHTML = "";
    searchInput.value = "";

})