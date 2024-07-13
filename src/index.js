function updateTemperatureValue(response) {
  let temperatureElement = document.querySelector("#temperature-value");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city-searched");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
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

function getForecast(city) {
  let apiKey = "58f3tbaa2acbfcb0981e0ecb4ba2453o";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
      <div class="forecast">
            <div class="forecast-day">${day}</div>
            <div class="forecast-icon">☀️</div>
            <div class="forecast-temperatures">
              <div class="forecast-temperature"><strong>81°</strong></div>
              <div class="vertical-bar">|</div>
              <div class="forecast-temperature">95°</div>
            </div>
          </div>`;

    let forecastElement = document.querySelector("#forecast-container");
    forecastElement.innerHTML = forecastHtml;
  });
}

getForecast();
