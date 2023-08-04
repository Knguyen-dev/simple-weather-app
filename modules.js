import { loadInitialPage } from "./initialPage.js";

// Module that contains extra information that we may need to use
const infoModule = {
    // the gif search term we use to show a gif
    gifSearchTerm: "",
    currentCity: "Manteca", // current city that's being examined
    isMetric: true, // whether or not we are using the metric or imperial system
};

// Object of general classes for showing percentages and unit symbols
const unitModule = {
    temp: "temp-el",
    "chance rain": "chance-rain-el",
    "wind speed": "wind-speed-el",
    precipitation: "precipitation-el",
    pressure: "pressure-el",
    "cloud coverage": "cloud-coverage-el",
    "Uv Index": "uv-index-el",
    humidity: "humidity-el",
    precipitation: "precipitation-el",
    pressure: "pressure-el",
    unitConversion: "units-can-convert",
    usePercent: "uses-percentage",
};

// IFFE returns a module containing  all of the necessary DOM elements that may be needed
const DomModule = (() => {
    // Puts all of content and elements onto the screen
    loadInitialPage();

    const overlayDiv = document.querySelector(".overlay");
    const errorSection = document.querySelector(".error-section");

    const mainErrorEl = document.querySelector("#main-error-message");
    const subErrorEl = document.querySelector("#sub-error-message");

    const closeErrorBtn = document.querySelector("#close-error-btn");
    closeErrorBtn.addEventListener("click", hideErrorSection);

    // Query all of the necessary DOM elements that you need after page has loaded
    // and elements are on the DOM
    const searchWeatherForm = document.querySelector("#search-weather-form");

    // Have city element contain the current city as its value in the search bar
    const inputCityEl = document.querySelector("#input-city-el");
    inputCityEl.value = infoModule.currentCity;

    // Get all unit convertable elements

    // Get button for toggling the units and change its text based on the starting
    // settings
    const toggleUnitsBtn = document.querySelector("#toggle-units-btn");

    // If we start with using the Metric system, we let the button show
    // the user can use the standard system
    if (infoModule.isMetric) {
        toggleUnitsBtn.textContent = "Standard";
    } else {
        // Else if we're starting with the Metric system, we let the
        // user see they cna use metric
        toggleUnitsBtn.textContent = "Metric";
    }

    const locationEl = document.querySelector("#location-el");
    const weatherConditionImg = document.querySelector(
        "#weather-condition-icon"
    );
    const localTimeEl = document.querySelector("#local-time-el");
    const weatherConditionText = document.querySelector(
        "#weather-condition-text"
    );
    const tempEl = document.querySelector("#current-temp-el");
    const feelsLikeTempEl = document.querySelector(
        "#current-feels-like-temp-el"
    );
    const humidityEl = document.querySelector("#current-humidity-el");
    const windSpeedEl = document.querySelector("#current-wind-speed-el");
    const precipitationEl = document.querySelector("#current-precipitation-el");
    const cloudCoverageEl = document.querySelector(
        "#current-cloud-coverage-el"
    );
    const pressureEl = document.querySelector("#current-pressure-el");
    const uvIndexEl = document.querySelector("#current-uv-index-el");

    const dailyWeatherSection = document.querySelector("#daily-weather");
    const gifContainer = document.querySelector("#gif-container");
    const gifImg = document.querySelector("#gif-img");
    const forecastTable = document.querySelector("#forecast-data-table");
    const forecastTableBody = document.querySelector("#forecast-table-body");

    return {
        overlayDiv,
        errorSection,
        mainErrorEl,
        subErrorEl,
        closeErrorBtn,
        searchWeatherForm,
        inputCityEl,
        toggleUnitsBtn,
        locationEl,
        localTimeEl,
        weatherConditionText,
        weatherConditionImg,
        tempEl,
        feelsLikeTempEl,
        humidityEl,
        windSpeedEl,
        precipitationEl,
        cloudCoverageEl,
        pressureEl,
        uvIndexEl,
        dailyWeatherSection,
        gifContainer,
        gifImg,
        forecastTable,
        forecastTableBody,
    };
})();

function hideErrorSection() {
    DomModule.overlayDiv.classList.add("content-hidden");
    DomModule.errorSection.classList.add("content-hidden");
}

// Handles and displays errors, uses an http response object to help
// tell the user what happened
async function displayErrorSection(response) {
    DomModule.overlayDiv.classList.remove("content-hidden");
    DomModule.errorSection.classList.remove("content-hidden");
    const jsonData = await response.json();
    DomModule.subErrorEl.textContent = jsonData.error.message;
}

export {
    infoModule,
    DomModule,
    unitModule,
    hideErrorSection,
    displayErrorSection,
};
