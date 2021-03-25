
var searchHistory = document.getElementById("search-history")
var cityName = document.getElementById("city")
var temp = document.getElementById("temp")
var humidity = document.getElementById("humidity")
var windspeed = document.getElementById("windspeed")
var uvIndex = document.getElementById("uv-index")
var date = document.getElementById("date")
var weatherIcon = document.getElementById("weather-icon")
var APIKey = ("bcee456dac0d31a5715512feac159444");

// My API key is bcee456dac0d31a5715512feac159444

// - Example of API call:
// api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=bcee456dac0d31a5715512feac159444



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
    temp.textContent = "Temperature: " + data.main.temp;
    humidity.textContent = "Humidity: " + data.main.humidity;
    windspeed.textContent = "Windspeed: " + data.wind.speed + "kmph";
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
    console.log(data);

    uvIndex.textContent = "UV Index: " + data.value;

 
    })
   
    
    // Create an if statement if it is over a certian amount


    // RUNS FIVE DAY WEATHER SIMULTAENOUSLY
  

    fiveDayWeather(searchInput) 
        
    }
)
}


// UVI FUNCTION

// function uviData () {

//     latitude = data.coord.lat;
//     longitude = data.coord.lon;
//     // call a different API which has UVI in object
//     // Create an if statement if it is over a certian amount

//     var getOneCallAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&appid=bcee456dac0d31a5715512feac159444`

//     fetch(getOneCallAPI)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//     console.log(data);

//     uvIndex.textContent = data.current.uvi;
//     })


// }



// FIVE DAY WEATHER FUNCTION

function fiveDayWeather (lat, lon, cityName) {

var getAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&appid=bcee456dac0d31a5715512feac159444`
    // https://openweathermap.org/forecast5
fetch(getAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
    //console.log(data);
        //  Convert data from API into curent date
    var date = new Date(data.daily[0].dt * 1000);
    //console.log(date.toUTCString())

    // FOR LOOP TO REITERATE ACROSS 5 DAYS

    // DAY 0 = Tomorrow // DAY 1 = 

    // NEED TO CREATE THE WINDOWS IN JS + APPEND THE DATA, RATHER THAN BE IN JS


    })
}






// FROM COLUM

    /* WEATHER ICONS Insert the image icons - these can be found in the object for each day under "weather.array(1).icon"
    http://openweathermap.org/img/w/10d.png
http://openweathermap.org/img/w/${data.daily[i].weather.icon}.png
Var img = createElement(“img”);
img.setAttribute(“src”, “http://openweathermap.org/img/w/${data.daily[i].weather.icon}.png”)

}

// https://openweathermap.org/forecast5


*/

document.getElementById("search-btn").addEventListener("click", currentWeather);


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






// ICON STUFF FROM ALAN...

// function returnIconURL (code) {
//     return 'https://openweathermap.org/weather-conditions#How-to-get-icon-URL' + code + '.png'
// }

// var icons = {
//     clouds: '03n',
//     sunny: '01d',
// }

// returnIconURL (icons.clouds)

