
var searchHistory = document.getElementById("search-history")
var cityName = document.getElementById("city")
var temp = document.getElementById("temp")
var humidity = document.getElementById("humidity")
var windspeed = document.getElementById("windspeed")
var uvIndex = document.getElementById("uv-index")
var date = document.getElementById("date")
var weatherIcon = document.getElementById("weather-icon")
var weatherDay = document.querySelectorAll("weather-day")
var cardGroupEl = document.querySelectorAll(".card-group")
var APIKey = ("bcee456dac0d31a5715512feac159444");




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
  console.log('currentWeather', data);
  displayCurrentWeather(data);
  var latData = data.coord.lat;
  var lonData = data.coord.lon;

  getUVdata(latData, lonData);
  get5DayData(latData, lonData);

  })
}


function getUVdata (lat, lon) {

  // Call UV Index API
  var getUVindexAPI = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${APIKey}`
  fetch(getUVindexAPI)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
  console.log('UVdata', data);

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
}




function displayCurrentWeather (data) {

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

}


// GET FIVE DAY WEATHER 

function get5DayData (lat, lon) {
  var getFiveDayAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&appid=${APIKey}`
  // https://openweathermap.org/forecast5
  fetch(getFiveDayAPI)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
  console.log('5DayData', data);
  display5DayData(data.daily);
  })

}

function display5DayData(data) {

  for( var i=1; i <= data.length - 3; i++) {
    var itemData = data[i];
    console.log('itemData', itemData);
    var cardEl = createCard(itemData);

  cardGroupEl.appendChild(cardEl);
  }

}


function createCard(data) {

     // RENDER INTO JS CARDS - CREATE A CARD FROM THE DATA
//     <div class="col-12 col-md-4 col-xl-2">
//     <div class="weather-day card h-100">
//         <h5 class="card-title" id="day-1">Day 1</h5>
//         <img src="" class="card-img-top" id="day-weather-icon" alt="...">
//         <ul class="card-body">
//             <li class="card-text" id="day-date">date</li>
//             <li class="card-text" id="day-temp">temp</li>
//             <li class="card-text" id="day-humidity">humidity</li>
//         </ul>
//     </div>
// </div>

    var date = new Date(data.dt * 1000);
    var cardEl = document.createElement('p');
    cardEl.textContent = date;
    return cardEl


    // var dayDate = document.getElementById("day-date")
    // var dayTemp = document.getElementById("day-temp")
    // var dayHumidity = document.getElementById("day-humidity")
    // var dayWeathericon = document.getElementById("day-weather-icon")

    // dayDate.textContent = date;
    // dayTemp.textContent = "Temp: " + data.daily[i].temp.max;
    // dayHumidity.textContent = "Humidity: " + data.daily[i].humidity;
    // var dayweatherIcondata = data.daily[i].weather[0].icon;
    // //console.log(weatherIcondata);
    // var iconURL="http://openweathermap.org/img/w/"+dayweatherIcondata+".png";
    // dayWeathericon.setAttribute("src", iconURL);


}





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



  
