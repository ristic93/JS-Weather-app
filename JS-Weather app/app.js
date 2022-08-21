const iconElement = document.querySelector ('.weather-icon');
const tempElement = document.querySelector ('.temperature-value');
const descElement = document.querySelector ('.temperature-description');
const locationElement = document.querySelector ('.location');
const notificationElement = document.querySelector ('.notification');

// App data

const weather = {};

weather.temperature = {
    unit: 'celsius'
};


// API key

const key = `ab2a16e43cab031e74db7326d503814f`;


// Set user Position

const setPosition = (position) => {
    const {latitude, longitude} = position.coords;
    getWeather(latitude, longitude);
    // console.log(position);
}

// Show Error when there is an issue with Geolocation service

const showError = (error) => {
    notificationElement.style.display = 'block';
    notificationElement.innerHTML = `${error.message}`
}

// Check if the Browser supports Geolocation

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.style.display = 'block';
    notificationElement.innerHTML = `Your browser doesn't support gelocation API`
}

// Get weather from API Provider

getWeather = (latitude, longitude) => {
    
   const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`

   fetch(api)
.then(response => {
    return response.json();
 })
 .then(info => {
    weather.temperature.value = Math.floor(info.main.temp);
    weather.description = info.weather[0].description;
    weather.iconId = info.weather[0].icon;
    weather.city = info.name;
    weather.country = info.sys.country;
    // console.log(info);
 })
 .then(() => {
    displayWeather();
 });
};

// Display weather 

displayWeather = () => {
    iconElement.innerHTML = ` <img src="http://openweathermap.org/img/wn/${weather.iconId}@4x.png" alt="">`
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`
}