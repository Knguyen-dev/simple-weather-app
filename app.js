import { renderInitialPage } from "./rendering.js";
import { loadPageListeners } from "./pageListeners.js";
window.addEventListener("DOMContentLoaded", () => {
    renderInitialPage();
    loadPageListeners();
});
