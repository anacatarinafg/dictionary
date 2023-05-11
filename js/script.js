const toggleTheme = document.querySelector(".navbar__button");
const searchInput = document.getElementById("search");
const wordName = document.querySelector(".word__name");
const wordTag = document.querySelector(".word__tag");
const wordMeaning = document.querySelector(".word__meaning");



// Add dark theme to the webpage
toggleTheme.addEventListener("click", (event) => {
    const body = document.querySelector("body");
    if (body.classList.contains("darkMode")) {
        body.classList.remove("darkMode");
        event.target.innerHTML = '<span class="material-symbols-outlined navbar__toggle">dark_mode</span>'
    } else {
        body.classList.add("darkMode");
        event.target.innerHTML = '<span class="material-symbols-outlined navbar__toggle">light_mode</span>'
    }
})

// Fetch data from rapidApi;
const fetchWordDefinition = async (word) => {
    const url = `https://dictionary-data-api.p.rapidapi.com/definition/${word}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '0962f988c6msh9c27cb183d39606p176220jsna3d294466adb',
            'X-RapidAPI-Host': 'dictionary-data-api.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log('result:', result);
        dictionary(result, word); // Call dictionary function with result and word as parameters
    } catch (error) {
        console.error(error);
    }
}

// Call the function with a word parameter
fetchWordDefinition('dance');


function searchWords(word) {
    searchInput.value = word;
    console.log(searchInput.value);
    fetchWordDefinition(word);
}
searchInput.addEventListener("keyup", e => {
    if (e.key === "Enter" && e.target.value) {
        fetchWordDefinition(e.target.value);
        e.target.value = ""; // Clean the input field after an search
    }
})

// Building my dictionary
function dictionary(result, word) {
    if (!result.word) {
        wordName.innerHTML = `Can't find the meaning of ${word}.`;
        wordMeaning.innerHTML = "";
    } else if (result.meaning && result.meaning.length > 0) {
        let values = null;
        let tag = null;
        if (result.meaning[0].values && result.meaning[0].values.length > 0) {
            values = result.meaning[0].values[0];
        }
        if (result.meaning[0].tag && result.meaning[0].tag.length > 0) {
            tag = result.meaning[0].tag[0];
        }
        if (values, tag) {
            wordName.innerHTML = `${result.word} <span class="word__tag">${tag}</span>`
            wordMeaning.innerHTML = `
            <span class="material-symbols-outlined">
            trending_flat
            </span> ${values}`;
        } else {
            wordName.innerHTML = `Can't find the meaning of ${word}.`;
            wordMeaning.innerHTML = "";
        }
    } else {
        wordName.innerHTML = `Can't find the meaning of ${word}.`;
        wordMeaning.innerHTML = "";
    }
}