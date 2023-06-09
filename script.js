// eventually this will be replaced with a element.value in an input tag
// variable state, city, lat, lon, country will be replaced with element in future
const apiKey = "87d5e831d903000d41dfe328c8a934e5";
// let cityName = "Tucson"
// let state = "AZ"
let countryCode = "US";
const limit = "5";
let lan = "";
let lon = "";
let currentWeatherUrl = "";
let kelvin = 0;
let fahren = 0;

var usStates = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

async function getCityWeather(cityName, state) {
  let geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName},${state},${countryCode}&limit=${limit}&appid=${apiKey}`;
  let res = await fetch(geoUrl);
  let data = await res.json();
  let dataObj = data[0];
  let city = dataObj.name;
  lat = dataObj.lat;
  lon = dataObj.lon;
  let st = dataObj.state;
  let country = dataObj.country;
  currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  //console.log(currentWeatherUrl)
  //console.log(city, lat, lon, st, country)
  let cityEl = document.getElementById("city-name");
  cityEl.textContent = city;
  getCurrentWeather();
}

async function getCurrentWeather() {
  console.log(currentWeatherUrl);
  let res = await fetch(currentWeatherUrl);
  let data = await res.json();
  let dataObj = data;
  console.log(dataObj);
  kelvin = dataObj.main.temp;
  fahren = Math.round(((kelvin - 273.15) * 9) / 5 + 32);
  console.log(fahren);
  let day1Icon = dataObj.weather[0].icon;
  let iconUrl = `https://openweathermap.org/img/wn/${day1Icon}@2x.png`;
  let day1IconId = document.getElementById("day1Icon");
  day1IconId.src = iconUrl;
  let tempP = document.getElementById("temp");
  tempP.textContent = fahren;
  selectedAreasList();
}

let form = document.getElementById("form");
let cityInp = document.getElementById("city");
let stateInp = document.getElementById("state");
let checkbox = document.getElementById("checkbox");
console.log(stateInp);
usStates.forEach((state) => {
  let option = document.createElement("option");
  option.text = state;
  option.value = state;
  stateInp.add(option);
  // console.log(option)
});

let savedAreas = [];
function saveArea(enteredCity, enteredState) {
    let check = {city: enteredCity, state: enteredState}
    console.log(check)
    let bool = savedAreas.some(area => JSON.stringify(area) == JSON.stringify(check))
    console.log(bool)
    if (bool === false) {
    let obj = {
      city: enteredCity,
      state: enteredState,
      time: new Date().toLocaleTimeString()
    };
    savedAreas.push(obj);
    console.log(savedAreas);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  getCityWeather(cityInp.value, stateInp.value);
  console.log(cityInp.value, stateInp.value);
  if (checkbox.checked) {
    saveArea(cityInp.value, stateInp.value);
  }
});

function selectedAreasList() {
  let ul = document.getElementById("savedAreasList");
  let location = document.getElementsByClassName("location")
  Array.from(location).forEach(e => e.remove())
  savedAreas.forEach((area, index) => {
    let li = document.createElement("li");
    li.classList.add("location")
    li.textContent = `${area.city}, ${area.state}, ${area.time}`;
    // console.log("This is the content:", li.textContent);
    ul.appendChild(li);
    li.addEventListener("click", () => {getCityWeather(area.city, area.state)})
    // const date = new Date()
    // console.log(date.toLocaleTimeString())
    // let p = document.createElement("p")
    // p.textContent = date.toLocaleTimeString()
    // li.appendChild(p)
  });
}

