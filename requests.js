function processWeatherData(dataObj) {
    let processedData = {
        // Weather related data for the current day
        current: {
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

        /*
		- Weather related data for an n amount of forecast days. Note that 
		the first entry represents the current day, but there's just more detailed
		and other type of information. The rest of the entries are future days
		*/
        forecast: [],

        // Location related data
        location: {
            name: dataObj.location.name,
            country: dataObj.location.country,
            localtime: dataObj.location.localtime,
        },
    };

    // Get array that contains forecast weather information for an n number of days
    // represented in an n number of array elements.
    const forecastData = dataObj.forecast.forecastday;

    // For each day in forecastData, get only the useful information, put it into an object
    // and push it into forecast array
    for (let i = 0; i < forecastData.length; i++) {
        processedData.forecast.push({
            forecastDate: forecastData[i].date,
            daily_chance_of_rain: forecastData[i].day.daily_chance_of_rain,
            avghumidity: forecastData[i].day.avghumidity,
            totalprecip_in: forecastData[i].day.totalprecip_in,
            totalprecip_mm: forecastData[i].day.totalprecip_mm,
            avgtemp_c: forecastData[i].day.avgtemp_c,
            avgtemp_f: forecastData[i].day.avgtemp_f,
            maxtemp_c: forecastData[i].day.maxtemp_c,
            maxtemp_f: forecastData[i].day.maxtemp_f,
            mintemp_c: forecastData[i].day.mintemp_c,
            mintemp_f: forecastData[i].day.mintemp_f,
            weatherCondition: forecastData[i].day.condition.text,
            weatherIcon: forecastData[i].day.condition.icon,
        });
    }
    return processedData;
}

// Creates http request url for creating forecast data
function createForecastRequestURL(locationStr, numDays, getAirQuality) {
    const apiKey = "911896e8357a450da40212216232707";
    const baseURL = "https://api.weatherapi.com/v1";
    const queryType = "forecast.json";
    const requestURL = `${baseURL}/${queryType}?key=${apiKey}&q=${locationStr}&days=${numDays}&aqi=${
        getAirQuality ? "yes" : "no"
    }&alerts=no`;
    return requestURL;
}

function createGifRequestURL(searchTerm) {
    const apiKey = "NEs7tmX6Z6Up0BlOyfGtmFbMHoe2fTKh"; // free api key
    const baseURL = `https://api.giphy.com/v1/gifs/translate?`;
    const requestURL = `${baseURL}api_key=${apiKey}&s=${searchTerm}`;
    return requestURL;
}

// Returns a promise has an object for the forecast data
function fetchForecastData(locationStr, numDays = 3, getAirQuality = true) {
    const requestURL = createForecastRequestURL(
        locationStr,
        numDays,
        getAirQuality
    );
    return fetch(requestURL, {
        mode: "cors",
    })
        .then((response) => {
            if (!response.ok) {
                throw response;
            }
            return response.json();
        })
        .then((data) => {
            return processWeatherData(data);
        })
        .catch((error) => {
            console.error(`fetchForecastData error: ${error}`);
        });
}

function fetchGifURL(searchTerm) {
    const requestURL = createGifRequestURL(searchTerm);
    return fetch(requestURL, {
        mode: "cors",
    })
        .then((response) => {
            if (!response.ok) {
                throw response;
            }
            return response.json();
        })
        .then((jsonData) => {
            return jsonData.data.images.original.url;
        })
        .catch((error) => {
            console.error(`fetchGifURL error: ${error}`);
        });
}

export { fetchForecastData, fetchGifURL };
