var currentCityEl = $(".currentCityDisplay");
var currentDateEl = $(".currentDateDisplay");
var currentIconEl = $(".currentIconDisplay");
var currentTempEl = $("#currentTempDisplay");
var currentWindEl = $("#currentWindDisplay");
var currentHumidityEl = $("#currentHumidityDisplay");


  // click event listener to the search button

$(".search-button").on("click", function (event) {
  event.preventDefault();

  //fetching from api

  var citySearch = $("#search-input").val();
  const queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&appid=5182d0376e53c61cba7fadacb43513d8&units=metric";


  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

    //retrieve current weather from API
        var currentCity = data.city.name;
        var currentIcon = data.list[0].weather[0].icon;
        var currentTemp  = data.list[0].main.temp;
        var currentWind = data.list[0].wind.speed;
        var currentHumidity = data.list[0].main.humidity;

       

 // construct the URL for the weather icon
        var iconURL = "http://openweathermap.org/img/wn/" + currentIcon + ".png";

        
//format date
const currentDate = dayjs()
const formattedDate = currentDate.format("MMMM D");
       
        // Clear previous data
    currentCityEl.empty();
    currentDateEl.empty();
    currentTempEl.empty();
    currentWindEl.empty();
    currentHumidityEl.empty();

   

///icon not displaying// 
console.log (iconURL);

 //append current date to HTML
        currentIconEl.attr("src", iconURL);
        currentCityEl.text(currentCity +", "+formattedDate);
        currentDateEl.text(formattedDate);
        currentTempEl.text("Temp: " + currentTemp + "°C:");
        currentWindEl.text("Wind: " + currentWind);
        currentHumidityEl.text("Humidity: " + currentHumidity);


        
    });


    
  });

  // TODO
// 1. When user search for a city in the input, call weather API and show the result in the HTML
//    - Add event listener to form submit - done
//    - Get the user input value - done 
//    - Build the API query URL based on the user input value - done 
//    - Call the API and render the result in the HTML
//        - Get the city name and show it in the main weather forecast card
//        - Get the first weather forecast item and get the following values
//            - date
//            - temperature
//            - wind speed
//            - humidity
//            - icon
//        - render those values to the main card
//        - Loop through all weathers array and get the following values
//            - date
//            - temperature
//            - wind speed
//            - humidity
//            - icon
//        - render those values to the smaller card
// 2. When user search for a city, store it in local storage
// 3. On initial page load load the search history and show it as a list in the HTML
//    - ....
//    - Build the API query URL based on the history stored in local storage
//    - Call the API and render the result in the HTML
// 4. When user click on the search history, call weather API and show the result in the HTML
// 5. CSS

