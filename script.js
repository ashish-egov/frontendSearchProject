// script.js
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const resultContainer = document.getElementById('result-container');

searchButton.addEventListener('click', searchWord);

function searchWord() {
    const word = searchInput.value.trim();
    if (word !== '') {
        fetchWordData(word);
    }
}

async function fetchWordData(word) {
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            displayResults(data);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });

}

function displayError(message) {
    resultContainer.innerHTML = `<div class="result-item">${message}</div>`;
}

function displayResults(data) {
    const container = document.getElementById("result-container");
    container.innerHTML = ""; // Clear previous results

    data.forEach(function (result) {
        const resultItem = document.createElement("div");
        resultItem.classList.add("result-item");

        const wordHeader = document.createElement("h2");
        wordHeader.innerText = result.word;
        resultItem.appendChild(wordHeader);

        const phoneticsHeader = document.createElement("p");
        phoneticsHeader.innerHTML = "<strong>Phonetics:</strong>";
        resultItem.appendChild(phoneticsHeader);

        const phoneticsList = document.createElement("ul");
        result.phonetics.forEach(function (phonetic) {
            const phoneticItem = document.createElement("li");
            phoneticItem.innerText = phonetic.text;
            phoneticsList.appendChild(phoneticItem);
        });
        resultItem.appendChild(phoneticsList);

        const meaningsHeader = document.createElement("p");
        meaningsHeader.innerHTML = "<strong>Meanings:</strong>";
        resultItem.appendChild(meaningsHeader);

        const meaningsList = document.createElement("ul");
        result.meanings.forEach(function (meaning) {
            const meaningItem = document.createElement("li");
            meaningItem.innerHTML = `<span class="part-of-speech">${meaning.partOfSpeech}</span>: ${meaning.definitions[0].definition}`;
            if (meaning.definitions[0].example) {
                meaningItem.innerHTML += `<br><span class="example">Example: ${meaning.definitions[0].example}</span>`;
            }
            meaningsList.appendChild(meaningItem);
        });
        resultItem.appendChild(meaningsList);

        container.appendChild(resultItem);
    });
}
