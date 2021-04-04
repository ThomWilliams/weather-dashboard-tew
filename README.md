# weather-dashboard-tew

Assignment 6 - Thom Williams: Weather Dashboard

Completed task for week 6 of the University of Manchester Coding Bootcamp course.

Weather Dashboard app created using third party APIs. The app makes requests to the Open Weather API with specific paramters and generates weather forecast statistics for a city searched for by the user. It displays a detailed outlook of the weather conditions for today, and a sumamry outlook for the weather over the next 5 days.

Weather Icons visually display the forecast summary. The UV index is color coded depending on weather the UV levels are favourable, moderate, or severe.

The weather dashboard runs in the browser and features dynamically updated HTML and CSS.

'localStorage'saves the user's search history, so they can view the outlook again once the result is clicked again. 

There is enhanced functionality and styling from css frameworks Bootstrap and Google Fonts. The UI has been designed with a clean, polished, and accessible interface designed for mobile and desktop. 


## Installing / Getting started

Hosted by Github Pages. The application loads in the web browser. All files available to clone / download from Thom Willims' GitHub repository. 

### Initial Configuration

N/A Application should load in any universal browser.

## Developing

To clone this template, or develop further from this repo, please head to GitHub and follow these steps:

```shell
git clone https://github.com/ThomWilliams/weather-dashboard-tew.git
cd weather-dashboard-tew
code .
```

The repository comprises a HTML index file, CSS style file, Javascript file, screenshot images, GIF demonstration video and this README. 

### Building

No further additional steps should be required for the developer to view the files / build on the project.

Once opened in any browser such as Chrome, the styled html page for the Weather Dashboard should be displayed. 

### Deploying / Publishing

All developments by Thom Williams to the main branch. Deployed on Git Hub pages to the following address: 

[Github Pages](https://thomwilliams.github.io/weather-dashboard-tew/)


## Features

An interactive Weather Dashboard that retrieves data from the Open Weather API. It runs in the browser and is powered by HTML, CSS and Javascript, and enhanced by third party CSS frameworks including Bootstrap and Google Fonts.

Key Features include: 

* User inputs the name of the city and the dashboard dynamically generates the weather forcast.
* The main "Current Weather" window retrieves data from the current weather API call and displays a more detailed outlook for today's date. 
* Current Weather generates data including an icon representive of the weather conditions, the temperature in degrees centigrade, the humidity, the wind speed in MPH, and the UV index. 
* The UV Index cross references data retrieved from the UV Index API. The data is colour coded according to weather conditions are favourable (green), moderate (yellow), or severe (red) based on the EPA's official guidelines.  
* The 5 Day Weather Forecast is also displayed, making a call to the 5 Day Data API. 
* Dynamically generating a series of 5 cards representative of the next 5 days, they each display the date, the predicted temperature, the humidity and display a icon representation of the weather conditions.
* Using localStorage, the user's search history is saved. The dynamically created elements once clicked will bring up the weather forecast for that city again.
* Font styles enhanced by Google Fonts API.
* It has a clean, simple, accessible and user-friendly design 
* Mobile responsive design enhanced by bootstrap layouts.

## Links

- Project homepage: [GitHub](https://thomwilliams.github.io/weather-dashboard-tew/)
- Repository: [GitHub](https://github.com/ThomWilliams/weather-dashboard-tew)
- Issue tracker: [GitHub](https://github.com/ThomWilliams/weather-dashboard-tew/issues)
  - In case of sensitive bugs like security vulnerabilities, please contact thomwilliams1990@gmail.com. We value your effort to improve the security and privacy of this project.
- Related projects: [GitHub](https://github.com/ThomWilliams)


## Accessibility

A Wave accessibility checker confirms the following features meet accessibility standards including:

* Semantic HTML elements.
* Suitably contrasting colour scheme.

# Screenshot

Screenshots of the desktop and mobile versions is provided in the assets Folder: 

Desktop version: ![Desktop Screenshot 1](Assets/weather-dashboard.png)



# GIF

A gif visual demonstration is also provided as a guide:

GIF GUIDE: ![gif demo](Assets/weather-dashboard-gif.gif)


======
## Credits

These are the web articles referenced during this Code Refactor accessibility excercise. 

[OpenWeather API](https://openweathermap.org/api)
[Bootstrap](https://getbootstrap.com/)
[GoogleFonts](https://fonts.google.com/)
[w3 Schools](https://www.w3schools.com/javascript)
[Wave](https://wave.webaim.org/)
[Mozilla Developer](https://developer.mozilla.org/)
[GitHub Readme Guide](https://github.com/jehna/readme-best-practices)
[EPA.gov](https://19january2017snapshot.epa.gov/sunsafety/uv-index-scale-1_.https://www.epa.gov/sunsafety-uv-index-scale-0#:~:text=3%20to%207%3A%20Moderate%20to,%2Dbrimmed%20hat%2C%20and%20sunglasses)



## License

MIT License

Copyright (c) [2021] [Thomas Edward Williams]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
