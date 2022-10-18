const API_URL = 'https://api.open-meteo.com/v1/forecast?latitude=-34.8941&longitude=-56.0675&current_weather=1&timezone=America/Montevideo';

document.addEventListener('DOMContentLoaded', async function() {
    const icon = document.querySelector('.weather__icon img');
    const temp = document.querySelector('.weather__info-temp');
    const wind = document.querySelector('.weather__info-wind .value');
    const placeholder = document.querySelector('.wheather__placeholder');
    let response = await fetch('../data/codes.json');
    const codes = await response.json();

    const weather = await getWeather();

    const time = weather.time.getHours() >= 6 && weather.time.getHours() <= 18 ? 'day' : 'night';
    icon.src = codes[weather.code].icons[time];
    icon.alt = codes[weather.code].name;
    icon.title = codes[weather.code].name;
    
    temp.innerText = weather.temp;
    wind.innerText = weather.wind;

    placeholder.classList.add('hidden');

});

async function getWeather() {
    const response = await fetch(API_URL);
    const weather = await response.json();
    return {
        temp: weather.current_weather.temperature,
        code: weather.current_weather.weathercode,
        wind: weather.current_weather.windspeed,
        time: new Date(weather.current_weather.time)
    }
}