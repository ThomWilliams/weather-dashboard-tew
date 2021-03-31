
var searchHistory = document.getElementById("search-history")
var cityName = document.getElementById("city")
var temp = document.getElementById("temp")
var humidity = document.getElementById("humidity")
var windspeed = document.getElementById("windspeed")
var uvIndex = document.getElementById("uv-index")
var date = document.getElementById("date")
var weatherIcon = document.getElementById("weather-icon")
var weatherDay = document.querySelectorAll("weather-day")
var cardGroupEl = document.querySelector(".card-group")
var APIKey = ("bcee456dac0d31a5715512feac159444");
var searchButton = document.getElementById("search-btn");
var fiveDayForecastEl = document.getElementById("five-day-forecast");
var cardUl = document.getElementById("five-day-card");


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
    var fiveDayCards = createCard(itemData);
    console.log(fiveDayCards);
    cardGroupEl.appendChild(fiveDayCards);

  }

}

// STORES SEARCH IN LOCAL STORAGE
function addCityHistory () {
  var searchInput = document.getElementById("search-input");
  var searchInputData = searchInput.value;

  var searchHistoryinput = JSON.parse(window.localStorage.getItem("search-history")) || [];
  searchHistoryinput.push(searchInputData);
  window.localStorage.setItem("search-history", JSON.stringify(searchHistoryinput));

  for (var i = 0; i < searchHistoryinput.length; i++) {
      var entry = document.createElement("button");
      entry.textContent = searchHistoryinput[i];
      entry.setAttribute("id", "search-item");
      var citiesList = document.getElementById("search-history");
      citiesList.appendChild(entry);
      window.localStorage.clear();
    
      entry.onclick = currentWeather;
  } 
}




function createCard(data) {

    var date = new Date(data.dt * 1000).toLocaleDateString();
    var dateEl = document.createElement('p');
    dateEl.classList.add("card-text");
    dateEl.textContent = date;


    var temp = data.temp.max - 273.15;
    var tempEl = document.createElement('p');
    tempEl.classList.add("card-text");
    tempEl.textContent = "Temp: " + Math.round(temp) + "°C";

    var humidity = data.humidity;
    humidityEl = document.createElement('p');
    humidityEl.classList.add("card-text");
    humidityEl.textContent = "Humid: " + humidity + "%";

    var weatherIcon = data.weather[0].icon;
    weatherIconEl = document.createElement('img');
    weatherIconEl.classList.add("card-img-top");
    var iconURL="http://openweathermap.org/img/w/"+weatherIcon+".png";
    weatherIconEl.setAttribute("src", iconURL);

  
    cardDataEl = document.createElement('div');
    cardDataEl.classList.add("card-body");
    cardDataEl.append(weatherIconEl, dateEl, humidityEl, tempEl);

    cardContainerEl = document.createElement('div');
    cardContainerEl.classList.add('card');
    cardContainerEl.append(cardDataEl);

    fiveDayCards = document.createElement('div');
    fiveDayCards.classList.add('col-12col-md-4col-xl-2');
    fiveDayCards.appendChild(cardContainerEl);

    return fiveDayCards;
 
}


document.getElementById("search-btn").addEventListener("click", currentWeather)
document.getElementById("search-btn").addEventListener("click", addCityHistory) 




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



  
