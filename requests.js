function processWeatherData(dataObj) {
    return {
        // Weather related data
        weather: {
            humidity: dataObj.current.humidity,
            temp_f: dataObj.current.temp_f,
            temp_c: dataObj.current.temp_c,
            feelslike_f: dataObj.current.feelslike_f,
            feelslike_c: dataObj.current.feelslike_c,
            wind_mph: dataObj.current.wind_mph,
            wind_kph: dataObj.current.wind_kph,
            precip_in: dataObj.current.precip_in,
            precip_mm: dataObj.current.precip_mm,
            cloud: dataObj.current.cloud,
            pressure_in: dataObj.current.pressure_in,
            pressure_mb: dataObj.current.pressure_mb,
            uv: dataObj.current.uv,
            weatherCondition: dataObj.current.condition.text,
            weatherIcon: dataObj.current.condition.icon,
        },
        // Location related data
        location: {
            name: dataObj.location.name,
            country: dataObj.location.country,
            localtime: dataObj.location.localtime,
        },
    };
}

function createWeatherRequestURL(locationStr, getAirQuality) {
    // Free api key for weatherAPI and base url
    const apiKey = "911896e8357a450da40212216232707";
    const baseURL = "https://api.weatherapi.com/v1";
    const queryType = "current.json";
    const requestURL = `${baseURL}/${queryType}?key=${apiKey}&q=${locationStr}&aqi=${
        getAirQuality ? "yes" : "no"
    }`;
    return requestURL;
}

// Returns a promise that resolves to a object with important
// weather information for the current date
function fetchCurrentWeatherData(locationStr, getAirQuality = true) {
    const requestURL = createWeatherRequestURL(locationStr, getAirQuality);
    return fetch(requestURL, {
        mode: "cors",
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Http Error: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            return processWeatherData(data);
        });
}

function createGifRequestURL(searchTerm) {
    const apiKey = "NEs7tmX6Z6Up0BlOyfGtmFbMHoe2fTKh"; // free api key
    const baseURL = `https://api.giphy.com/v1/gifs/translate?`;
    const requestURL = `${baseURL}api_key=${apiKey}&s=${searchTerm}`;
    return requestURL;
}

async function fetchGifURL(searchTerm) {
    const requestURL = createGifRequestURL(searchTerm);
    const response = await fetch(requestURL, {
        mode: "cors",
    });
    if (!response.ok) {
        throw new Error(`Http Error: ${response.status}`);
    }
    const jsonData = await response.json();
    const gifURL = jsonData.data.images.original.url;
    return gifURL;
}

export { fetchCurrentWeatherData, fetchGifURL };
