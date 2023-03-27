// eventually this will be replaced with a element.value in an input tag
// variable state, city, lat, lon, country will be replaced with element in future
const apiKey = "87d5e831d903000d41dfe328c8a934e5"
// let cityName = "Tucson"
// let state = "AZ"
let countryCode = "US"
const limit = "5"
let lan = ""
let lon = ""
let currentWeatherUrl = ""
let kelvin = 0
let fahren = 0

var usStates = [
    'AL',
    'AK',
    'AZ',
    'AR',
    'CA',
    'CO',
    'CT',
    'DE',
    'FL',
    'GA',
    'HI',
    'ID',
    'IL',
    'IN',
    'IA',
    'KS',
    'KY',
    'LA',
    'ME',
    'MD',
    'MA',
    'MI',
    'MN',
    'MS',
    'MO',
    'MT',
    'NE',
    'NV',
    'NH',
    'NJ',
    'NM',
    'NY',
    'NC',
    'ND',
    'OH',
    'OK',
    'OR',
    'PA',
    'RI',
    'SC',
    'SD',
    'TN',
    'TX',
    'UT',
    'VT',
    'VA',
    'WA',
    'WV',
    'WI',
    'WY',
];



async function getCityWeather(cityName, state) {
    let geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName},${state},${countryCode}&limit=${limit}&appid=${apiKey}`
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

async function getCurrentWeather() {
    console.log(currentWeatherUrl)
    let res = await fetch(currentWeatherUrl);
    let data = await res.json();
    let dataObj = data;
    console.log(dataObj)
    kelvin = dataObj.main.temp
    fahren = Math.round((kelvin - 273.15) * 9/5 + 32)
    console.log(fahren)
    let day1Icon = dataObj.weather[0].icon
    let iconUrl = `https://openweathermap.org/img/wn/${day1Icon}@2x.png`
    let day1IconId = document.getElementById("day1Icon")
    day1IconId.src = iconUrl
    let tempP = document.getElementById("temp")
    tempP.textContent = fahren
}

let form = document.getElementById("form")
let cityInp = document.getElementById("city")
let stateInp = document.getElementById("state")
let checkbox = document.getElementById("checkbox")
console.log(stateInp)
usStates.forEach((state) => {
    let option = document.createElement("option")
    option.text = state
    option.value = state
    stateInp.add(option)
    // console.log(option)
})

let savedAreas = []
function saveArea(city, state) {
    let obj = {
        "city": city,
        "state": state
    }
    savedAreas.push(obj)
    console.log(savedAreas)
}

form.addEventListener("submit", (event) => {
    event.preventDefault() 
    getCityWeather(cityInp.value, stateInp.value);
    console.log(cityInp.value, stateInp.value)
    if (checkbox.checked) {
        saveArea(cityInp.value, stateInp.value)
    }
})