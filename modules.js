import { createInitialPage } from "./initialPage.js";
// Module that contains extra information that we may need to use
const infoModule = {
    // the gif search term we use to show a gif
    gifSearchTerm: "",
    currentCity: "Manteca", // current city that's being examined
    isMetric: true, // whether or not we are using the metric or imperial system
    isDarkTheme: true, // whether site is using dark theme of not
};

// IFFE returns a module containing  all of the necessary DOM elements that may be needed
const DomModule = (() => {
    // Puts all of content and elements onto the screen
    const initialPage = createInitialPage();
    document.body.appendChild(initialPage);

    const projectContainer = document.querySelector(".project-container");

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

    const forecastSection = document.querySelector("#forecast-section");

    return {
        projectContainer,
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
        forecastSection,
    };
})();

export { infoModule, DomModule };
