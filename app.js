import * as requests from "./requests.js";

const unitsModule = {
    // If true we use the metric system, else we use standard/imperial
    isMetric: true,
};

const DomModule = (() => {
    // On the real one you're going to load in the initialPage functions first
    // and then append their elements on the DOM first

    const searchWeatherForm = document.querySelector("#search-weather-form");
    const inputCityEl = document.querySelector("#input-city-el");
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

    const gifImg = document.querySelector("#gif-img");

    searchWeatherForm.addEventListener("submit", (event) => {
        event.preventDefault();
        renderWeatherData();
    });

    return {
        inputCityEl,
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
        gifImg,
    };
})();

// Attempt to request and display a gif
async function renderGif(searchTerm) {
    try {
        const gifURL = await requests.fetchGifURL(searchTerm);
        DomModule.gifImg.src = gifURL;
    } catch (error) {
        console.error(`Couldn't render gif: ${error}`);
    }
}

// Attempt to request and display weather data
/*
- Want this function to make a new request for data everytime the 
user not only submits the form, but when they want to change 
degrees and such. 
*/
async function renderWeatherData() {
    try {
        const weatherData = await requests.fetchCurrentWeatherData(
            DomModule.inputCityEl.value
        );

        DomModule.locationEl.textContent = `${weatherData.location.name}, ${weatherData.location.country}`;
        DomModule.weatherConditionImg.src = weatherData.weather.weatherIcon;
        DomModule.localTimeEl.textContent = weatherData.location.localtime;
        DomModule.weatherConditionText.textContent =
            weatherData.weather.weatherCondition;

        // Decide whether to display metric or imperial units
        if (unitsModule.isMetric) {
            DomModule.tempEl.textContent = `${weatherData.weather.temp_c} celsius`;
            DomModule.feelsLikeTempEl.textContent = `${weatherData.weather.feelslike_c} celsius`;
            DomModule.windSpeedEl.textContent = `${weatherData.weather.wind_kph} kph`;
            DomModule.precipitationEl.textContent = `${weatherData.weather.precip_mm} mm`;
            DomModule.pressureEl.textContent = `${weatherData.weather.pressure_mb} mb`;
        } else {
            DomModule.tempEl.textContent = `${weatherData.weather.temp_f} fahrenheit`;
            DomModule.feelsLikeTempEl.textContent = `${weatherData.weather.feelslike_f} fahrenheit`;
            DomModule.windSpeedEl.textContent = `${weatherData.weather.wind_mph} mph`;
            DomModule.precipitationEl.textContent = `${weatherData.weather.precip_in} in`;
            DomModule.pressureEl.textContent = `${weatherData.weather.pressure_in} in`;
        }
        DomModule.humidityEl.textContent = `${weatherData.weather.humidity}%`;
        DomModule.cloudCoverageEl.textContent = `${weatherData.weather.cloud}%`;
        DomModule.uvIndexEl.textContent = weatherData.weather.uv;

        // Now that we have the show nthe weather data,
        // we should render a gif related to the weather condition
        renderGif(weatherData.weather.weatherCondition);
    } catch (error) {
        console.error(`Couldn't render weather: ${error}`);
    }
}
