import { infoModule, unitModule, DomModule } from "./modules.js";
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
        DomModule.forecastTableBody.innerHTML = data.forecast
            .map((day) => {
                return `
				<tr class="forecast-day">
					<th class="date-col forecast-date-el">${day.forecastDate}</th>
					<th class="weather-condition-col forecast-weather-condition-el">
						<img src="${day.weatherIcon}" alt="some icon" />
					</th>
					<th class="chance-rain-col ${unitModule["chance rain"]} ${
                    unitModule.usePercent
                }">
						${day.daily_chance_of_rain}
					</th>
					<th class="humidity-col ${unitModule.humidity} ${unitModule.usePercent}">
						${day.avghumidity}
					</th>
					<th class="precipiation-col ${unitModule.precipitation} ${
                    unitModule.unitConversion
                }">
						${infoModule.isMetric ? day.totalprecip_mm : day.totalprecip_in}
					</th>
					<th class="avg-temp-col ${unitModule.temp} ${unitModule.unitConversion}">
						${infoModule.isMetric ? day.avgtemp_c : day.avgtemp_f}
					</th>
					<th class="high-temp-col ${unitModule.temp} ${unitModule.unitConversion}">
						${infoModule.isMetric ? day.maxtemp_c : day.maxtemp_f}
					</th>
					<th class="low-temp-col ${unitModule.temp} ${unitModule.unitConversion}">
						${infoModule.isMetric ? day.mintemp_c : day.mintemp_f}
					</th>
				</tr>
				`;
            })
            .join("");

        // Get all element where we can convert units and change their data attribute 'isMetricUnits'
        const unitElements = DomModule.getAllUnitElements();
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
