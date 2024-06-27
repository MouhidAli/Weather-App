const apikey = "7f8dc69f7d9ceb53eb83db22c12f80ff";

const weatherDataEl = document.getElementById("weather-data")

const cityInputEl = document.getElementById("city-input")

const formEl = document.querySelector("form")

formEl.addEventListener("submit", (event)=>{
    event.preventDefault()
    const cityValue = cityInputEl.value;
    getWatherData(cityValue)
})

async function getWatherData(cityValue){
    try{
       const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`)

       if(!response.ok){
        throw new Error("Network response in not ok")
       }
       const data = await response.json();
       console.log(data);

       const temperature = Math.round(data.main.temp)

       const description = data.weather[0].description

       const icon = data.weather[0].icon

       const details = [
        `Feel like: ${Math.round(data.main.feels_like)}`,
        `Humidity: ${data.main.humidity}%`,
        `Wind speed ${data.wind.speed}m/s`,
       ]

       weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Waether-Icon">`
       weatherDataEl.querySelector(".temperature").textContent = `${temperature}°C`
       weatherDataEl.querySelector(".description").textContent = description
       weatherDataEl.querySelector(".details").innerHTML = details.map((detail)=> ` <div>${detail}</div>` ).join("");
    } catch (error){

    }
}