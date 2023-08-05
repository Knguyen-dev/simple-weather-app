import { infoModule, unitModule, DomModule } from "./modules.js";
import * as requests from "./requests.js";

// ***** Error rendering section *****
function hideErrorSection() {
    DomModule.overlayDiv.classList.add("content-hidden");
    DomModule.errorSection.classList.add("content-hidden");
}

async function displayErrorSection(response) {
    DomModule.overlayDiv.classList.remove("content-hidden");
    DomModule.errorSection.classList.remove("content-hidden");
    const jsonData = await response.json();
    DomModule.subErrorEl.textContent = jsonData.error.message;
}

// ***** Rendering page theme dark/light*****
function renderPageTheme() {
    if (infoModule.isDarkTheme) {
        document.body.classList.remove("light-mode");
    } else {
        document.body.classList.add("light-mode");
    }
}

function togglePageTheme() {
    if (infoModule.isDarkTheme) {
        DomModule.toggleThemeBtn.textContent = "Dark";
        infoModule.isDarkTheme = false;
    } else {
        DomModule.toggleThemeBtn.textContent = "Light";
        infoModule.isDarkTheme = true;
    }
    renderPageTheme();
}

// ***** Rendering weather data and units*****
function toggleUnits() {
    if (infoModule.isMetric) {
        infoModule.isMetric = false;
        DomModule.toggleUnitsBtn.textContent = "Metric";
    } else {
        infoModule.isMetric = true;
        DomModule.toggleUnitsBtn.textContent = "Standard";
    }
    renderWeatherData(infoModule.currentCity);
}

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

// Sets up page event listeners
function setupPageListeners() {
    // Create listener for toggling the units and set up its text
    if (infoModule.isMetric) {
        DomModule.toggleUnitsBtn.textContent = "Standard";
    } else {
        DomModule.toggleUnitsBtn.textContent = "Metric";
    }
    DomModule.toggleUnitsBtn.addEventListener("click", toggleUnits);

    // Create listener for toggling the theme of the page and set up the starting text
    if (infoModule.isDarkTheme) {
        DomModule.toggleThemeBtn.textContent = "Light";
    } else {
        DomModule.toggleThemeBtn.textContent = "Dark";
    }
    DomModule.toggleThemeBtn.addEventListener("click", togglePageTheme);

    // Create event listener for toggling
    DomModule.inputCityEl.value = infoModule.currentCity;
    DomModule.searchWeatherForm.addEventListener("submit", (event) => {
        event.preventDefault();
        renderWeatherSearch(DomModule.inputCityEl.value);
    });

    // Create event listener for closing the error window
    DomModule.closeErrorBtn.addEventListener("click", hideErrorSection);
}

/*
- loadPage: Important main function that loads in the working page
	1. It adds in the event listeners
	2. Loads in the starting theme of the page 
	3. Searches and displays the weather for the current city, which we 
		set to a default value in the infoModule
*/
function loadPage() {
    setupPageListeners();
    renderPageTheme();
    renderWeatherSearch(infoModule.currentCity);
}

export { loadPage };
