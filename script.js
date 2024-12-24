document.addEventListener("DOMContentLoaded",()=>{
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const cityInput = document.getElementById("city-input");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDispplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const erroMessage = document.getElementById("error-message");
    const API_KEY = "58f83ef8715d6d6df9ca2e167055106f"; // env variables

    getWeatherBtn.addEventListener('click',async()=>{
        const city = cityInput.value.trim();
        if(!city) return;

        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);

        } catch (error) {
            showError();
        }


    })
    
    async function fetchWeatherData(city){
        //gets the data
        
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

        const response = await fetch(url);
        console.log(typeof(response));
        console.log(response);

        if(!response.ok){
            throw new Error("city now found"); 
        }

       const data = await response.json();
        
        return data
    }


    function displayWeatherData(data){
       const {name ,main , weather} = data
       cityNameDispplay.textContent = name;

                temperatureDisplay.textContent = `Temperature : ${main.temp}`;
                descriptionDisplay.textContent = `Weather : ${weather[0].description}`;

       // unlock the display
       weatherInfo.classList.remove('hidden');
       erroMessage.classList.add('hidden');
       
    }


    function showError(){
        weatherInfo.classList.remove("hidden");
        erroMessage.classList.add("hidden");
    }

})