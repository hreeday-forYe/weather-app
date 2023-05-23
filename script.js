  /* Name: Hridaya Mishra
    Std ID: 2228045 */

// Getting all the html elements through id
const date = document.getElementById('date');
const temperature = document.getElementById('temp');
const pressure = document.getElementById('pressure');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const statusbar = document.getElementById('statusbar');
const city = document.getElementById('city');
const img = document.getElementById('des-img');
const windDirection = document.getElementById('wind-direction');
const day = document.getElementById("day");

// URL for fethcing the JSON Data from php 
const url = `http://localhost/weatherapp/response.php`;




if(localStorage.api_fetchdate != null && Number.parseInt(localStorage.api_fetchdate) +300000
>Date.now())
  {
    temperature.innerHTML = `${localStorage.temp}`;
    pressure.innerHTML = `${localStorage.pressure}`;
    humidity.innerHTML = `${localStorage.humidity}`;
    windSpeed.innerHTML = `${localStorage.windspeed}`;
    statusbar.innerHTML = `${localStorage.status}`;
    // changing the icon img src to update the icon according to status
    img.src = `https://openweathermap.org/img/wn/${localStorage.icon}@2x.png`;
    windDirection.innerHTML = `${localStorage.windDirection}`;
    // Adding the date and day of the local time in city
    date.innerHTML=`${new Date(localStorage.date * 1000).toLocaleString('default', { month: 'long', day: 'numeric',year: 'numeric' })}`;
    day.innerHTML = `${new Date(localStorage.date * 1000).toLocaleString('default',{ weekday: 'long'})}`;
  }

else{


// Function to display data and store the data in local storage
function getDisplayData(url){
  let infoData;
  // fetching the data from the url
  fetch(url) // returns the promise
    .then(response => response.json()) // Returns the promise
    .then(data => {
    infoData = data;
    // storing the data from the php api to our local storage
    localStorage.setItem('temp',`${Math.ceil(infoData.temp)}&#176C`);
    localStorage.setItem('pressure',`Pressure: ${Math.ceil(infoData.pressure)}hpa`);
    localStorage.setItem('humidity',`Humidity: ${Math.floor(infoData.humidity)}%`);
    localStorage.setItem('windspeed',`Wind Speed: ${(infoData.speed)}m/s`);
    localStorage.setItem('status',`${infoData.descriptio}`);
    localStorage.setItem('icon',`${infoData.icon}`);
    localStorage.setItem('windDirection',`Wind Direction: ${infoData.direction}&deg`); 
    localStorage.setItem('date',`${infoData.nowDate}`); 
    localStorage.setItem('fetchDate',Date.now());
    
    // Updating the data in the web page for each elements
    temperature.innerHTML = `${localStorage.temp}`;
    pressure.innerHTML = `${localStorage.pressure}`;
    humidity.innerHTML = `${localStorage.humidity}`;
    windSpeed.innerHTML = `${localStorage.windspeed}`;
    statusbar.innerHTML = `${localStorage.status}`;
    // changing the icon img src to update the icon according to status
    img.src = `https://openweathermap.org/img/wn/${localStorage.icon}@2x.png`;
    windDirection.innerHTML = `${localStorage.windDirection}`;
    // Adding thhe date and day of the local time in city
    date.innerHTML=`${new Date(localStorage.date * 1000).toLocaleString('default', { month: 'long', day: 'numeric',year: 'numeric' })}`;
    day.innerHTML = `${new Date(localStorage.date * 1000).toLocaleString('default',{ weekday: 'long'})}`
  });

}
}

// passing the url and calling the function
getDisplayData(url);
