import { DomModule, infoModule } from "./modules.js";
import {
    renderPageTheme,
    renderWeatherData,
    renderWeatherSearch,
    hideErrorSection,
} from "./rendering.js";

// Toggles theme in the application
function togglePageTheme() {
    if (infoModule.isDarkTheme) {
        infoModule.isDarkTheme = false;
    } else {
        infoModule.isDarkTheme = true;
    }
    renderPageTheme();
}

// Toggling and rendering weather units
function toggleUnits() {
    if (infoModule.isMetric) {
        infoModule.isMetric = false;
        DomModule.toggleUnitsBtn.textContent = "Metric";
    } else {
        infoModule.isMetric = true;
        DomModule.toggleUnitsBtn.textContent = "Standard";
    }
    // Render data, which will show new units
    renderWeatherData(infoModule.currentCity);
}

// Creates and sets up event listeners for the application
function loadPageListeners() {
    // Button for toggling the page's theme
    DomModule.toggleThemeBtn.addEventListener("click", togglePageTheme);

    // For listener for toggling units
    DomModule.toggleUnitsBtn.addEventListener("click", toggleUnits);

    // Set up listener for the form
    DomModule.searchWeatherForm.addEventListener("submit", (event) => {
        event.preventDefault();
        renderWeatherSearch(DomModule.inputCityEl.value);
    });

    // Create event listener for closing the error window
    DomModule.closeErrorBtn.addEventListener("click", hideErrorSection);
}

export { loadPageListeners };
