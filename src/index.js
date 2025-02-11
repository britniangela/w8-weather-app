function updateTemperatureValue(response) {
  let temperatureElement = document.querySelector("#temperature-value");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city-searched");
  let currentDayTimeElement = document.querySelector("#app-day-time");
  let weatherDescriptionElement = document.querySelector(
    "#weather-description"
  );
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let date = new Date(response.data.time * 1000);
  let temperatureIconElement = document.querySelector("#temperature-icon");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  currentDayTimeElement.innerHTML = formatDate(date);
  weatherDescriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${Math.round(response.data.wind.speed)}mph`;
  temperatureIconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="temperature-icon" />`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "58f3tbaa2acbfcb0981e0ecb4ba2453o";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(updateTemperatureValue);
}

function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearch);

searchCity("Orlando");

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "58f3tbaa2acbfcb0981e0ecb4ba2453o";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
          <div class="forecast">
                <div class="forecast-day">${formatDay(day.time)}</div>
               <img src="${day.condition.icon_url}" class="forecast-icon">
                <div class="forecast-temperatures">
                  <div class="forecast-temperature"><strong>${Math.round(
                    day.temperature.maximum
                  )}°</strong></div>
                  <div class="vertical-bar">|</div>
                  <div class="forecast-temperature">${Math.round(
                    day.temperature.minimum
                  )}°</div>
                </div>
              </div>`;

      let forecastElement = document.querySelector("#forecast-container");
      forecastElement.innerHTML = forecastHtml;
    }
  });
}
