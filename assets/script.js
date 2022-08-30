var appid = '485bbc753e29e9770f09ca55c32c6d79';
var citySearch = document.querySelector('#citySearch');
var jumbotronEl = document.querySelector('#jumbotron');
var searchBtn = document.querySelector('#search');
var searchedCitiesEl = document.querySelector('#searchedCities');
var fiveDaysEl = document.querySelector('#fiveDays');

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
    console.log(data);
    var h2El = document.createElement('h2');
    var tempEl = document.createElement('p');
    var windEL = document.createElement('p')
    var humidityEL = document.createElement('p')
    var uvEL = document.createElement('p')
    var icon = data.current.weather[0].icon;
    var imgEL = document.createElement('img');
    h2El.textContent = city.name;
    tempEl.textContent = 'TEMP: ' + data.current.temp + "°F";
    windEL.textContent = 'WIND: ' + data.current.wind_speed +'MPH';

    imgEL.width = 90;
    imgEL.height = 90;
    imgEL.alt= icon;
    imgEL.src= `http://openweathermap.org/img/wn/${icon}@2x.png`;

    jumbotronEl.appendChild(h2El);
    jumbotronEl.appendChild(imgEL);
    jumbotronEl.appendChild(tempEl);
    jumbotronEl.appendChild(windEL);
    
    var fiveDays = data.daily.slice(1,6);
    console.log(fiveDays);
    fiveDaysEl.innerHTML = null;
    for (var day of fiveDays) {
        var icon = day.weather[0].icon;
        var date = new Date(day.dt * 1000).toLocaleDateString();
        var temp = day.temp.day;
        var divOne = document.createElement('div');
        divOne.className = "card col-12 col-md-2 mx-2";
        divOne.style.width = '18rem';
        var divTwo = document.createElement('div');
        divTwo.className = "card-body";
        var h5El = document.createElement('h5');
        h5El.className = "card-title";
        var tempEl = document.createElement('p');
        tempEl.className = "card-text";
        var imgEL = document.createElement('img'); 

        h5El.textContent = date;
        tempEl.textContent = "TEMP: " + temp + "°F";
        
        imgEL.width = 45;
        imgEL.height = 45;
        imgEL.alt = icon;
        imgEL.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

        fiveDaysEl.appendChild(divOne);
        divOne.appendChild(divTwo);
        divTwo.appendChild(h5El);
        divTwo.appendChild(imgEL);
        divTwo.appendChild(tempEl);
        
    }
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

var oldSearches = function(event) {
    event.preventDefault();
    jumbotronEl.innerHTML = null;
    if (event.target.matches('button')) {
        var citySearch = event.target.textContent;
        var geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${citySearch}&appid=${appid}`;
        fetch(geoURL)
            .then(toJSON)
            .then(getLocation);
    }
};

searchBtn.addEventListener('click', searchCity);

searchedCitiesEl.addEventListener('click', oldSearches);


displaySearchedCities();