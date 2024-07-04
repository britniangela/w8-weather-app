function displayForecast(day) {
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

displayForecast();
