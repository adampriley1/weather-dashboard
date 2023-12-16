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

      //retriece current weather from API
      
        var currentDate = data.list[0].dt_txt;
        var currentIcon = data.list[0].weather[0].icon;
        var currentTemp = data.list[0].main.temp;
        var currentWind = data.list[0].wind.speed;
        var currentHumidity = data.list[0].main.humidity;




        // const today = $("#today");




       
    //    today.text(currentWeather);
        
    });

   // Get the value from the search input using jQuery
    
  });

