import * as requests from "./requests.js";
import {
    infoModule,
    DomModule,
    displayGifRequestError,
    displayWeatherRequestError,
} from "./modules.js";

// Event listener for form or search bar; searches weather based on what's in the
// search or input search field when user wants to try entering in a new city/location
DomModule.searchWeatherForm.addEventListener("submit", (event) => {
    event.preventDefault();
    renderWeatherSearch(DomModule.inputCityEl.value);
});

// Event listener for button to toggle between the units we're using
/*
- Accomplished by requesting for the weather data of the current city 
that's on the screen, and then having logic to display the values with 
different units. So in the case that the user inputted a bad city, they still
can convert units for the current city they have, which is valid.
*/
DomModule.toggleUnitsBtn.addEventListener("click", () => {
    // If we're using metric, then we change to imperial
    if (infoModule.isMetric) {
        infoModule.isMetric = false;
        DomModule.toggleUnitsBtn.textContent = "Metric";
    } else {
        // If we're not using metric, then we change to using metric
        infoModule.isMetric = true;
        DomModule.toggleUnitsBtn.textContent = "Standard";
    }
    renderWeatherSearch(infoModule.currentCity);
});

// Request for and display a gif
async function renderGif() {
    try {
        const gifURL = await requests.fetchGifURL(infoModule.gifSearchTerm);
        DomModule.gifImg.src = gifURL;
    } catch (error) {
        displayGifRequestError();
    }
}

// Request and display weather data.
async function renderWeatherData(inputLocation) {
    try {
        // Check if user's input city worked by doing a fetch request for the data
        const weatherData = await requests.fetchForecastData(inputLocation);
        // Fill out fields of information for the daily-weather-section
        DomModule.locationEl.textContent = `${weatherData.location.name}, ${weatherData.location.country}`;
        DomModule.weatherConditionImg.src = weatherData.current.weatherIcon;
        DomModule.localTimeEl.textContent = weatherData.location.localtime;
        DomModule.weatherConditionText.textContent =
            weatherData.current.weatherCondition;
        // Decide whether to display metric or imperial units
        if (infoModule.isMetric) {
            DomModule.tempEl.textContent = `${weatherData.current.temp_c} celsius`;
            DomModule.feelsLikeTempEl.textContent = `${weatherData.current.feelslike_c} celsius`;
            DomModule.windSpeedEl.textContent = `${weatherData.current.wind_kph} kph`;
            DomModule.precipitationEl.textContent = `${weatherData.current.precip_mm} mm`;
            DomModule.pressureEl.textContent = `${weatherData.current.pressure_mb} mb`;
        } else {
            DomModule.tempEl.textContent = `${weatherData.current.temp_f} fahrenheit`;
            DomModule.feelsLikeTempEl.textContent = `${weatherData.current.feelslike_f} fahrenheit`;
            DomModule.windSpeedEl.textContent = `${weatherData.current.wind_mph} mph`;
            DomModule.precipitationEl.textContent = `${weatherData.current.precip_in} in`;
            DomModule.pressureEl.textContent = `${weatherData.current.pressure_in} in`;
        }
        DomModule.humidityEl.textContent = `${weatherData.current.humidity}%`;
        DomModule.cloudCoverageEl.textContent = `${weatherData.current.cloud}%`;
        DomModule.uvIndexEl.textContent = weatherData.current.uv;

        // Fill out table of information for the forecast days
        DomModule.forecastTableBody.innerHTML = weatherData.forecast
            .map((day) => {
                return `
					<tr class="forecast-day">
						<th class="forecast-date-el">${day.forecastDate}</th>
						<th class="forecast-weather-condition-el">
							<img src="${day.weatherIcon}" alt="some icon" />
						</th>
						<th class="forecast-chance-rain-el">${day.daily_chance_of_rain}%</th>
						<th class="forecast-humidity-el">${day.avghumidity}%</th>
						<th class="forecast-precipitation-el">
							${infoModule.isMetric ? day.totalprecip_mm : day.totalprecip_in}
							${infoModule.isMetric ? "mm" : "in"}
						</th>
						<th class="forecast-avg-temp-el">
							${infoModule.isMetric ? day.avgtemp_c : day.avgtemp_f}
							${infoModule.isMetric ? "celsius" : "fahrenheit"}
						</th>
						<th class="forecast-high-temp-el">
							${infoModule.isMetric ? day.maxtemp_c : day.maxtemp_f}
							${infoModule.isMetric ? "celsius" : "fahrenheit"}
						</th>
						<th class="forecast-low-temp-el">
							${infoModule.isMetric ? day.mintemp_c : day.mintemp_f}
							${infoModule.isMetric ? "celsius" : "fahrenheit"}
						</th>
					</tr>
				`;
            })
            .join("");

        // At this point user's input city is valid, so make it the new current city
        infoModule.currentCity = inputLocation;

        // Capture the weather condition text as a gif search term to render a gif
        // Then call function to render that gif
        infoModule.gifSearchTerm = weatherData.current.weatherCondition;
    } catch (error) {
        displayWeatherRequestError();
    }
}

/*
- Searches for and displays weather information based on 'inputLocation', which
is a string for a given city

- Goes through entire search process of fetching and rendering data and 
elements for the weather.
*/
async function renderWeatherSearch(inputLocation) {
    try {
        // Wait for renderWeatherData to complete before renderGif()
        // so that infoModule.gifSearchTerm has a value
        await renderWeatherData(inputLocation);

        // At this point, we know renderWeatherData worked, so we can renderGif
        renderGif();
    } catch (error) {
        console.error(`renderWeatherSearch error: ${error}`);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    // On window load we search for and display the weather information
    // for infoModule.currentCity, which has a starting value for the default
    renderWeatherSearch(infoModule.currentCity);
});
