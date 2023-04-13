// import trefle fetch
// var trefleData = [];
// get json
var dataItems = []
var searchResults = []
var lastSearchedItem = []
var tempResults = []
var plant_array = []

function getData() {
    fetch('/assets/json/ari.json').then(response => response.json()).then(data => { // ds = JSON.stringify(data);
        for (var i = 0; i < data.length; i++) { // console.log('Common Name:', data[i].common_name);
            dataItems.push(data[i])

        }

    })
};

// Save search history to local storage
var search_history = [];
// var plants = [];

// Element Variables
var searchButton = document.querySelector("#search-button");
var searchBox = document.querySelector("#place-search-input");
var cardContainer = document.querySelector("#card-container");
var searchContainer = document.querySelector(".find-plants-container")
var resultsPage = document.getElementById("results-page")
var card = document.getElementsByClassName("plant-card")

// Hide/Unhide Plant Cards
function findPlants() {
    searchContainer.classList.add('hide')
    resultsPage.classList.remove('hide')

    // modalSearchButton.classList.remove('hide')

}


// create and append plant information

function displayPlantInfo(plantArray) {
    plantArray.forEach(function (plant) {

        var plantCard = document.createElement("div")
        plantCard.classList.add("col", "s6", "m4", "xl2", "plant-card");
        var card = document.createElement("div")
        card.classList.add("card", "hoverable", "rounded")
        var cardImage = document.createElement("div")
        cardImage.classList.add("card-image", "overflow", "plant-image")
        var plantImage = document.createElement("img")

        plantImage.setAttribute("src", plant.imageUrl)
        var cardContent = document.createElement("div")
        cardContent.classList.add("card-content")
        var cardTitle = document.createElement("span")
        cardTitle.classList.add("card-title", "truncate")
        var scienceName = document.createElement("p")
        scienceName.classList.add("scientific-name", "truncate")

        // append data
        resultsPage.appendChild(plantCard)
        plantCard.appendChild(card)
        card.appendChild(cardImage)
        cardImage.appendChild(plantImage)
        card.appendChild(cardContent)
        cardContent.appendChild(cardTitle)
        cardContent.appendChild(scienceName)

        // fill each section with plant data
        plantImage.setAttribute("src", plant.plantImage)
        cardTitle.textContent = plant.commonName
        scienceName.textContent = plant.scientificName

    })
}


// modal elements
// plant info modal
var modalButton = document.getElementById("modal-button")
var closeButton = document.querySelector("#close-button")
var modal = document.querySelector(".qmodal")
var searchModal = document.querySelector("#search-modal")

// search modal
var modalSearchButton = document.querySelector(".modal-search-button")


// modal functions

// open search modal
function openSearch() {
    searchModal.classList.remove("hide")
}

// close current modal
function closeModal() {
    modal.classList.add("hide")
}

// event listeners
modalSearchButton.addEventListener("click", openSearch)
closeButton.addEventListener("click", closeModal)

// function openSearch
function openSearch() {
    searchModal.classList.remove("hide")
}
function closeModal() {
    modal.classList.add("hide")
}

// hide/unhide search modal
// modalSearchButton.addEventListener("click", openSearch)
// closeButton.addEventListener("click", closeModal)

// save search to history
function saveSearch(global_history) {
    if (localStorage.setItem('search-history', global_history)) {
        console.log('HISTORY SAVED SUCCESSFULLY');

    }
}

// add search input to search history and append element
function addToHistory(plant_name) { // fetchNationParkAPI(plant_name)
    search_history.push(plant_name);
    var plant = document.createElement("p")
    plant.className = "button is-light is-warning is-fullwidth is-size-5"
    plant.innerHTML = plant_name
    // cardContainer.appendChild(plant);
    return plantName;

}

// create Plant class so we can organize our data
class Plant {
    constructor(commonName, scientificName, plantImage, year, genus, family, synonyms) {
        this.commonName = commonName
        this.scientificName = scientificName;
        this.plantImage = plantImage
        this.year = year
        this.genus = genus
        this.family = family
        this.synonyms = synonyms
    }
}

// sort through the array of search results and grab all the info we need
function sortTrefleAreaSearch(array) {
    let plantArray = []
    for (let i = 0; i < array.length; i++) {
        let commonName = array[i].common_name;
        let scientificName = array[i].scientific_name
        let plantImage = array[i].image_url
        let year = array[i].year
        let genus = array[i].genus
        let family = array[i].family
        let synonyms = array[i].synonyms
        let plant = new Plant(commonName, scientificName, plantImage, year, genus, family, synonyms)
        plantArray.push(plant)
    }
    return plantArray
}

// Smart Search Feature
//
// event = event.target (in this case the input box)
// searchable_data = array of data we want to make "smartSearch"
// filtered_data = data we want to show up in our search query
// search_filter = items passed to the filter so they can be added to the fi
function smartSearchAlpha(event, searchable_data =[], search_filter =[]) {
    event.preventDefault();
    var search_input = event.target.value;
    var searched_data = searchable_data.filter((data) => {
        var search_filter_items = "";
        search_filter.forEach((arguments) => {
            search_filter_items += data.hasOwnProperty(arguments) && data[arguments].toLowerCase().trim() + " "
        });
        return Object.keys(data).some((key) => {
            return((data[key]) !== undefined && data[key] !== null && JSON.stringify(data[key]).toLowerCase().trim().includes(search_input)) || search_filter_items.includes(search_input)
        })
    })
    searchResults.unshift(searched_data)
    console.log('Shifted Items: ', searchResults[0])
    return;

};


// Keyup event listener add event listener to search box
searchBox.addEventListener('keyup', function (event) {
    var inputEl = event.target;
    smartSearchAlpha(event, dataItems, filter = ['family']);
    plantName = inputEl.value;
    console.log(plantName);
})

// on keyboard enter, search
searchBox.addEventListener('keypress', function (event) { // event.preventDefault();
    event.target
    if (event.key === "Enter") {
        event.preventDefault();
        addToHistory(event.target.value);
        saveSearch(search_history);
        const plantArray = sortTrefleAreaSearch(searchResults[0])
        displayPlantInfo(plantArray);
        console.log('::KEYBOARD:: City Saved To History: ', plantName);
        searchBox.value = ''
        findPlants()

    }

})

// click event listener for search button
searchButton.addEventListener('click', function (event) {
    event.preventDefault();
    event.target;
    saveSearch(search_history);
    addToHistory(plantName);
    // fetchNationParkAPI(plantName);
    console.log('City Saved To History: ', plantName);
    searchBox.value = ''
    findPlants()


});


getData()
