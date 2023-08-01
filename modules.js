import { loadInitialPage } from "./initialPage.js";

// Module that contains extra information that we may need to use
const infoModule = {
    // the gif search term we use to show a gif
    gifSearchTerm: "",
    currentCity: "Manteca", // current city that's being examined
    isMetric: true, // whether or not we are using the metric or imperial system
};

// IFFE returns a module containing  all of the necessary DOM elements that may be needed
const DomModule = (() => {
    // Puts all of content and elements onto the screen
    loadInitialPage();

    // Query all of the necessary DOM elements that you need after page has loaded
    // and elements are on the DOM
    const searchWeatherForm = document.querySelector("#search-weather-form");

    // Have city element contain the current city as its value in the search bar
    const inputCityEl = document.querySelector("#input-city-el");
    inputCityEl.value = infoModule.currentCity;

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
    const feelsLikeTempEl = document.querySelector("#feels-like-temp-el");
    const humidityEl = document.querySelector("#humidity-el");
    const windSpeedEl = document.querySelector("#wind-speed-el");
    const precipitationEl = document.querySelector("#precipitation-el");
    const cloudCoverageEl = document.querySelector("#cloud-coverage-el");
    const pressureEl = document.querySelector("#pressure-el");
    const uvIndexEl = document.querySelector("#uv-index-el");

    const dailyWeatherSection = document.querySelector("#daily-weather");
    const gifContainer = document.querySelector("#gif-container");
    const gifImg = document.querySelector("#gif-img");
    const forecastTable = document.querySelector("#forecast-data-table");
    const forecastTableBody = document.querySelector("#forecast-table-body");

    return {
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

// Simple functions that give the user alerts when a request went wrong
// So when a user enters a bad city name, we'll tell them what went wrong

function displayGifRequestError() {
    window.alert("Gif Request Error: Issue rendering gif");
}
function displayWeatherRequestError() {
    window.alert(
        "Weather Request Error: Having issues getting weather data. Please make sure you're entering in a valid city!"
    );
}

export {
    infoModule,
    DomModule,
    displayGifRequestError,
    displayWeatherRequestError,
};
