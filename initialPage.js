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
    extraBtnsSection.innherHTML = `
	<button id="temperature-toggle-btn">
		Fahrenheit
	</button>
	`;

    headerNav.appendChild(siteInfoSection);
    headerNav.appendChild(searchWeatherForm);
    headerNav.appendChild(extraBtnsSection);
    projectHeader.appendChild(headerNav);
    return projectHeader;
}

// Returns a project footer
function createProjectFooter() {
    const footerLinks = {
        Github: "https://github.com/Knguyen-dev/simple-weather-app.git",
        WeatherAPI: "https://www.weatherapi.com/",
    };

    const projectFooter = document.createElement("footer");
    projectFooter.id = "project-footer";

    const footerInfoEl = document.createElement("p");
    footerInfoEl.id = "footer-date-el";
    footerInfoEl.textContent = `Knguyen ${new Date.getFullYear()}`;

    const footerNav = document.createElement("nav");
    footerNav.id = "footer-nav-el";
    for (const [linkName, linkUrl] of footerLinks.entries()) {
        const footerNavItem = document.createElement("li");
        footerNavItem.className = "footer-nav-item";

        const footerNavLink = document.createElement("a");
        footerNavLink.className = "footer-nav-link";
        footerNavLink.textContent = linkName;
        footerNavLink.href = linkUrl;

        footerNavItem.appendChild(footerNavLink);
        footerNav.appendChild(footerNavItem);
    }

    projectFooter.appendChild(footerInfoEl);
    projectFooter.appendChild(footerNav);
    return projectFooter;
}
