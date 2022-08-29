var appid = '485bbc753e29e9770f09ca55c32c6d79';
var q = document.querySelector('#q');

q = "Charlotte"

var geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${q}&appid=${appid}`;


function getLocation() {
    fetch(geoURL)
        .then(function (response) {
        return response.json();
    })
        .then(function (locations) {
        var city = locations[0];
        console.log('LAT', city.lat);
        console.log('LON', city.lon);

        getWeather(city);
    })
};

getLocation();