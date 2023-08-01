function createProjectHeader() {
    const projectHeader = document.createElement("header");
    projectHeader.id = "project-header";

    const headerNav = document.createElement("nav");
    headerNav.id = "header-nav";

    const siteInfoSection = document.createElement("section");
    siteInfoSection.className = "site-info";
    siteInfoSection.innerHTML = `
		<div class="logo-container">
			<img
				src="./assets/icons/weather-logo.png"
				alt="Weather Logo"
				class="weather-logo-img"
			/>
		</div>
		<h2 class="site-name-el">SkyCast</h2>`;

    const searchWeatherForm = document.createElement("form");
    searchWeatherForm.id = "search-weather-form";
    searchWeatherForm.innerHTML = `
		<input
			id="input-city-el"
			name="input-city"
			type="text"
			placeholder="Enter a city"
			required
		/>
		<button id="search-weather-btn" type="submit">
			Search
		</button>`;

    const extraBtnsSection = document.createElement("section");
    extraBtnsSection.className = "extra-btns";
    extraBtnsSection.innerHTML = `
		<button id="toggle-units-btn">
			Metric
		</button>
		`;

    headerNav.appendChild(siteInfoSection);
    headerNav.appendChild(searchWeatherForm);
    headerNav.appendChild(extraBtnsSection);
    projectHeader.appendChild(headerNav);
    return projectHeader;
}

function createProjectMainContent() {
    const mainContentSection = document.createElement("section");
    mainContentSection.id = "project-main-content";

    // Create section to show all of the daily weather information
    const dailyWeatherSection = document.createElement("section");
    dailyWeatherSection.id = "daily-weather";

    // Create the header for that section
    const dailyWeatherHeader = document.createElement("section");
    dailyWeatherHeader.id = "daily-weather-header";
    dailyWeatherHeader.innerHTML = `
		<div class="header-top">
			<h1 id="location-el"></h1>
			<img
				id="weather-condition-icon"
				src=""
				alt="Weather Icon"
			/>
		</div>
		<div class="header-bottom">
			<p id="local-time-el">
			05-07-2022 5:42
			</p>
			<p id="weather-condition-text"></p>
		</div>`;

    // Create the body of that section
    const dailyWeatherBody = document.createElement("section");
    dailyWeatherBody.id = "daily-weather-body";

    // Now for creating the grid of weather data elements, we have an object
    // with the key of "text" explaining to the user what the data is for, and then value of
    // the id of the element
    const weatherDataElements = {
        Temp: "current-temp-el",
        "Feels Like": "feels-like-temp-el",
        Humidity: "humidity-el",
        "Wind Speed": "wind-speed-el",
        Precipitation: "precipitation-el",
        "Cloud Coverage": "cloud-coverage-el",
        Pressure: "pressure-el",
        "UV Index": "uv-index-el",
    };
    const weatherDataGrid = document.createElement("div");
    weatherDataGrid.id = "weather-data-grid";
    for (const weatherDataName in weatherDataElements) {
        const weatherDataItem = document.createElement("div");
        weatherDataItem.className = "weather-data-item";
        weatherDataItem.innerHTML = `
			<span class="weather-data-name">
				${weatherDataName}
			</span>
			<p
				class="weather-data-value"
				id="${weatherDataElements[weatherDataName]}"
			>
			</p>`;
        weatherDataGrid.appendChild(weatherDataItem);
    }

    // Creating container for a gif
    const gifContainer = document.createElement("div");
    gifContainer.id = "gif-container";
    const gifImg = document.createElement("img");
    gifImg.id = "gif-img";
    gifImg.alt = "Weather related gif";
    gifContainer.appendChild(gifImg);

    // Create table for the forecast data
    const forecastTable = document.createElement("table");
    forecastTable.id = "forecast-data-table";
    forecastTable.innerHTML = `
		<caption>
			Forecast weather!
		</caption>
		<thead id="forecast-row-labels">
			<tr>
				<th>Date</th>
				<th>Weather Condition</th>
				<th>Chance of Rain</th>
				<th>Humidity</th>
				<th>Precipitation</th>
				<th>Avg. Temp</th>
				<th>High Temp</th>
				<th>Low Temp</th>
			</tr>
		</thead>
		<tbody id="forecast-table-body">
		</tbody>
		`;

    // Appending all of the sections together properly to create the intended
    // markup structure
    mainContentSection.appendChild(dailyWeatherSection);
    dailyWeatherSection.appendChild(dailyWeatherHeader);
    dailyWeatherSection.appendChild(dailyWeatherBody);
    dailyWeatherBody.appendChild(weatherDataGrid);
    mainContentSection.appendChild(gifContainer);
    mainContentSection.appendChild(forecastTable);
    return mainContentSection;
}

// Returns a project footer
function createProjectFooter() {
    const footerLinks = {
        Github: "https://github.com/Knguyen-dev/simple-weather-app.git",
        WeatherAPI: "https://www.weatherapi.com/",
        GiphyAPI: "https://developers.giphy.com/",
    };
    const projectFooter = document.createElement("footer");
    projectFooter.id = "project-footer";

    const footerInfoEl = document.createElement("p");
    footerInfoEl.id = "footer-date-el";
    footerInfoEl.textContent = `Knguyen ${new Date().getFullYear()}`;

    const footerNav = document.createElement("nav");
    footerNav.id = "footer-nav-el";
    for (const linkName in footerLinks) {
        const footerNavItem = document.createElement("li");
        footerNavItem.className = "footer-nav-item";

        const footerNavLink = document.createElement("a");
        footerNavLink.className = "footer-nav-link";
        footerNavLink.textContent = linkName;
        footerNavLink.href = footerLinks[linkName];

        footerNavItem.appendChild(footerNavLink);
        footerNav.appendChild(footerNavItem);
    }

    projectFooter.appendChild(footerInfoEl);
    projectFooter.appendChild(footerNav);
    return projectFooter;
}

// Fills an empty DOM with elements from the initial page, header, maincontent, etc.
// Could also be 'create initial page '
function loadInitialPage() {
    // Create our two root or outer most containers
    const contentDiv = document.createElement("div");
    contentDiv.className = "content";
    const projectContainer = document.createElement("section");
    projectContainer.className = "project-container";

    // Create the main 3 sections of the project
    const projectHeader = createProjectHeader();
    const projectMainContentSection = createProjectMainContent();
    const projectFooter = createProjectFooter();

    // Append elements according to the proper structure of the mark up
    document.body.appendChild(contentDiv);
    contentDiv.appendChild(projectContainer);
    projectContainer.appendChild(projectHeader);
    projectContainer.appendChild(projectMainContentSection);
    projectContainer.appendChild(projectFooter);
}

export { loadInitialPage };
