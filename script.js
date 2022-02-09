
//GLOBAL VARIABLES////////////////////////////////////////////////////////////////////////
const searchInputBox = document.getElementById("input-box");
const searchButton = document.getElementById("search_button");
const userLocation = document.querySelector('#input');
const openWeatherAPIKey = "61bd5a7935f37e9c18cacd14e8c89bc3";
const openCageAPIKey = "0148c7965c584dfc849607c4be6c640b";

//API//////////////////////////////////////////////////////////////////////////////////////

//Trail API for information
// fetch("https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lat=null&lon=null", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "trailapi-trailapi.p.rapidapi.com",
// 		"x-rapidapi-key": "d0940ee964msh728cc5d9f2642bap1a36ccjsne2e0b86173ec"
// 	}
// })
// .then(response => {
// 	console.log(response);
// })
// .catch(err => {
// 	console.error(err);
// });


//Need API to convert what is inputted and searched to LATITUDE and LONGITUDE; this is the Open Cage Geocoding API 
async function getLatitudeLongitude(city) {
  
  var url = "https://api.opencagedata.com/geocode/v1/json?q=" + city + "&key=" + openCageAPIKey;
  
  var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
  
  var results = await fetch(url, requestOptions);
  console.log("open cage api");
  return await results.json();

   
  }



//5 day weather forecast from Open Weather, calls by city name ONLY//needs work...
async function getFiveDayForecast(cityName) {

  var url = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + openWeatherAPIKey + "&units=imperial";

  var requestOptions = {
      method: 'GET',
      redirect: 'follow'
  };

  var results = await fetch(url, requestOptions);
  return await results.json();

}

//the following function will be performed when search is clicked (event listener at bottom in the logic portion)
async function search() {
  console.log("search is ran");
  const cityName = searchInputBox.value.trim();
  var forecastData = await getFiveDayForecast(cityName);
  console.log(forecastData);
  drawFiveDayForecast(forecastData.list);
  var latitudeLongitude = await getLatitudeLongitude(cityName);
  console.log(latitudeLongitude)
  getLatitudeLongitude(latitudeLongitude.results);
}

//the following function will render the five day forecast for the searched city
async function drawFiveDayForecast(data) {
  console.log("drawFiveDayForecast is working: ");
  //console.log(data);
  index = 0 
  
  
  //5 day forecast date information
  var dayZeroDate = document.getElementById("day-0-date");
    dayZero = data[index].dt;
    dayZeroDate.innerHTML = moment(new Date(dayZero * 1000)).format("L");
    var dayOneDate = document.getElementById("day-1-date");
    dayOne = data[index+8].dt;
    dayOneDate.innerHTML = moment(new Date(dayOne * 1000)).format("L");
    var dayTwoDate = document.getElementById("day-2-date");
    dayTwo = data[index+16].dt;
    dayTwoDate.innerHTML = moment(new Date(dayTwo * 1000)).format("L");
    var dayThreeDate = document.getElementById("day-3-date");
    dayThree = data[index+24].dt;
    dayThreeDate.innerHTML = moment(new Date(dayThree * 1000)).format("L");
    var dayFourDate = document.getElementById("day-4-date");
    dayFour = data[index+32].dt;
    dayFourDate.innerHTML = moment(new Date(dayFour * 1000)).format("L");

  //5 day forecast temp information
  var dayZeroTemp = document.getElementById("day-0-temp");
  dayZeroTemp.innerHTML = "Temp: " + data[index].main.temp + " °F";
  var dayOneTemp = document.getElementById("day-1-temp");
  dayOneTemp.innerHTML = "Temp: " + data[index+8].main.temp + " °F";
  var dayTwoTemp = document.getElementById("day-2-temp");
  dayTwoTemp.innerHTML = "Temp: " + data[index+16].main.temp + " °F";
  var dayThreeTemp = document.getElementById("day-3-temp");
  dayThreeTemp.innerHTML = "Temp: " + data[index+24].main.temp + " °F";
  var dayFourTemp = document.getElementById("day-4-temp");
  dayFourTemp.innerHTML = "Temp: " + data[index+36].main.temp + " °F";

  //5 day forecast wind information
  var dayZeroWind = document.getElementById("day-0-wind");
  dayZeroWind.innerHTML = "Wind: " + data[index].wind.speed + " mph";
  var dayOneWind = document.getElementById("day-1-wind");
  dayOneWind.innerHTML = "Wind: " + data[index+8].wind.speed + " mph";
  var dayTwoWind = document.getElementById("day-2-wind");
  dayTwoWind.innerHTML = "Wind: " + data[index+16].wind.speed + " mph";
  var dayThreeWind = document.getElementById("day-3-wind");
  dayThreeWind.innerHTML = "Wind: " + data[index+24].wind.speed + " mph";
  var dayFourWind = document.getElementById("day-4-wind");
  dayFourWind.innerHTML = "Wind: " + data[index+36].wind.speed + " mph";

  //5 day forecast humidity information
  var dayZeroHumidity = document.getElementById("day-0-humidity");
  dayZeroHumidity.innerHTML = "Humidity: " + data[index].main.humidity + "%";
  var dayOneHumidity = document.getElementById("day-1-humidity");
  dayOneHumidity.innerHTML = "Humidity: " + data[index+8].main.humidity + "%";
  var dayTwoHumidity = document.getElementById("day-2-humidity");
  dayTwoHumidity.innerHTML = "Humidity: " + data[index+16].main.humidity + "%";
  var dayThreeHumidity = document.getElementById("day-3-humidity");
  dayThreeHumidity.innerHTML = "Humidity: " + data[index+24].main.humidity + "%";
  var dayFourHumidity = document.getElementById("day-4-humidity");
  dayFourHumidity.innerHTML = "Humidity: " + data[index+36].main.humidity + "%";

  //5 day forecast weather description

  var dayZeroIcon = document.getElementById("day-0-icon");
  dayZeroIcon.innerHTML = data[index].weather[index].description;
  var dayOneIcon = document.getElementById("day-1-icon");
  dayOneIcon.innerHTML = data[index+8].weather[index].description;
  var dayTwoIcon = document.getElementById("day-2-icon");
  dayTwoIcon.innerHTML = data[index+16].weather[index].description;
  var dayThreeIcon = document.getElementById("day-3-icon");
  dayThreeIcon.innerHTML = data[index+24].weather[index].description;
  var dayFourIcon = document.getElementById("day-4-icon");
  dayFourIcon.innerHTML = data[index+36].weather[index].description;;

}

$(document).ready(async function () {

  searchButton.addEventListener('click', search);
  searchInputBox.value = "Denver";
  search();

});


// Location submit handler


//Function to get Hiking Api


//Funtion to get weather api


//Print Trail Location rout

//Print weather results in cards


//

