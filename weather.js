//toggling input box 
document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector('.locationBox');
    const searchbox = document.querySelector('.locationInput');
    
    // Global open/close functions
    const open = () => {
        button.classList.add('open-button');
        searchbox.classList.add('active');
    }
    
    const close = () => {
        button.classList.remove('open-button');
        searchbox.classList.remove('active');
    }
    
        // Check click on button
    button.addEventListener('mousedown', () => {
        if (!button.classList.contains('open-button')) {
            open()
        }else{
            close()
        }
    });
    
    
// Close when user click outside
    document.body.addEventListener('mousedown', (e) => {
        let isClickInsideButton = button.contains(e.target);
        let isClickInsidesBox = searchbox.contains(e.target);
        if (!isClickInsideButton && !isClickInsidesBox) {
            close ();
        }
    });
});

//Open-Weather-Api using fetch() functions
const api = {
    key: "2d71675f6d91bc85b252ca5a66482579",
    base: "https://api.openweathermap.org/data/2.5/"
};
    
//Adding event to Input Box
locationInput.addEventListener('keypress', setQuery);

//Making event for Enter Key 
function setQuery(event){
    if(event.keyCode == 13){
        result(locationInput.value);
    }
};


const result = (query) =>{
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather =>{
        return weather.json();
    }).then(displayResults);
};
    
    
function displayResults (weather){
    let temp = document.querySelector('.BigTemperature');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let tempbox = document.querySelector('.temperature');
    tempbox.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`
    
    let weather_el = document.querySelector('.BigDescription');
    weather_el.innerText = weather.weather[0].main;

    let humidity = document.querySelector('.humidity');
    humidity.innerText = weather.main.humidity + '%';
    
    let pressure = document.querySelector('.pressure');
    pressure.innerText = weather.main.pressure;
    
    let wind = document.querySelector('.wind');
    wind.innerHTML = weather.wind.speed;

    let now = new Date();
    let date = document.querySelector('.date');
    date.innerText = dateBuilder(now);
};



const dateBuilder =(d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}