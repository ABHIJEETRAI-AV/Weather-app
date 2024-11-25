document.addEventListener("DOMContentLoaded", function () {
    const searchbtn = document.querySelector("#searchbtn");
    const input = document.querySelector("#search");




    function validateCityName(cityname) {
        if (cityname.trim() === "") {
            alert("Enter a city name first");
        }
        return 1;
    }
    searchbtn.addEventListener('click', function () {
        const cityname = input.value;
        if (validateCityName(cityname)) {
            fetchCityname(cityname);
        }
    })
    async function fetchCityname(cityname) {
        try {
            searchbtn.textContent = "Searching...";
            searchbtn.disabled = true;
            const url = `https://api.tomorrow.io/v4/weather/realtime?location=` + cityname + ` &apikey=8GM4ijk96jEnSJycM5sgbNeVeHftTBP5`
            const response = await fetch(url);
            headers: {accept: 'application/json'}
            const parsedData = await response.json();
            if (!response.ok) {
                throw new error("Unable to fetch location")
            }
            console.log("Logging data ", parsedData);
            displayUserData(parsedData);

        }
        catch (error) {
            document.querySelector(".container").innerHTML = `<p>${error.message}</p>`

        }
        finally {
            searchbtn.textContent = "Search";
            searchbtn.disabled = false;
        }
    }
    function displayUserData(parsedData, cityname) {
        const displayCity = parsedData.location.name;
        console.log(displayCity)
        const temperature= parsedData.data.values.temperature;
        console.log(temperature);
        const humid = parsedData.data.values.humidity;
        const windspeed= parsedData.data.values.windSpeed;
        const time = parsedData.data.time;
        console.log(time)


        updateCity(displayCity,time);
        updateTemperature(temperature);
        updateHumidityWind(humid,windspeed);
        // updateTime(time);
    }
function  updateCity(displayCity,time){
document.querySelector(".city").innerHTML=`<p>${displayCity}<br><span class="time">${time}</span></p>`
}
function  updateTemperature(temperature){
    document.querySelector(".temp").innerHTML=`<p>${temperature} <sup>o</sup>C</p>`    
}
function  updateHumidityWind(humidity, windSpeed){
    document.querySelector(".humid").innerHTML=`<p>Humidity : ${humidity}</p> <p>Wind Speed : ${windSpeed}</p>` 
}
// function updateTime(time){
//     document.querySelector(".times").innerHTML = `<p> ${time} </p>`;
// }
})