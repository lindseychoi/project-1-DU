
//API//////////////////////////////////////////////////////////////////////////////////////

//Trail API for information
fetch("https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lat=null&lon=null", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "trailapi-trailapi.p.rapidapi.com",
		"x-rapidapi-key": "d0940ee964msh728cc5d9f2642bap1a36ccjsne2e0b86173ec"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});

//Need API to convert what is inputted and searched to LATITUDE and LONGITUDE; this is the Open Cage Geocoding API 
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("https://api.opencagedata.com/geocode/v1/json?q=Denver&key=0148c7965c584dfc849607c4be6c640b", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

//Need API to search the current weather and 5 day forecast, only needs a city NAME; Open Weather is the API
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("api.openweathermap.org/data/2.5/forecast?q=Denver&appid=61bd5a7935f37e9c18cacd14e8c89bc3", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))