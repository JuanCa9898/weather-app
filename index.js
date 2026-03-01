let input = document.getElementById("cityInput");
let button = document.getElementById("searchBtn");
let result = document.getElementById("weatherResult");

button.addEventListener("click", function(){
    let city = input.value;
    result.textContent = "Searching weather for " + city + " ..."

    let geoUrl = "https://geocoding-api.open-meteo.com/v1/search?name=" + city + "&count=1";
    fetch(geoUrl)
    .then(response => response.json())
    .then(data => {
        if (!data.results) {
            result.textContent = "City not found";
            return;
        }
        let latitude = data.results[0].latitude;
        let longitude = data.results[0].longitude;
        let weatherUrl = "https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longitude=" + longitude + "&current_weather=true"
        return fetch(weatherUrl);
    })
    .then(response => response.json())
    .then(data => {
        let temperature = data.current_weather.temperature;
        let windspeed = data.current_weather.windspeed;
        result.innerHTML =
        `
        <h2>${city}</h2>
        <p>Temperature: ${temperature}°C</p>
        <p>Wind Speed: ${windspeed} km/h</p>
        `;
    });
});

input.addEventListener("keypress", function(e) {
    if(e.key === "Enter"){
        button.click();
    }
});