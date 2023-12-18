var currentCityEl = $(".currentCityDisplay");
var currentDateEl = $(".currentDateDisplay");
var currentIconEl = $(".currentIconDisplay");
var currentTempEl = $("#currentTempDisplay");
var currentWindEl = $("#currentWindDisplay");
var currentHumidityEl = $("#currentHumidityDisplay");
var forecastEL = $("#forecast");
// var cityData = [];
var historyEl = $("#history");

// click event listener to the search button

$(".search-button").on("click", function (event) {
  event.preventDefault();

  //create new button function called
  createNewButton(citySearch);

  //save city search to local storage
  saveCity();

  //fetching from api
  var citySearch = $("#search-input").val();
  const queryURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    citySearch +
    "&appid=5182d0376e53c61cba7fadacb43513d8&units=metric";

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      //retrieve current weather from API
      var currentCity = data.city.name;
      var currentIcon = data.list[0].weather[0].icon;
      var currentTemp = data.list[0].main.temp;
      var currentWind = data.list[0].wind.speed;
      var currentHumidity = data.list[0].main.humidity;

      // construct the URL for the weather icon
      var iconURL = "http://openweathermap.org/img/wn/" + currentIcon + ".png";

      //format date
      const currentDate = dayjs();
      const formattedDate = currentDate.format("MMMM D");

      // Clear previous data for current weather
      currentCityEl.empty();
      currentDateEl.empty();
      currentTempEl.empty();
      currentWindEl.empty();
      currentHumidityEl.empty();

      //append current data to HTML
      currentIconEl.attr("src", iconURL);
      currentCityEl.text(currentCity + ", " + formattedDate);
      currentDateEl.text(formattedDate);
      currentTempEl.text("Temp: " + currentTemp + "°C:");
      currentWindEl.text("Wind: " + currentWind);
      currentHumidityEl.text("Humidity: " + currentHumidity);

      ////get 5 day forecast.  - Loop through all weathers array///
      const forecastData = data.list;
      for (var i = 1; i < forecastData.length; i++) {
        //create div (and card) +  p and img elements
        const forecastDiv = $("<div>")
          .addClass(
            "card-body p-2 m-2 border border-dark bg-light justify-content-start").css("width", "9rem");
        const forecastDateP = $("<p>");
        const forecastTempP = $("<p>");
        const forecastWindP = $("<p>");
        const forecastHumidityP = $("<p>");
        const forecastImg = $("<img>");

        //get weather values from the API
        const forecastDate = dayjs(data.list[i].dt_txt).format("MMM D, HH:mm");
        const forecastTemp = data.list[i].main.temp;
        const forecastIcon = data.list[i].weather[0].icon;
        const forecastWind = data.list[i].wind.speed;
        const forecastHumidity = data.list[i].main.humidity;

        // Clear previous data for forecast weather
        forecastDiv.empty();

        // construct the URL for the weather icon
        var forecastIconURL = "http://openweathermap.org/img/wn/" + forecastIcon + ".png";

        //add data to each of the paragraph elements
        forecastDateP.text(forecastDate);
        forecastTempP.text(forecastTemp + "°C");
        forecastWindP.text("Wind: " + forecastWind);
        forecastHumidityP.text("Humidity: " + forecastHumidity);
        forecastImg.attr("src", forecastIconURL);

        //add the paragraph and img to the div
        forecastDiv.append(forecastDateP,forecastTempP, forecastWindP,forecastHumidityP, forecastImg);

        //add div to the element
        forecastEL.append(forecastDiv);

      }
    });
});


//create button for each new search -  function
function createNewButton(citySearch) {
  const cityBtn = $("<button/>");

  // Button text
  cityBtn.text($("#search-input").val());

  //create new div
  const historyDiv = $("<div>");

  //add class to the button
  cityBtn.addClass("btn btn-primary m-2");

  //append button to new div
  historyDiv.append(cityBtn);

  //append div to page
  historyEl.append(historyDiv);
}




// // Function to save the searched city to local storage in an array
function saveCity() {

    var newData = $("#search-input").val();

    if (localStorage.getItem('data') === null){

        localStorage.setItem('data','[]');
    }

    const savedCities = JSON.parse(localStorage.getItem('data'));
    savedCities.push(newData);

    localStorage.setItem('data', JSON.stringify(savedCities));
}


//add search city to local storge array (savedCities)

// function addSavedCity(){
//   savedCities.each(function () {

//     localStorage.setItem(stringifiedCities, citySearch);




// TODO

// 2. When user search for a city, store it in local storage
// 3. On initial page load load the search history and show it as a list in the HTML
//    - ....
//    - Build the API query URL based on the history stored in local storage
//    - Call the API and render the result in the HTML
// 4. When user click on the search history, call weather API and show the result in the HTML
// 5. CSS