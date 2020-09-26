console.log('Client side javascript file is loaded!')


const form = document.querySelector("form");
const input = document.querySelector("input");
const img = document.querySelector("img");
const weatherContent = document.querySelector(".weather-content");
const area = document.querySelector(".location");

weatherContent.innerHTML = `<p>Your weather details will show here!</p>`

const showWeather = (location) => {

    fetch(`/weather?address=${location}`)
    .then(res => res.json())
    .then(data => {
       if(data.error) {
        weatherContent.innerHTML = "Unable to find location!"
       }
       else {
        console.log(data)
        img.setAttribute("src",`${data.weather_icons}`);
        weatherContent.innerHTML = "hello world"
        weatherContent.innerHTML = `The temprature is ${data.temperature} and ${data.weather_descriptions}`;
        area.innerHTML = data.location;
       }
      

    })
}

form.addEventListener("submit", (e) => {

    e.preventDefault();
   
    if(input.value) {
        weatherContent.innerHTML = ""
        weatherContent.innerHTML = `<h1>Loading...</h1>`
        showWeather(input.value);
        input.value = "";
    }
    else {
        alert("input value cannot be empty")
    }
    // console.log("it's work")
})

