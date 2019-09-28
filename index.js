window.addEventListener('onload', getWeather());

var inputCity = document.getElementById('city_input');
var getWeather = document.getElementById('getWeather');
var city = document.querySelector("#city_input");
getWeather.addEventListener('click', receiveDataByCityName);

function getWeather(){
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function (position){
			receiveData(position.coords.latitude, position.coords.longitude);
		});
	}else{
		alert('Could not get location');
	}
}

function receiveData(lat, long) {
	fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon='+ long +'&appid=b39bc41d2ebb7cdb7c7432343a8a764a')
	  .then(function (response) {
		return response.json();
	  })
	  .then(function (response) {
		document.title = response.name;
		return displayWeather(response.main.humidity, response.main.pressure, celsiusToFahrenheit(response.main.temp), response.wind.speed, response.weather[0].icon);
	  })
  }

function receiveDataByCityName() {
  fetch('http://api.openweathermap.org/data/2.5/find?q=' + city.textContent + '&type=like&APPID=8f455e4264ba64823bb04401b264361a')
	  .then(function (response) {
		return response.json();
	  })
	  .then(function (response) {
		console.log(response)
		document.title = response.list[0].name;
		return displayWeather(response.list[0].main.humidity, response.list[0].main.pressure, celsiusToFahrenheit(response.list[0].main.temp), response.list[0].wind.speed);
	  });
	clearInput ();
}

function displayWeather(humidity, pressure, currentTempereture, windSpeed, icon){
	var date = new Date();
	document.querySelector('#current-time').textContent = date.getHours() + ' : ' + date.getMinutes();
	document.querySelector('#temperature').textContent = currentTempereture + " °C";
	document.querySelector('#current-humidity').textContent = "Humidity: " + humidity + "%";
	document.querySelector('#current-pressure').textContent = "Pressure: " + pressure + " mbar";
	document.querySelector('#current-wind-speed').textContent = "Wind: " + windSpeed + " km/h";
}

function celsiusToFahrenheit (kelvin){
	return (kelvin - 273.15).toFixed(1);
}

function clearInput () {
	inputCity.textContent = '';
}