import { createInitialPage } from "./initialPage.js";
// Module that contains extra information that we may need to use
const infoModule = {
    // the gif search term we use to show a gif
    gifSearchTerm: "",
    currentCity: "Manteca", // current city that's being examined
    isMetric: true, // whether or not we are using the metric or imperial system
    isDarkTheme: true, // whether site is using dark theme of not
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
    const initialPage = createInitialPage();
    document.body.appendChild(initialPage);

    // Query all of the necessary DOM elements that you need after page has loaded
    // and elements are on the DOM
    const overlayDiv = document.querySelector(".overlay");
    const errorSection = document.querySelector(".error-section");
    const mainErrorEl = document.querySelector("#main-error-message");
    const subErrorEl = document.querySelector("#sub-error-message");
    const closeErrorBtn = document.querySelector("#close-error-btn");

    const searchWeatherForm = document.querySelector("#search-weather-form");
    const inputCityEl = document.querySelector("#input-city-el");

    const toggleUnitsBtn = document.querySelector("#toggle-units-btn");

    const toggleThemeBtn = document.querySelector("#toggle-theme-btn");

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

    const getAllUnitElements = () => {
        return document.querySelectorAll(`.${unitModule.unitConversion}`);
    };
    return {
        overlayDiv,
        errorSection,
        mainErrorEl,
        subErrorEl,
        closeErrorBtn,
        searchWeatherForm,
        inputCityEl,
        toggleUnitsBtn,
        toggleThemeBtn,
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
        getAllUnitElements,
    };
})();

export { infoModule, DomModule, unitModule };
