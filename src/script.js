let date = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[date.getDay()];
let currentHour =
  date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
let currentMin =
  date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

let currentTime = `${currentDay} ${currentHour}:${currentMin} `;

let updatedTime = document.querySelector("#date-time");

updatedTime.innerHTML = `${currentTime}`;

let apiKey = "9e695cc5bacfa21c5921f78723caae18";

function displayChanges(response) {
  let newTemp = Math.round(response.data.main.temp);
  let changeTemp = document.querySelector("#temperature");
  changeTemp.innerHTML = `${newTemp}`;

  let newCity = response.data.name;
  let changeCity = document.querySelector("#show-city");
  changeCity.innerHTML = `${newCity}`;

  let description = response.data.weather[0].description;
  let capDescription =
    description[0].toLocaleUpperCase() + description.slice(1);
  let descriptionElement = document.querySelector("#weather-description");
  descriptionElement.innerHTML = `${capDescription}`;

  let humidity = response.data.main.humidity;
  let changeHumidity = document.querySelector("#humidity");
  changeHumidity.innerHTML = `${humidity}`;

  let wind = Math.round(response.data.wind.speed * 3.6);
  let changeWind = document.querySelector("#wind");
  changeWind.innerHTML = `${wind}`;
}

function search(city) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=metric`;
  axios.get(url).then(displayChanges);
}

function changeCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#input-city-value");
  let city = inputCity.value;
  search(city);
}
let newCity = document.querySelector("#input-city-form");
newCity.addEventListener("submit", changeCity);

search("Sydney");

function showPositionWeather(response) {
  let location = response.data.name;
  let temp = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  let capDescription =
    description[0].toLocaleUpperCase() + description.slice(1);

  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = `${temp}`;
  let cityElement = document.querySelector("#show-city");
  cityElement.innerHTML = `${location}`;
  let descriptionElement = document.querySelector("#weather-description");
  descriptionElement.innerHTML = `${capDescription}`;

  let humidity = response.data.main.humidity;
  let changeHumidity = document.querySelector("#humidity");
  changeHumidity.innerHTML = `${humidity}`;

  let wind = Math.round(response.data.wind.speed * 3.6);
  let changeWind = document.querySelector("#wind");
  changeWind.innerHTML = `${wind}`;
}
function changeToCurrentLocation() {
  function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "9e695cc5bacfa21c5921f78723caae18";
    console.log(lat);
    console.log(lon);
    let geoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&&units=metric`;
    axios.get(geoUrl).then(showPositionWeather);
  }
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", changeToCurrentLocation);
