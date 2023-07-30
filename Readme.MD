-   Simple weather forecast site using a weather api.

*   Requirements and hints:

    1.  Should be able to search for a specific location
    2.  Should be able to toggle the temperature data between Fahrenheit and Celsius.
    3.  The look of the page should chnage based on data: Maybe changing the color of some elements
        and or by adding images that describe the weather. Could even use Giphy API to find appropriate
        weather related gifs.
    4.  Try to use both promises and async await.
    5.  Write functions that do requests for the api. Of course
        a function that takes a location and returns the weather data would be good.
    6.  Write functions that process and break down the JSON data you're getting from the api.
        Then after we just return an object with only the important information that we want
    7.  Set up a simple form that lets user input thier location, then
        on submit we submit the weather info.
    8.  Of course styling and displaying information on the site comes standard, but also
        have a loading animation or visual that plays when the user is waiting for the
        weather information after they've submitted stuff. A good lead is using .gif
        files to do this, and then hiding them once we actually got the information.

*   Cors:
    1.  Appropriate and typically necessary for network requests across different domains or sites.
    2.  If not used, browser will use "same-origin policy", which prevents making requests to domains
        otherthan the one from which the script originated. Meaning you can't launch requests to other websites
        as the request would be blocked by the browser, and as a result you won't receive data. Though
        sometimes APIs have less restrictive CORS policies for some requests to make it easier on developers
        to handle said API.
    3.  The other website you're requesting to needs to be confiured correctly with appropriate CORS
        headers for this to work out.
