// eventually this will be replaced with a element.value in an input tag
// variable state, city, lat, lon, country will be replaced with element in future
const apiKey = "87d5e831d903000d41dfe328c8a934e5"
let cityName = "Tucson"
let state = "AZ"
let countryCode = "US"
const limit = "5"
let lan = ""
let lon = ""
let currentWeatherUrl = ""

let geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName},${state},${countryCode}&limit=${limit}&appid=${apiKey}`

async function getCityWeather() {
    let res = await fetch(geoUrl);
    let data = await res.json();
    let dataObj = data[0];
    let city = dataObj.name
    lat = dataObj.lat
    lon = dataObj.lon
    let st = dataObj.state
    let country = dataObj.country
    currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    //console.log(currentWeatherUrl)
    //console.log(city, lat, lon, st, country)
    let cityEl = document.getElementById("city-name");
    cityEl.textContent = city;
    getCurrentWeather();
}
getCityWeather();

async function getCurrentWeather() {
    console.log(currentWeatherUrl)
    let res = await fetch(currentWeatherUrl);
    let data = await res.json();
    let dataObj = data;
    console.log(dataObj)
    let day1Icon = dataObj.weather[0].icon
    let iconUrl = `https://openweathermap.org/img/wn/${day1Icon}@2x.png`
    let day1IconId = document.getElementById("day1Icon")
    day1IconId.src = iconUrl
}