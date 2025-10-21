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
  getForecast(city);
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

  showForecast(response.data.city);
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

function formatDay(time) {
  let date = new Date(time * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecast(city) {
  let key = "bd40oa3ta2b94eabedb83bb3022b94f7";
  let apiKey = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${key}&units=metric`;
  axios(apiKey).then(showForecast);
}

function showForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (daily, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-daily-container">
            <div class="forecast-day">${formatDay(daily.time)}</div>
            <img src="${daily.condition.icon_url}" class="forecast-emoji">
            <div class="forecast-range">
              <div class="forecast-range-high"><strong>${Math.round(
                daily.temperature.maximum
              )}°</strong></div>
              <div class="forecast-range-low">${Math.round(
                daily.temperature.minimum
              )}°</div>
            </div>
          </div>`;
    }
  });

  let dailyForecast = document.querySelector(".weather-forecast-container");
  dailyForecast.innerHTML = forecastHtml;
}

searchCity("Hobart");
