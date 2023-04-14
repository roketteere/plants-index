var dataItems = []
var searchResults = []
var lastSearchedItem = []
var tempResults = []
var plant_array = []
var database = []

var states = ['arizona', 'california', 'florida', 'idaho', 'montana', 'nevada', 'new-mexico', 'oregon', 'pennsylvania', 'utah', 'washington', 'wyoming']


states.forEach(function (state) {
    var db = []
    fetch(`/assets/json/${state}.json`).then(response => response.json()).then(data => {
        for (var i = 0; i < data[state].length; i++) {
            db.push(data[state][i])
            console.log('State:::: ', state);

        }
        dataItems.push(db)
        console.log('Database: ', db);
    });
})

// Save search history to local storage
var search_history = [];

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

function getQuote(){
let getQuote = fetch(
    `https://api.api-ninjas.com/v1/quotes?category=environmental`,{
    headers: { 'X-Api-Key': 'zxKEypy5sMHpWaDnRk1H8A==u8OZejnWzsuLY6Om'}}
    ).then(function(response){
    response.json().then(function (data){
        console.log("data:", data)
    let quote = data[0].quote
    let author = data[0].author
    // TODO: append quote to header of main box
    let someBox = document.querySelector('#quoteBox')
    console.log("someBox:", someBox)
    let quoteBox = document.createElement('h2')
    quoteBox.textContent = `${author}- ${quote}`
    someBox.appendChild(quoteBox)
})})}

// create and append plant information

// create and append plant information

function displayPlantInfo(plantArray) {
  plantArray.forEach(function (plant) {
    var plantCard = document.createElement("div");
    plantCard.classList.add("col", "s6", "m4", "xl2");
    var card = document.createElement("div");
    card.classList.add("card", "hoverable");
    var cardImage = document.createElement("div");
    cardImage.classList.add(
      "card-image",
      "waves-effect",
      "waves-block",
      "waves-light"
    );
    var plantImage = document.createElement("img");
    plantImage.classList.add("activator", "plant-image");
    plantImage.setAttribute("src", plant.imageUrl);
    var cardContent = document.createElement("div");
    cardContent.classList.add("card-content");
    var cardTitle = document.createElement("span");
    cardTitle.classList.add(
      "card-title",
      "activator",
      "grey-text",
      "text-darken-4",
      "truncate"
    );
    var icon = document.createElement("i");
    icon.classList.add("material-icons", "right");
    icon.textContent = "more_vert";
    var scienceName = document.createElement("p");
    scienceName.classList.add("truncate");
    var cardReveal = document.createElement("div");
    cardReveal.classList.add("card-reveal");
    var cardTitleReveal = document.createElement("span");
    cardTitleReveal.classList.add("card-title", "grey-text", "text-darken-4");
    var closeReveal = document.createElement("i");
    closeReveal.classList.add("material-icons", "right");
    closeReveal.textContent = "close";
    var infoReveal = document.createElement("p");
    var revealContent = document.createElement("div");
    revealContent.classList.add("reveal-content");
    var revealRowDark = document.createElement("div");
    revealRowDark.classList.add("list-row-dark");
    var revealRowLight = document.createElement("div");
    revealRowDark.classList.add("list-row-light");
    var rowUpperLeft = document.createElement("div");
    rowUpperLeft.classList.add("column-text-list1");
    var rowUpperRight = document.createElement("div");
    rowUpperRight.classList.add("column-text-list2");
    var rowLowerLeft = document.createElement("div");
    rowLowerLeft.classList.add("column-text-list1");
    var rowLowerRight = document.createElement("div");
    rowLowerRight.classList.add("column-text-list2");

    // append data
    resultsPage.appendChild(plantCard);
    plantCard.appendChild(card);
    card.appendChild(cardImage);
    cardImage.appendChild(plantImage);
    card.appendChild(cardContent);
    cardContent.appendChild(cardTitle);
    cardTitle.appendChild(icon);
    cardContent.appendChild(scienceName);
    card.appendChild(cardReveal);
    cardReveal.appendChild(cardTitleReveal);
    cardTitleReveal.appendChild(closeReveal);
    cardReveal.appendChild(infoReveal);
    infoReveal.appendChild(revealContent);
    revealContent.appendChild(revealRowDark);
    revealRowDark.appendChild(rowUpperLeft);
    revealRowDark.appendChild(rowUpperRight);
    revealContent.appendChild(revealRowLight);
    revealRowLight.appendChild(rowLowerLeft);
    revealRowLight.appendChild(rowLowerRight);

    // fill each section with plant data
    plantImage.setAttribute("src", plant.plantImage);
    cardTitle.textContent = plant.commonName;
    scienceName.textContent = plant.scientificName;
    cardTitleReveal.textContent = plant.commonName;
    rowUpperLeft.textContent = "Family:";
    rowUpperRight.textContent = plant.family;
    rowLowerLeft.textContent = "Year Documented:";
    rowLowerRight.textContent = plant.year;
  });
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
    for (let i = 1; i < array[0].length; i++) {
        let commonName = array[0][i].common_name;
        let scientificName = array[0][i].scientific_name
        let plantImage = array[0][i].image_url
        let year = array[0][i].year
        let genus = array[0][i].genus
        let family = array[0][i].family
        let synonyms = array[0][i].synonyms
        let plant = new Plant(commonName, scientificName, plantImage, year, genus, family, synonyms)
        plantArray.push(plant)
    }
    return plantArray
}

// Smart Search Feature
//
// event = event.target (in this case the input box)
// searchable_data = array of data we want to make "smartSearch"
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
        console.log('Search History Saved', plantName);
        searchBox.value = ''
        findPlants()
        getQuote()
    }

})


function addToFavorites(plantName) {
  if (!localStorage.getItem("favorite-plant")) {
    let plantStorage = [];
    plantStorage.push(plantName);
    localStorage.setItem("favorite-plant", JSON.stringify(plantStorage));
  } else {
    let plantStorage = JSON.parse(localStorage.getItem("favorite-plant"));
    if (!plantStorage.includes(plantName)) {
      plantStorage.push(plantName);
      localStorage.setItem("favorite-plant", JSON.stringify(plantStorage));
    }
  }
}

function getFavorites(){
    let favorites = JSON.parse(localStorage.getItem('favorite-plant'))
    return favorites
}

function displayFavorites(){
    let favoritePlants = getFavorites()
    const plantArray = sortTrefleAreaSearch(favoritePlants)
        displayPlantInfo(plantArray);
}

// click event listener for search button
searchButton.addEventListener('click', function (event) {
    event.preventDefault();
    event.target;
    saveSearch(search_history);
    addToHistory(plantName);
    const plantArray = sortTrefleAreaSearch(searchResults[0])
    displayPlantInfo(plantArray);
    // fetchNationParkAPI(plantName);
    console.log('City Saved To History: ', plantName);
    searchBox.value = ''
    findPlants()
    getQuote()


});


