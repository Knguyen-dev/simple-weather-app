import * as requests from "./requests.js";
import {
    infoModule,
    DomModule,
    unitModule,
    displayErrorSection,
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

- NOTE: We do renderWeatherData because we're not really interested in 
rendering a new gif, when all we really want is updated units on the weather data
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
    renderWeatherData(infoModule.currentCity);
});

// Request for and display a gif
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
        // Check if user's input city worked by doing a fetch request for the data
        const data = await requests.fetchForecastData(inputLocation);

        // Fill out forecast data table
        DomModule.forecastTableBody.innerHTML = data.forecast
            .map((day) => {
                return `
				<tr class="forecast-day">
					<th class="forecast-date-el">${day.forecastDate}</th>
					<th class="forecast-weather-condition-el">
						<img src="${day.weatherIcon}" alt="some icon" />
					</th>
					<th class="${unitModule["chance rain"]} ${unitModule.usePercent}">
						${day.daily_chance_of_rain}
					</th>
					<th class="${unitModule.humidity} ${unitModule.usePercent}">
						${day.avghumidity}
					</th>
					<th class="${unitModule.precipitation} ${unitModule.unitConversion}">
						${infoModule.isMetric ? day.totalprecip_mm : day.totalprecip_in}
					</th>
					<th class="${unitModule.temp} ${unitModule.unitConversion}">
						${infoModule.isMetric ? day.avgtemp_c : day.avgtemp_f}
					</th>
					<th class="${unitModule.temp} ${unitModule.unitConversion}">
						${infoModule.isMetric ? day.maxtemp_c : day.maxtemp_f}
					</th>
					<th class="${unitModule.temp} ${unitModule.unitConversion}">
						${infoModule.isMetric ? day.mintemp_c : day.mintemp_f}
					</th>
				</tr>
				`;
            })
            .join("");

        // Get all element where we can convert units and change their data attribute 'isMetricUnits'
        const unitElements = document.querySelectorAll(".units-can-convert");
        unitElements.forEach((element) => {
            element.setAttribute("data-is-metric-units", infoModule.isMetric);
        });

        // Fill out fields of information for the daily-weather-section
        DomModule.locationEl.textContent = `${data.location.name}, ${data.location.country}`;
        DomModule.weatherConditionImg.src = data.current.weatherIcon;
        DomModule.localTimeEl.textContent = data.location.localtime;
        DomModule.weatherConditionText.textContent =
            data.current.weatherCondition;
        // Decide whether to display metric or imperial units for the daily-weather-section
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
        DomModule.humidityEl.textContent = data.current.humidity;
        DomModule.cloudCoverageEl.textContent = data.current.cloud;
        DomModule.uvIndexEl.textContent = data.current.uv;

        /*
		- At this point user's input city is valid, so make it the new current city
        - Capture the weather condition text as a gif search term to render a gif
         	Then call function to render that gif
		*/
        infoModule.currentCity = inputLocation;
        infoModule.gifSearchTerm = data.current.weatherCondition;
    } catch (response) {
        displayErrorSection(response);
    }
}

/*
- Searches for and displays weather information based on 'inputLocation', which
is a string for a given city
- Goes through entire search process of fetching and rendering data and 
elements for the weather.
*/
async function renderWeatherSearch(inputLocation) {
    /*
	- Wait for renderWeatherData to complete before renderGif()
     	so that infoModule.gifSearchTerm has a value
	*/
    await renderWeatherData(inputLocation);
    /*
	- If renderWeatherData worked, we render a gif correctly. Else, renderGif still runs, 
		but an error will happen, so no gif will be loaded. Or a gif will be loaded using 
		the previous gifSearchTerm, which assumes a previous search worked
	*/
    renderGif();
}

window.addEventListener("DOMContentLoaded", () => {
    // On window load we search for and display the weather information
    // for infoModule.currentCity, which has a starting value for the default
    renderWeatherSearch(infoModule.currentCity);
});
