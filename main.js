const api = {
    key: "b58a2bc7dfc2d4b6e251714287d28055",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt){
    if(evt.which == 13){
        getResults(searchbox.value);
    }
}

function getResults(query){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults(weather){
    let city = document.querySelector('.location .city');
    city.innerText =  `${weather.name}, ${weather.sys.country}`;

    let now = new Date(weather.dt*1000);
    let date = document.querySelector('.location .date');
    date.innerText = now.toDateString();

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${(weather.main.temp).toFixed(2)}<span>°c</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;
  
    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${(weather.main.temp_min).toFixed(2)}°c / ${(weather.main.temp_max).toFixed(2)}°c`;
}
