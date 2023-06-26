// let currentTime = new Date();
// let days = [
//   "Sanday",
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday"
// ];
// let day = days[currentTime.getDay()];
// let hour = currentTime.getHours();
// let minutes = currentTime.getMinutes();

// let realTime = document.querySelector("#time");
// realTime.innerHTML = `${day} ${hour}:${minutes}`;

// function searchCity(event) {
//   event.preventDefault();
//   let inputSearch = document.querySelector("#search");
//   let search = document.querySelector("h4");
//   if (inputSearch.value) {
//     search.innerHTML = `${inputSearch.value} 14C`;
//   } else {
//     search.innerHTML = `Glasgow 14 C`;
//   }
// }
// let cityForm = document.querySelector("#city");

// cityForm.addEventListener("submit", searchCity);

// function changeCelsius(event) {
//   event.preventDefault();

//   let temperature = document.querySelector("#temp");

//   temperature.innerHTML = `${Math.round(18 * 1.8 + 32.0)}`;
// }
// let cnangeC = document.querySelector("#link-celsius");
// cnangeC.addEventListener("click", changeCelsius);

// function changeFar(event) {
//   event.preventDefault();
//   let temperature = document.querySelector("#temp");
//   temperature.innerHTML = `${Math.round(((64 - 32) * 5) / 9)}`;
// }
// let tempFar = document.querySelector("#link-faren");
// tempFar.addEventListener("click", changeFar);

let currentTime = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentTime.getDay()];
let hour = currentTime.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let realTime = document.querySelector("#time");
realTime.innerHTML = `${day} ${hour}:${minutes}`;

let apiKey = "bc0a7d7de2ec97549727de4b9f7f2aa4";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";

function currentWeather(response) {
  let temp = Math.round(response.data.main.temp);
  let cityCurrent = response.data.name;
  let press = response.data.main.pressure;
  let h4 = document.querySelector("h4");
  h4.innerHTML = `${cityCurrent} ${temp} C`;
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `Temperature: ${temp} C`;
  let pressure = document.querySelector("#pressure");
  pressure.innerHTML = `Pressure: ${press} mb`;

  let precip = document.querySelector("#precipitation");
  precip.innerHTML = `Precipitation: ${
    response.data.rain ? response.data.rain["1h"] : 0
  } mm`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity} %`;
}

function showWeather(response) {
  let temp = Math.round(response.data.main.temp);
  let inputTemp = document.querySelector("h4");
  let city = response.data.name;
  inputTemp.innerHTML = `${city} ${temp}`;
}
function searchCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#search").value;
  let cityUrl = `${apiUrl}q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(cityUrl).then(showWeather);
}

let cityForm = document.querySelector("#city");
cityForm.addEventListener("submit", searchCity);

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let weatherUrl = `${apiUrl}lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(weatherUrl).then(currentWeather);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let buttonCurrent = document.querySelector("#current");
buttonCurrent.addEventListener("click", getCurrentPosition);
