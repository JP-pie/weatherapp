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
let apiKey = "9e695cc5bacfa21c5921f78723caae18";

function displayChanges(response) {
  console.log(response);

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
