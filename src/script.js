let apiKey = "9e695cc5bacfa21c5921f78723caae18";
function formateDate(timeStamp) {
  let date = new Date(timeStamp);
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
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMin = date.getMinutes();
  if (currentMin < 10) {
    currentMin = `0${currentMin}`;
  }

  return `${currentDay} ${currentHour}:${currentMin} `;
}

function formatDay(timeStamp) {
  let date = new Date(timeStamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiURL);
  axios.get(apiURL).then(displayForecast);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#weather-forecast");

  let forecast = response.data.daily;

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6)
      forecastHTML =
        forecastHTML +
        `
<div class="col-2">
<div class = "forecast-day"> ${formatDay(forecastDay.dt)} </div>
  <img src="http://openweathermap.org/img/wn/${
    forecastDay.weather[0].icon
  }@2x.png" alt="cloudy icon">

<div class="forest-temperature"><span class="forecast-max">${Math.round(
          forecastDay.temp.max
        )}° </span>/<span class="forecast-min"> ${Math.round(
          forecastDay.temp.min
        )}°</span> </div>
`;

    forecastHTML = forecastHTML + `</div>`;

    forecastElement.innerHTML = forecastHTML;
  });
}

function displayChanges(response) {
  celsiusTemp = response.data.main.temp;
  let newTemp = Math.round(celsiusTemp);
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

  let updatedTime = document.querySelector("#date-time");
  updatedTime.innerHTML = formateDate(response.data.dt * 1000);

  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", `${capDescription}`);

  getForecast(response.data.coord);
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

function changeToCurrentLocation() {
  function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let geoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&&units=metric`;
    axios.get(geoUrl).then(displayChanges);
  }
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", changeToCurrentLocation);

function handleFahrenhiet(event) {
  event.preventDefault();
  let changeTemp = document.querySelector("#temperature");
  changeTemp.innerHTML = Math.round((celsiusTemp * 9) / 5 + 32);
}

function handleCelsius(event) {
  event.preventDefault;
  let changeTemp = document.querySelector("#temperature");
  changeTemp.innerHTML = Math.round(celsiusTemp);
}
let celsiusTemp = null;

let fahrenhiet = document.querySelector("#fahrenhiet");
fahrenhiet.addEventListener("click", handleFahrenhiet);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", handleCelsius);
displayForecast();
