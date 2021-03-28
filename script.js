
var searchHistory = document.getElementById("search-history")
var cityName = document.getElementById("city")
var temp = document.getElementById("temp")
var humidity = document.getElementById("humidity")
var windspeed = document.getElementById("windspeed")
var uvIndex = document.getElementById("uv-index")
var date = document.getElementById("date")
var weatherIcon = document.getElementById("weather-icon")
var weatherDay = document.querySelectorAll("weather-day")
var APIKey = ("bcee456dac0d31a5715512feac159444");
var historyItems = [];

// CURRENT WEATHER WINDOW FUNCTION
function currentWeather () { 
    // API Call from Current Weather - https://openweathermap.org/current
   
    var searchInput = document.getElementById("search-input").value
    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${APIKey}`


    fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
    // console.log(data);

    //Setting the text HTML elements from Weather Data
    cityName.textContent = data.name;
    date.textContent = new Date().toLocaleDateString();
    var tempDegrees = data.main.temp - 273.15;
    temp.textContent = "Temperature: " + Math.round(tempDegrees) + "°C";
    humidity.textContent = "Humidity: " + data.main.humidity + "%";
    windspeed.textContent = "Windspeed: " + data.wind.speed + "MPH";
    uvIndex.textContent = data.uvi;
    // weatherIcon = data.weather[0].icon;
    var weatherIcondata = data.weather[0].icon;
    //console.log(weatherIcondata);
    var iconURL="http://openweathermap.org/img/w/"+weatherIcondata+".png";
    weatherIcon.setAttribute("src", iconURL)
    // iconEl.setAttribute("src", iconURL);


    // UV INDEX API
    // Defines Lat and Lon for API
    var lat = data.coord.lat;
    var lon = data.coord.lon;

    // Call UV Index API
    var getUVindexAPI = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${APIKey}`
    fetch(getUVindexAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
    // console.log(data);

    // UV Index - color coded: red = severe, moderate = yellow, favorable = green
    uvIndexdata = data.value; 
    if (uvIndexdata > 8) {
        uvIndex.style.backgroundColor = "red";
    } if (uvIndexdata < 3) {
        uvIndex.style.backgroundColor = "green";
    } if ((uvIndexdata >= 3) && (uvIndexdata < 7)) {
        uvIndex.style.backgroundColor = "yellow";}
    uvIndex.textContent = "UV Index: " + uvIndexdata;

    })
   


    // RUNS FIVE DAY WEATHER 
    var getFiveDayAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&appid=${APIKey}`
    // https://openweathermap.org/forecast5
    fetch(getFiveDayAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
    console.log(data);


      // FIVE DAY FORECAST

    for( var i=1; i <= data.daily.length - 3; i++) {
      var date = new Date(data.daily[i].dt * 1000);
      var dayDate = document.getElementById("day-date")
      var dayTemp = document.getElementById("day-temp")
      var dayHumidity = document.getElementById("day-humidity")
      var dayWeathericon = document.getElementById("day-weather-icon")

      dayDate.textContent = date;
      dayTemp.textContent = "Temp: " + data.daily[i].temp.max;
      dayHumidity.textContent = "Humidity: " + data.daily[i].humidity;
      var dayweatherIcondata = data.daily[i].weather[0].icon;
      //console.log(weatherIcondata);
      var iconURL="http://openweathermap.org/img/w/"+dayweatherIcondata+".png";
      dayWeathericon.setAttribute("src", iconURL);
  
    }






// FIVE DAY FORECAST RENDER IN JS

    // var fiveDaytitleEl = document.createElement("h3");               
    // var fiveDaytitleEltext = document.createTextNode("Five Day Forecast: "); 


      // create row for cards

    
    // fiveDayForecastList.appendChild(dayDateEl)
    // fiveDayForecastEl.appendChild(fiveDayForecastList)
    // fiveDaytitleEl.appendChild(fiveDaytitleEltext);                           
    // fiveDayForecastEl.appendChild(fiveDaytitleEl); 



  
  
    // var fiveDaycardgroupEL = document.createElement('div');
    // fiveDaycardgroupEL.classList.add("card-group row row-cols-1 row-cols-md-3 g-4")
    // fiveDayForecastRow.append(fiveDaycardgroupEL)

    // for (var i = 0; i < data.daily.length; i++) {
    //   if (data.list[i].dt_text.indexOf('15:00:00') !== -1) {
    //     var colEL = document.createElement('div');
    //     colEL.classList.add('col-12 col-md-4 col-xl-2');
    //     fiveDaycardgroupEL.append(colEL);
    //     var cardEl = document.createElement('div');
    //     cardEl.classList.add('weather-day card h-100');
    //     colEL.append(cardEl);
    //     var cardtitleEL = document.createElement('h5');
    //     cardtitleEL.classList.add('card-title');
    //     var cardImage = document.createElement('img');
    //     cardImage.classList.add('card-img-top')
    //     var dayweatherIcondata = data.daily[i].weather[0].icon;
    //     var iconURL="http://openweathermap.org/img/w/"+dayweatherIcondata+".png";
    //     cardImage.setAttribute("src", iconURL);
    //     var cardUl = document.createElement('ul');
    //     cardUl.classList.add('card-body');
    //     var dayDateEl = document.createElement('li');
    //     dayDateEl.classList.add('card-text');
    //     var date = new Date(data.daily[i].dt * 1000);
    //     dayDateEl.textContent = date;
    //     var dayTempEl = document.createElement('li');
    //     dayTempEl.classList.add('card-text');
    //     dayTempEl.textContent = "Temp: " + data.daily[0].temp.max;
    //     var dayHumidityEl = document.createElement('li');
    //     dayHumidityEl.classList.add('card-text');
    //     dayHumidityEl.textContent = "Humidity: " + data.daily[0].humidity;
        
    //     cardUl.append(dayDateEl, dayTempEl, dayHumidityEl);

    //     cardEL.append(cardtitleEL, cardImage, cardUl);

  

    //   }



    // }






// LOCAL STORAGE


  // Get previous search history
  // var previousHistory;
  // if (!JSON.parse(localStorage.getItem ('search-input'))) {
  //   previousHistory = [];
  // } else {
  //   previousHistory = JSON.parse(localStorage.getItem('search-input'));
  // }

  // function addPreviousHistory () {
  //   var addHistory = document.getElementById("search-history");

  //   addHistory.textContent = searchHistory.value;

    
  //   };
    
    // Stores previous searh history in local storage
    // var previousHistory = JSON.parse(window.localStorage.getItem("search-input")) || [];
    // window.localStorage.setItem("search-input", JSON.stringify(previousHistory));

    // for (var i = 0; i < previousHistory.length; i++) {
    // var addHistory = document.createElement("li");
    // addHistory.textContent = previousHistory[i].value;
    // addHistory.setAttribute("style", "list-style-type: none; margin-left: none")
    // var addHistoryList = document.getElementById("search-history");
    // addHistoryList.appendChild(addHistory)
    // } 


  
   
})
}
)
}




document.getElementById("search-btn").addEventListener("click", currentWeather)



//  PSEUDO CODE

// Enter city in a Search Bar.... 
// - shows current and future conditions for that city
// - city is added to the search history list (saved with local storage)

// Current Weather Window
// - displays city name, date, temp, humidity, windspeed, weather image, UV index
// - UV Index - if statement: if conditions are favorable (background color: green), moderate (background color: blue), or severe (Bakcground color: red)


// Future weather conditions (5 Day Forecast)
// - Displays date, weather image, the temp, humidity


// Click on city in the search history
// Shows current and future conditions for that city






