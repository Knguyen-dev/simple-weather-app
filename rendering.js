import { infoModule, DomModule } from "./modules.js";
import * as requests from "./requests.js";

// ***** Error rendering section *****
function hideErrorSection() {
    DomModule.overlayDiv.classList.add("content-hidden");
    DomModule.errorSection.classList.add("content-hidden");
}

// Displays modal for the error section
async function displayErrorSection(response) {
    DomModule.overlayDiv.classList.remove("content-hidden");
    DomModule.errorSection.classList.remove("content-hidden");
    const jsonData = await response.json();
    DomModule.subErrorEl.textContent = jsonData.error.message;
}

// ***** Rendering page theme dark/light*****
function renderPageTheme() {
    if (infoModule.isDarkTheme) {
        DomModule.toggleThemeBtn.textContent = "Light";
        document.body.classList.remove("light-mode");
    } else {
        DomModule.toggleThemeBtn.textContent = "Dark";
        document.body.classList.add("light-mode");
    }
}

// ***** Rendering weather data and units*****

// Fetch and update the url for the gif
async function renderGif() {
    try {
        const gifURL = await requests.fetchGifURL(infoModule.gifSearchTerm);
        DomModule.gifImg.src = gifURL;
    } catch (response) {
        displayErrorSection(response);
    }
}

// Request and display weather data.
async function renderWeatherData(inputLocation) {
    try {
        /*
		- Get the weather data 
			1. First create the html for the days in the weather forecast table
			2. Then fill out data for the daily-weather-section 
		*/
        const data = await requests.fetchForecastData(inputLocation);

        DomModule.forecastSection.innerHTML = data.forecast
            .map((day) => {
                return `
            <div class="forecast-day">
                <header class="forecast-day-header">
                    <h2>${day.forecastDate}</h2>
                    <div forecast-image-container>
                        <img src="${day.weatherIcon}"/>
                    </div>
                </header>
                <section class="forecast-day-body">
                    <p class="chance-rain-el uses-percentage">Chance Rain: ${
                        day.daily_chance_of_rain
                    }</p>
                    <p class="humidity-el uses-percentage">Humidity: ${
                        day.avghumidity
                    }</p>
                    <p class="precipitation-el units-can-convert">Precipitation: ${
                        infoModule.isMetric
                            ? day.totalprecip_mm
                            : day.totalprecip_in
                    }</p>
                    <p class="temp-el">Avg Temp: ${
                        infoModule.isMetric ? day.avgtemp_c : day.avgtemp_f
                    }</p>
                    <p class="temp-el">Max Temp: ${
                        infoModule.isMetric ? day.maxtemp_c : day.maxtemp_f
                    }</p>
                    <p class="temp-el">Min Temp: ${
                        infoModule.isMetric ? day.mintemp_c : day.mintemp_f
                    }</p>
                </section>
            </div>`;
            })
            .join("");

        DomModule.projectContainer.setAttribute(
            "data-use-metric-units",
            infoModule.isMetric
        );

        // Fill out fields of information for the daily-weather-section
        DomModule.locationEl.textContent = `${data.location.name}, ${data.location.country}`;
        DomModule.weatherConditionImg.src = data.current.weatherIcon;
        DomModule.localTimeEl.textContent = data.location.localtime;
        DomModule.weatherConditionText.textContent =
            data.current.weatherCondition;
        DomModule.humidityEl.textContent = data.current.humidity;
        DomModule.cloudCoverageEl.textContent = data.current.cloud;
        DomModule.uvIndexEl.textContent = data.current.uv;

        // Fill out either metric or standard units for the daily-weather-section
        if (infoModule.isMetric) {
            DomModule.tempEl.textContent = data.current.temp_c;
            DomModule.feelsLikeTempEl.textContent = data.current.feelslike_c;
            DomModule.windSpeedEl.textContent = data.current.wind_kph;
            DomModule.precipitationEl.textContent = data.current.precip_mm;
            DomModule.pressureEl.textContent = data.current.pressure_mb;
        } else {
            DomModule.tempEl.textContent = data.current.temp_f;
            DomModule.feelsLikeTempEl.textContent = data.current.feelslike_f;
            DomModule.windSpeedEl.textContent = data.current.wind_mph;
            DomModule.precipitationEl.textContent = data.current.precip_in;
            DomModule.pressureEl.textContent = data.current.pressure_in;
        }

        /*
		- At this point, the fetch request was successful, so the city was valid. 
			1. Record the city (inputLocation) that the user put it as the new current city
				whose data we're showing
			2. Then record the text describing the weather condition as the new 
				gif search term that we'll use to search up a gif to show the user.
		*/
        infoModule.currentCity = inputLocation;
        infoModule.gifSearchTerm = data.current.weatherCondition;
    } catch (response) {
        displayErrorSection(response);
    }
}

/*
- Goes through entire weather search process by rendering weather data for 
	a given location, and then rendering the gif for that corresponding weather
*/
async function renderWeatherSearch(inputLocation) {
    await renderWeatherData(inputLocation);
    renderGif();
}

// Renders in an appropriate initial page
function renderInitialPage() {
    // Set up text for the unit toggling button
    if (infoModule.isMetric) {
        DomModule.toggleUnitsBtn.textContent = "Standard";
    } else {
        DomModule.toggleUnitsBtn.textContent = "Metric";
    }

    // Render and display the default city in the search bar
    DomModule.inputCityEl.value = infoModule.currentCity;

    // Render the default page theme
    renderPageTheme();

    // Render weather data for default city
    renderWeatherSearch(infoModule.currentCity);
}

export {
    renderPageTheme,
    renderWeatherData,
    renderWeatherSearch,
    hideErrorSection,
    renderInitialPage,
};
