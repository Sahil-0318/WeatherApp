async function getWeather(city) {
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8c7f4ee11596611a0db7e9b672102653&units=metric`;
    const response = await fetch(api);
    const data = await response.json();
    // console.log(data);
    showWeather(data);
}

const showWeather = (data) => {
    // console.log(data);
    document.querySelector('input').value = '';

    if(data.cod === '404'){
        document.querySelector('.container').remove();

        const div = document.createElement('div');
        div.classList.add('container');
        div.innerHTML = `
        <h2 id="status404">Sorry, location not found</h2>
        <div class="imgBox">
        <img src="./assets/404.png" alt="Weather Icon">
        </div>`;

        document.querySelector('.wrapper').appendChild(div);
    }
    
    else if(data.cod === '400'){
        document.querySelector('.container').remove();
        
        const div = document.createElement('div');
        div.classList.add('container');
        div.innerHTML = `
        <h2 id="status404">Sorry, please enter any location</h2>
        <div class="imgBox">
        <img src="./assets/404.png" alt="Weather Icon">
        </div>`;

        document.querySelector('.wrapper').appendChild(div);
    }
    
    else{
        document.querySelector('.container').remove();

        const div = document.createElement('div');
        div.classList.add('container');
        div.innerHTML = `
        <div class="imgBox">
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon">
        </div>
        
        <div class="temp">
        <h2>${(data.main.temp).toFixed(0)}°C</h2>
        <P>${(data.weather[0].description).toLowerCase()}</P>
        </div>
        
        <div class="location">
        ${data.name}
        </div>
        
        <div class="humWindBox">
        <div class="humidity">
        <div>
        <i class="fas fa-droplet"></i>
        </div>
        <div>
        <h3>${data.main.humidity}%</h3>
        <p>Humidity</p>
        </div>
        </div>
        
        <div class="wind">
        <div>
        <i class="fas fa-wind"></i>
        </div>
        <div>
        <h3>${data.wind.speed}km/h</h3>
        <p>Wind Speed</p>
        </div>`;
        
        document.querySelector('.wrapper').appendChild(div);
    }   
}

document.querySelector('.fa-search').addEventListener('click', () => {
    getWeather(document.querySelector('input').value);
})

document.querySelector('input').addEventListener('keyup', (e) => {
    if(e.key === 'Enter'){
        getWeather(document.querySelector('input').value);
    }
})