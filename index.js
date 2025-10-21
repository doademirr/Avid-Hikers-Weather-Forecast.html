function submitCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".search-input");
  let currentCity = document.querySelector(".current-city");
  currentCity.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

let searchCityElement = document.querySelector(".search-box");
searchCityElement.addEventListener("submit", submitCity);

function searchCity(city) {
  let key = "bd40oa3ta2b94eabedb83bb3022b94f7";
  let apiKey = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}&units=metric`;
  axios.get(apiKey).then(updateTemperature);
}

function updateTemperature(response) {
  let currentTemperatureValue = document.querySelector(
    ".current-temperature-value"
  );
  let currentTemperatureValueRounded = response.data.temperature.current;
  currentTemperatureValue.innerHTML = Math.round(
    currentTemperatureValueRounded
  );
  let currentCity = document.querySelector(".current-city");
  currentCity.innerHTML = response.data.city;
  let currentConditionDescription = document.querySelector(
    "#current-condition-description"
  );
  currentConditionDescription.innerHTML = response.data.condition.description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${response.data.wind.speed}km/h`;
  let currentDate = document.querySelector("#current-date");
  let date = new Date(response.data.time * 1000);
  currentDate.innerHTML = formatDate(date);
  let currentTemperatureIcon = document.querySelector(
    ".current-temperature-icon"
  );
  currentTemperatureIcon.innerHTML = `<img src="${response.data.condition.icon_url}">`;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
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

function getForecast(city) {
  let key = bd40oa3ta2b94eabedb83bb3022b94f7;
  let apiKey = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${key}&units=metric`;
  axios(apiKey).then(showForecast);
}

function showForecast(response) {
  let days = ["Wed", "Thu", "Fri", "Sat", "Sun"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="weather-forecast-daily-container">
            <div class="forecast-day">${day}</div>
            <div class="forecast-emoji">☀️</div>
            <div class="forecast-range">
              <div class="forecast-range-high"><strong>15°</strong></div>
              <div class="forecast-range-low">9°</div>
            </div>
          </div>`;
  });

  let dailyForecast = document.querySelector(".weather-forecast-container");
  dailyForecast.innerHTML = forecastHtml;
}

searchCity("Hobart");
showForecast("Hobart");
showForecast();
