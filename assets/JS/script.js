var apiKey = "eba4077c45d00ac6014f061dfc8fe378";
var cityInput = document.querySelector("#city-text");
var cityForm = document.querySelector("city-form");
var cityList = document.querySelector("city-list");

var submitCity = document.querySelector("#submit-city");

var cities = [];
console.log(cities);

function renderWeather() {
  cityList.textContent = "";
  for (var i = 0; i < cities.length; i++) {
    var city = cities[i];

    var li = document.createElement("li");
    li.textContent = city;
    li.setAttribute("data-index", i);

    var button = document.createElement("button");
    button.textContent = "Remove";

    li.appendChild(button);
    cityList.appendChild(li);
  }
}

$("#submit-button").click(function () {
  var citySelection = $("#city-name").val();
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    citySelection +
    "&appid=" +
    apiKey +
    "&units=imperial";
  $.ajax({
    url: queryURL,
    success: function (result) {
      console.log(result);

      $(".city-info").text(result.name);
      // $(".current-date").text(result.dt);
      var curDate = $(result.dt);
      console.log(curDate);

      $("#current-temp").text(result.main.temp);
      $("#humidity").text(result.main.humidity);
      $("#wind-speed").text(result.wind.speed);
    },
  });
});

function renderCities() {
  cityList.textContent = "";

  for (var i = 0; i < todos.length; i++) {
    var city = cities[i];

    var li = document.createElement("li");
    li.textContent = city;
    li.setAttribute("data-index", i);

    li.appendChild(button);
    cityList.appendChild(li);
  }
}

function init() {
  var storedCities = JSON.parse(localStorage.getItem("cities"));

  if (storedCities !== null) {
    cities = storedCities;
  }
  renderCities();
}

function storedCities() {
  localStorage.setItem("cities", JSON.stringify(cities));
}

cityForm.addEventListener("submit", function (event) {
  event.preventDefault();

  var cityText = cityInput.value.trim();

  if (cityText === "") {
    return;
  }

  cities.push(cityText);
  cityInput.value = "";

  storedCities();
  renderCities();
});

cityList.addEventListener("click", function (event) {
  var element = event.target;

  if (element.matches("button") === true) {
    var index = element.parentElement.getAttribute("data-index");
    cities.splice(index, 1);

    storedCities();
    renderCities();
  }
});

init();
