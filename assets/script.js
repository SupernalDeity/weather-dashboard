var appid = '485bbc753e29e9770f09ca55c32c6d79';
var citySearch = document.querySelector('#citySearch');
var jumbotronEl = document.querySelector('#jumbotron');
var searchBtn = document.querySelector('#search');
var searchedCitiesEl = document.querySelector('#searchedCities');

var toJSON =function(response) {
    return response.json();
};

var getLocation = function (locations) {
        var city = locations[0];
        console.log('LAT', city.lat);
        console.log('LON', city.lon);

        saveLocaleStorage(city.name);
        displaySearchedCities();
        getWeather(city);
};

var getWeather = function(city) {
    var oneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&appid=${appid}&units=imperial&exclude=hourly,minutely`;
    
    fetch(oneCall)
        .then(toJSON)
        .then(function(data){
            displayWeather(data, city);
    });
};

var displayWeather = function (data, city) {
    var h2El = document.createElement('h2');
    var tempEl = document.createElement('p');
    h2El.textContent = city.name;
    tempEl.textContent = 'TEMP: ' + data.current.temp;
    jumbotronEl.appendChild(h2El);
    jumbotronEl.appendChild(tempEl);
};

var displaySearchedCities = function() {
    var cities = JSON.parse(localStorage.getItem('SearchedCities')) || [];
    var sevenCities = cities.slice(cities.length - 7);
    searchedCitiesEl.innerHTML = null;
    for (var city of sevenCities) {
        var cityLiEl = document.createElement('li');
        cityLiEl.className = "list-group-item";
        var cityButtonEl = document.createElement('button');
        cityButtonEl.textContent = city;
        cityButtonEl.className = "btn btn-success w-100 text-center";
        cityLiEl.appendChild(cityButtonEl);
        searchedCitiesEl.appendChild(cityLiEl);
    }
};

var searchCity = function(event) {
    event.preventDefault();
    jumbotronEl.innerHTML = null;
    var geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${citySearch.value}&appid=${appid}`;
    fetch(geoURL)
        .then(toJSON)
        .then(getLocation);
};

var saveLocaleStorage = function(city) {
    var cities = JSON.parse(localStorage.getItem('SearchedCities')) || [];
    cities.push(city);
    var data = JSON.stringify(cities);
    localStorage.setItem('SearchedCities', data);
};

searchBtn.addEventListener('click', searchCity);

displaySearchedCities();