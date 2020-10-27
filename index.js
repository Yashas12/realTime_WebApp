const searchform = document.querySelector('.search-location');
const cityValue = document.querySelector('.search-location input');
const cityName = document.querySelector('.city-name p');
const cardBody = document.querySelector('.card-body');
const cardBody1 = document.querySelector('.wind-card');
const cardBody2 = document.querySelector('.loc-card');
const timeImg = document.querySelector('.card-top img');

//const cardInfo1 = document.querySelector('.card-body');
const cardInfo2 = document.querySelector('.wind-card');
const cardInfo3 = document.querySelector('.loc-card');



const giveMeCelsius = (kelvin)=>{
    celsius = Math.round(kelvin-273.15);
    return celsius;
}

const giveMeKilometers = (meters)=>{
    km = Math.round(meters/1000);
    return km;
}

const isDayTime = (icon)=>{
    if(icon.includes('d')){
        return true;
    }
    else return false;
}

/*const changeBackImage = (desc)=>{
    console.log(desc)
    if(desc.includes('clear sky' || 'few clouds')){
        document.body.style.backgroundImage = url('img/clear_sky');
    }
    else
    if(desc.includes('scattered clouds' || 'broken clouds')){
        document.body.style.backgroundImage = url('img/cloudy.jpg');
    }
}*/

updateWeatherApp = (city)=>{
    //console.log('day');
    console.log(city);

    const backImg = city.weather[0].description;
    const imgName = city.weather[0].icon;
    //console.log(imgName);
    const iconSrc = `http://openweathermap.org/img/wn/${imgName}@2x.png`
    cityName.textContent = city.name;
    cardBody.innerHTML = `
    <div class="card-mid row">
                    <div class="col-8 text-center temp">
                        <span>${giveMeCelsius(city.main.temp)}&deg;C</span>
                    </div>
                    <div class="col-4 condition-temp">
                        <p class="condition">${city.weather[0].description}</p>
                        <p class="high">${giveMeCelsius(city.main.temp_max)}&deg;C</p>
                        <p class="low">${giveMeCelsius(city.main.temp_min)}&deg;C</p>
                    </div>
                </div>

                <div class="icon-container card shadow mx-auto">
                    <img src="${iconSrc}" alt=""/>
                </div>
                <div class="card-bottom px-5 py-4 row">
                    <div class="col text-center">
                        <p>${giveMeCelsius(city.main.feels_like)}&deg;C</p>
                        <span>Feels like</span>
                    </div>
                    <div class="col text-center">
                        <p>${city.main.humidity}%</p>
                        <span>Humidity</span>
                    </div>
                </div>
    `

    cardBody1.innerHTML = `
    <div class="card-rounded my-3 shadow-lg wind-card">
    <div class="wind-card-top text-center">
        <div class="wind-title my-3">
            <p>Wind</p>
        </div>
        <img src="img/wind.jpg" alt="">
    </div>
    <div class="wind-card-body">
        <div class="wind-condition row">
            <div class="col text-center wind-speed">
                <p>Speed: ${city.wind.speed}m/s</p>
            </div>
            <div class="col text-center wind-degree">
                <p>Degree: ${city.wind.deg}&deg;</p>
            </div>
        </div>
    </div>
</div>
    `
    cardBody2.innerHTML = `
    <div class="card-rounded my-3 shadow-lg loc-card">
    <div class="loc-card-top text-center">
        <div class="loc-title my-3">
            <p>Location</p>
        </div>
        <img src="img/coord.jpg" alt="" class="img2">
    </div>
    <div class="loc-card-body">
        <div class="loc-condition row">
            <div class="col lat-long text-center">
                <p class="lon">Latitude: ${city.coord.lat}</p>
                <p class="long">Longitude: ${city.coord.lon}</p>
            </div>
            <div class="col text-center visibility">
                <p class="visib">Visibility: ${giveMeKilometers(city.visibility)}KM</p>
            </div>
        </div>
    </div>
</div>
    `

    if(isDayTime(imgName)){
        console.log('Day');
        timeImg.setAttribute('src','img/day_image.svg');

        if(cityName.classList.contains('text-white')){
            cityName.classList.remove('text-white');
        }
        cityName.classList.add('text-black');
    }
    else{
        console.log('Night');
        timeImg.setAttribute('src','img/night_image.svg');
        if(cityName.classList.contains('text-black')){
            cityName.classList.remove('text-black');
        }
        cityName.classList.add('text-white');
    }

    //cardInfo1.classList.remove('d-none');
    cardInfo2.classList.remove('d-none');
    cardInfo3.classList.remove('d-none');

    //changeBackImage(backImg);
    

}

//changeBackImage(backImg);



//add an event listener to the form
searchform.addEventListener('submit', e=>{
    e.preventDefault();

    const citySearched = cityValue.value.trim();
    console.log(citySearched);
    searchform.reset();

    requestCity(citySearched)
        .then((data)=>{
            updateWeatherApp(data);
        })
        .catch((error)=>{console.log(error)})
})