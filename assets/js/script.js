  // click event listener to the search button

$(".search-button").on("click", function (event) {
  event.preventDefault();

  //fetching from api

  var citySearch = $("#search-input").val();
  const queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&appid=5182d0376e53c61cba7fadacb43513d8&";

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      // const cityData  = data.data.images.original.url;
    });

    // Get the value from the search input using jQuery
    
  });

