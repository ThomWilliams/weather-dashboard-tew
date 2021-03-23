var searchInput = document.getElementById("search-input");
var searchHistory = document.getElementById("search-history")
var cityName = document.getElementById("city")
var temp = document.getElementById("temp")
var humidity = document.getElementById("humidity")
var windspeed = document.getElementById("windspeed")
var uvIndex = document.getElementById("uv-index")
var date = document.getElementById("date")
var weatherIcon = document.getElementById("weather-icon")





// Your API key is bcee456dac0d31a5715512feac159444

// - Example of API call:
// api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=bcee456dac0d31a5715512feac159444


// CURRENT WEATHER WINDOW FUNCTION
function currentWeather () { 
    // API Call from Current Weather
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={bcee456dac0d31a5715512feac159444}'

    fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        console.log(data);

        for (var i = 0; i < data.length; i++) {
            
            //Setting the text HTML elements from Weather Data
            cityName.textContent = data[i].cityname;
            temp.textContent = data[i].temperature;
            humidity.textContent = data[i].humidity;
            windspeed.textContent = data[i].windspeed;
            uvIndex.textContent = data[i].uv-index;
    
            //Append text content
   
        }


    })
}


// FIVE DAY WEATHER FUNCTION

function fiveDayWeather () {
    
}




document.getElementById("search-btn").addEventListener("click", currentWeather, fiveDayWeather);


/* PSEUDO CODE

Enter city in a Search Bar.... 
- shows current and future conditions for that city
- city is added to the search history list (saved with local storage)

Current Weather Window
- displays city name, date, temp, humidity, windspeed, weather image, UV index
- UV Index - if statement: if conditions are favorable (background color: green), moderate (background color: blue), or severe (Bakcground color: red)


Future weather conditions (5 Day Forecast)
- Displays date, weather image, the temp, humidity


Click on city in the search history
Shows current and future conditions for that city 



*/