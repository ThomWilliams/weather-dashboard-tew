
var searchHistory = document.getElementById("search-history")
var cityName = document.getElementById("city")
var tempDegrees = document.getElementById("temp")
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
var currentWeatherEl = document.getElementById("current-weather");


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
  displayCurrentWeatherData(data);
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
  var uvIndexdata = data.value; 
  if (uvIndexdata > 8) {
      uvIndexdata.style.backgroundColor("red");
  } if (uvIndexdata < 3) {
      uvIndexdata.style.backgroundColor("green");
  } if ((uvIndexdata >= 3) && (uvIndexdata < 7)) {
      uvIndexdata.style.backgroundColor("yellow")}
})
}


function displayCurrentWeatherData(data) {

  var itemData = data;
  console.log('currentweatheritemData', itemData);
  var currentWeatherCard = createCard(itemData);
  console.log(currentWeatherCard);
  currentWeatherCard.appendChild(currentWeatherEl)

}



function createCurrentWeatherCard(data) {

//   <div class="row">
//   <div class="card mb-3">
//       <figure id="icon">
//            <image src="" id="weather-icon" alt="...">
//       </figure>
//       <ul class="card-body">
//           <h5 class="card-title" id="city">City Name</h5>
//           <h5 class="card-title" id="date">Today's Date</h5>
//           <li class="card-text" id="temp">temp</li>
//           <li class="card-text" id="humidity">humidity</li>
//           <li class="card-text" id="windspeed">windspeed</li>
//           <li class="card-text" id="uv-index">uv-index</li>
//       </ul>
//   </div>
// </div>

  //Setting the text HTML elements from Weather Data
  
  currentWeatherEl = document.createElement('div');
  currentWeatherEl.classList.add("row");
  currentWeatherEl.append(mainrowEl);

  var mainrowEl = document.createElement('div');
  mainrowEl.classList.add("row");
  mainrowEl.append(mainCardEl);

  var mainCardEl = document.createElement('div');
  mainCardEl.classList.add("cardmb-3");
  mainCardEl.append(mainCardBody);

  var mainCardBody = document.createElement('ul');
  mainCardBody.classList.add("card-body");
  mainCardBody.appendChild(weatherIconFig, cityNameEl, dateEl, tempEl, humidityEl, windspeedEl, uvIndexEl)

  // weatherIcon 
  var weatherIcondata = data.weather[0].icon;
  var weatherIconFig = document.createElement('figure');
  var weatherIconImg = document.createElement('img');
  var iconURL="http://openweathermap.org/img/w/"+weatherIcondata+".png";
  weatherIconImg.setAttribute("src", iconURL, "id", "weather-icon")
  weatherIconFig.append(weatherIconImg);

  cityName = data.name;
  var cityNameEl = document.createElement('h5');
  cityNameEl.classList.add("card-title");
  cityNameEl.textContent = cityName;

  date = new Date().toLocaleDateString();
  var dateEl = document.createElement('h5');
  dateEl.classList.add("card-title");
  dateEl.textContent = date;

  tempDegrees = data.main.temp - 273.15;
  var tempEl = document.createElement('li');
  tempEl.classList.add("card-title");
  tempEl.textContent = "Temperature: " + Math.round(tempDegrees) + "°C";

  humidity = data.main.humidity;
  var humidityEl = document.createElement('li');
  humidityEl.classList.add("card-title");
  humidityEl.textContent = "Humidity: " + humidity + "%";

  windspeed = data.wind.speed;
  var windspeedEl = document.createElement('li');
  windspeedEl.classList.add("card-title");
  windspeedEl.textContent = "Windspeed: " + windspeed + " MPH";

  uvIndex = data.uvi;
  var uvIndexEl = document.createElement('li');
  uvIndexEl.classList.add("card-title");
  uvIndexEl.textContent = "UV Index: " + uvIndex;

  
  return currentWeatherEl


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
      var entry = document.createElement("div");
      entry.textContent = searchHistoryinput[i];
      entry.setAttribute("id", "search-item");
      entry.classList.add("btn","btn-outline-primary")
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

    var temp = data.temp - 273.15;
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



  
