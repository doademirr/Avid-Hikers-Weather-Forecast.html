function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".search-input");
  let currentCity = document.querySelector(".current-city");
  currentCity.innerHTML = searchInput.value;
}

let searchCityElement = document.querySelector(".search-box");
searchCityElement.addEventListener("submit", searchCity);
