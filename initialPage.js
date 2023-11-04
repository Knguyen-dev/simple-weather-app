/*
- File for creating and returning the initial page elements
*/
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
			</button>
		`;

    const extraBtnsSection = document.createElement("section");
    extraBtnsSection.className = "extra-btns";
    extraBtnsSection.innerHTML = `
		<button id="toggle-theme-btn">Dark</button>
		<button id="toggle-units-btn">
		</button>
		`;

    headerNav.appendChild(siteInfoSection);
    headerNav.appendChild(searchWeatherForm);
    headerNav.appendChild(extraBtnsSection);
    projectHeader.appendChild(headerNav);
    return projectHeader;
}

function createOverlay() {
    const overlay = document.createElement("div");
    overlay.className = "overlay";
    return overlay;
}

function createErrorSection() {
    // Create modal and error section that we'll show when an error happens
    const errorSection = document.createElement("section");
    errorSection.className = "error-section";
    errorSection.innerHTML = `
		<h1 id="main-error-message">Weather Error!</h1>
		<p id="sub-error-message"></p>
		<button id="close-error-btn">Close</button>
	`;
    return errorSection;
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
		<div class="daily-weather-header-top">
			<h1 id="location-el"></h1>
			<img
				id="weather-condition-icon"
				src=""
				alt="Weather Icon"
			/>
		</div>
		<div class="daily-weather-header-bottom">
			<p id="local-time-el">
			05-07-2022 5:42
			</p>
			<p id="weather-condition-text"></p>
		</div>`;

    // Create the body of that section
    const dailyWeatherBody = document.createElement("section");
    dailyWeatherBody.id = "daily-weather-body";

    /*
	- weatherDataElements: Object that defines the 6 statistics that we'll show in the 
		daily-weather-section, helping us create them.
		- Key: Name of the statistic that we'll use 
		- displayText: What we show the data as
		- id: Id of the element
		- classes: Classes that we put on the element
	*/
    const weatherDataElements = {
        Temp: {
            displayText: "Temp",
            id: "current-temp-el",
            classes: ["temp-el"],
        },
        "Feels Like": {
            displayText: "Feels Like",
            id: "current-feels-like-temp-el",
            classes: ["temp-el"],
        },
        Humidity: {
            displayText: "Humidity",
            id: "current-humidity-el",
            classes: ["humidity-el", "uses-percentage"],
        },
        "Wind Speed": {
            displayText: "Wind Speed",
            id: "current-wind-speed-el",
            classes: ["wind-speed-el"],
        },
        Precipitation: {
            displayText: "Precipitation",
            id: "current-precipitation-el",
            classes: ["precipitation-el"],
        },
        "Cloud Coverage": {
            displayText: "Cloud Coverage",
            id: "current-cloud-coverage-el",
            classes: ["cloud-coverage-el", "uses-percentage"],
        },
        Pressure: {
            displayText: "Pressure",
            id: "current-pressure-el",
            classes: ["pressure-el"],
        },
        "UV Index": {
            displayText: "UV Index",
            id: "current-uv-index-el",
            classes: ["uv-index-el"],
        },
    };

    // Populate weatherData grid with weatherDataItem elements
    const weatherDataGrid = document.createElement("div");
    weatherDataGrid.id = "weather-data-grid";
    for (const dataName in weatherDataElements) {
        // Create the elements and variables we want to use relating to weather data
        const weatherDataItem = document.createElement("div");
        const elementID = weatherDataElements[dataName].id;
        const dataNameEl = document.createElement("span");
        const dataValueEl = document.createElement("p");

        // Populate dataNameEl with info
        weatherDataItem.className = "weather-data-item";
        dataNameEl.textContent = weatherDataElements[dataName].displayText;
        dataNameEl.classList.add("weather-data-name");

        // Populate dataValueEl elements with appropriate classes and IDs
        dataValueEl.classList.add("weather-data-value");
        dataValueEl.classList.add(...weatherDataElements[dataName].classes);
        dataValueEl.id = elementID;

        // Create appropriate structure for a weatherDataItem
        weatherDataItem.appendChild(dataNameEl);
        weatherDataItem.appendChild(dataValueEl);
        weatherDataGrid.appendChild(weatherDataItem);
    }

    // Creating container for a gif
    const gifContainer = document.createElement("div");
    gifContainer.id = "gif-container";
    const gifImg = document.createElement("img");
    gifImg.id = "gif-img";
    gifImg.alt = "Weather related gif";
    gifContainer.appendChild(gifImg);

    const forecastSection = document.createElement("div");
    forecastSection.id = "forecast-section";

    // Appending all of the sections together properly to create the intended markup structure
    mainContentSection.appendChild(dailyWeatherSection);
    dailyWeatherSection.appendChild(dailyWeatherHeader);
    dailyWeatherSection.appendChild(dailyWeatherBody);
    dailyWeatherBody.appendChild(weatherDataGrid);
    mainContentSection.appendChild(gifContainer);
    mainContentSection.appendChild(forecastSection);
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
function createInitialPage() {
    // Create our two root or outer most containers
    const contentDiv = document.createElement("div");
    contentDiv.className = "content";
    const projectContainer = document.createElement("section");
    projectContainer.className = "project-container";

    // Create overlay and error section
    const overlayDiv = createOverlay();
    const errorSection = createErrorSection();
    overlayDiv.classList.add("content-hidden");
    errorSection.classList.add("content-hidden");

    // Create the main 3 sections of the project
    const projectHeader = createProjectHeader();
    const projectMainContentSection = createProjectMainContent();
    const projectFooter = createProjectFooter();

    // Append elements according to the proper structure of the mark up
    contentDiv.appendChild(overlayDiv);
    contentDiv.appendChild(errorSection);
    contentDiv.appendChild(projectContainer);
    projectContainer.appendChild(projectHeader);
    projectContainer.appendChild(projectMainContentSection);
    projectContainer.appendChild(projectFooter);
    return contentDiv;
}

export { createInitialPage };
