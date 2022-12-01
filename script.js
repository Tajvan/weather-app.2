let apiKey = `97c2f6a3b34509ac62090edc5d18d949`;

function getForecast(coordinates) {
  let apiKeyweek = `e947cb2640f1db92e6a19005bc43b435`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKeyweek}&units=metric`;
  axios.get(apiUrl).then(displayweather);
}

function weather(response) {
  let cityTempchange = document.querySelector(".temperature");
  let cityHumiditychange = document.querySelector(".humidityValue");
  let cityPressurechange = document.querySelector(".pressureValue");
  let cityWindchange = document.querySelector(".windValue");
  let cityNamechange = document.querySelector("h1");
  let weathername = document.querySelector(".weathername");

  celsiusTemp = Math.round(response.data.main.temp);
  celsiUnit = Math.round(response.data.main.temp);
  cityNamechange.innerHTML = response.data.name;
  cityTempchange.innerHTML = Math.round(response.data.main.temp);
  cityHumiditychange.innerHTML = Math.round(response.data.main.humidity);
  cityPressurechange.innerHTML = Math.round(response.data.main.pressure);
  cityWindchange.innerHTML = response.data.wind.speed;
  weathername.innerHTML = response.data.weather[0].description;

  getForecast(response.data.coord);

  function changeImg() {
    if (response.data.weather[0].main === "Clouds") {
      document.getElementById(
        "boarder"
      ).style.backgroundImage = `url("https://media.giphy.com/media/TC8Cap201LtsI/giphy.gif")`;
    }
    if (
      response.data.weather[0].main === "Rain" ||
      response.data.weather[0].main === "Drizzle"
    ) {
      document.getElementById(
        "boarder"
      ).style.backgroundImage = `url("https://media.giphy.com/media/t7Qb8655Z1VfBGr5XB/giphy.gif")`;
    }
    if (response.data.weather[0].main === "Snow") {
      document.getElementById(
        "boarder"
      ).style.backgroundImage = `url("https://media.giphy.com/media/RWJPtq90qOA4E/giphy.gif")`;
    }
    if (response.data.weather[0].main === "Thunderstorm") {
      document.getElementById(
        "boarder"
      ).style.backgroundImage = `url("https://media.giphy.com/media/8xY1YYpEZ4dws/giphy.gif")`;
    }
    if (response.data.weather[0].main === "Clear") {
      document.getElementById(
        "boarder"
      ).style.backgroundImage = `url("https://media.giphy.com/media/XBVHoZahgO0sskTGxa/giphy.gif")`;
    }
    if (
      response.data.weather[0].main === "Mist" ||
      response.data.weather[0].main === "Fog"
    ) {
      document.getElementById(
        "boarder"
      ).style.backgroundImage = `url("https://media.giphy.com/media/3o7TKESnlxQ2vNfBtK/giphy.gif")`;
    }
  }
  changeImg();
}

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wendsday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return days[day];
}

function displayweather(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#week-weather");
  forecastHtml = "";

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHtml =
        forecastHtml +
        `  <tr>
              <th class="weekday">${formatDate(forecastDay.dt)}</th>
              <td class="daytemp">
                <span class="min-temp">${Math.round(
                  forecastDay.temp.min
                )}°</span> - <span class="max-temp"
                  >${Math.round(forecastDay.temp.max)}°</span
                >
              </td>
            </tr>
            <th class="imgholder">
              <img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" alt="" />
              <hr />
            </th>`;
    }
  });

  forecastElement.innerHTML = forecastHtml;
}

function searchInput(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input");
  let citychange = document.querySelector("h1");
  citychange.innerHTML = city.value;
  let weatherMetric = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;
  axios.get(weatherMetric).then(weather);
}
let searchcity = document.querySelector("#searchbutton");
searchcity.addEventListener("submit", searchInput);

function showFarenheit(event) {
  event.preventDefault();
  let farenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let tempshow = document.querySelector("#temperature");
  tempshow.innerHTML = Math.round(farenheitTemp);
}

function showCelsi(event) {
  event.preventDefault();
  let tempshow = document.querySelector("#temperature");
  tempshow.innerHTML = Math.round(celsiusTemp);
}
let farenheit = document.querySelector("#farenheit-unit");
farenheit.addEventListener("click", showFarenheit);

let celsi = document.querySelector("#celsia-unit");
celsi.addEventListener("click", showCelsi);

let celsiusTemp = null;

let date = new Date();
let days = date.getDay();
let day = [
  "Sunday",
  "Monday",
  "Tuesay",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let hours = date.getHours();
let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let today = document.querySelector("#today-day");
let time = document.querySelector("#today-time");
let todaydate = `${day[days]}`;
let todaytime = `${hours}:${minutes}`;

today.innerHTML = todaydate;
time.innerHTML = todaytime;

function myPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiPosition = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiPosition).then(weather);
}
function currentposition() {
  navigator.geolocation.getCurrentPosition(myPosition);
}
let gps = document.querySelector(".gpsButton");
gps.addEventListener("click", currentposition);
