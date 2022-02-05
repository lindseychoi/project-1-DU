
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

//Need API to convert what is inputted and searched to LATITUDE and LONGITUDE

//Need API to search the current weather and 5 day forecast
