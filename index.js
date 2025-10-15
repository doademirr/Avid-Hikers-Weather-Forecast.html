function submitCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".search-input");
  let currentCity = document.querySelector(".current-city");
  currentCity.innerHTML = searchInput.value;
  searchCityElement(searchInput.value);
}

let searchCityElement = document.querySelector(".search-box");
searchCityElement.addEventListener("submit", submitCity);

function searchCity(city) {
  let key = bd40oa3ta2b94eabedb83bb3022b94f7;
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
}
