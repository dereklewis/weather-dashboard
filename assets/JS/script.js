var apiKey = "eba4077c45d00ac6014f061dfc8fe378";

var submitCity = document.querySelector("#submit-city");
var city = " ";

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
      $("#past-temp").text();

      var pastResult = {
        one: result.main.temp,
        two: result.main.humidity,
        three: result.main.speed,
      };

      localStorage.setItem("pastResult", JSON.stringify(pastResult));
    },
  });
});
