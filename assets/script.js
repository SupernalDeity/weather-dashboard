var appid = '485bbc753e29e9770f09ca55c32c6d79';
var q = document.querySelector('#q');
var jumbotronEl = document.querySelector('#jumbotron');

q = "Charlotte"

var geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${q}&appid=${appid}`;

var toJSON =function(response) {
    return response.json();
};

function getLocation() {
    fetch(geoURL)
        .then(toJSON)
        .then(function (locations) {
            var city = locations[0];
            console.log('LAT', city.lat);
            console.log('LON', city.lon);

        getWeather(city);
        })
};

var getWeather = function(city) {
    var oneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&appid=${appid}&units=imperial&exclude=hourly,minutely`;

    fetch(oneCall)
        .then(toJSON)
        .then(function(data){
            displayWeather(data, city);
        })
};

var displayWeather = function (data, city) {
    var h2El = document.createElement('h2');
    var tempEl = document.createElement('p');
    h2El.textContent = city.name;
    tempEl.textContent = 'TEMP: ' + data.current.temp;
    jumbotronEl.appendChild(h2El);
    jumbotronEl.appendChild(tempEl);
};


fetch(geoURL)
    .then(toJSON)
    .then(getLocation);