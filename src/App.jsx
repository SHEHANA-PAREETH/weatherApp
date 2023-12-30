import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import icon from './images/ios-weather.svg'
import { useEffect, useState } from 'react';
import axios from 'axios'
function App() {

  const [data,setData]=useState({})

const [city,setCity]=useState()
  
  const getWeatherData=(weatherdata)=>{
   console.log(weatherdata);
   const {humidity,
    pressure,
    sea_level,
    temp,
    temp_max,
    temp_min}=weatherdata

  }
  const handleChange=(e)=>{
    setCity(e.target.value)
  }
  function getWeatherLocation () {
    navigator.geolocation.getCurrentPosition((success) => {
       
        let {latitude,longitude} = success.coords;
       // console.log(latitude,longitude);
        const apiKey = "7c6a16eb97b619df6941d532c77fb236"
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=7c6a16eb97b619df6941d532c77fb236`).then((resp) => {
    
    console.log(resp);
    setData(resp.data)
    getWeatherData(resp.data.main)
   // DailyForecast()
    })
        //console.log(resp.data)
        //
        //})

    })
}

const DailyForecast=()=>{
    navigator.geolocation.getCurrentPosition((success) => {
        const apiKey = "7c6a16eb97b619df6941d532c77fb236"
        let {latitude,longitude} = success.coords;
    axios.get(`api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&cnt=7&appid=${apiKey}`).then((resp)=>{
        console.log(resp);
    })
})
}
const handleSearch=(city)=>{
    console.log(city);
    const apiKey = "7c6a16eb97b619df6941d532c77fb236"
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`).then((resp)=>{
        console.log(resp);
        setData(resp.data)
    })
    
}
    const time= new Date()
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const day = time.getDay();
  useEffect(()=>{
    getWeatherLocation()
    //DailyForecast()
  },[])
  return (
    <>
     
     
    <div class="container">
    <input type="text" className='form-control'  onChange={handleChange}/>
    <button  className='btn btn-primary' onClick={handleSearch}>Search</button>
        <div class="current-info">

            <div class="date-container">
                <div class="time" id="time">
                {new Date().getUTCDate()}-{new Date().getUTCMonth()}-{new Date().getUTCFullYear()}

                </div>
                <div class="date" id="date">
                {hoursIn12HrFormat}-{minutes} {ampm}
                </div>

                <div class="others" id="current-weather-items">
                    <h6>humidity: {data?.main?.humidity}</h6>
                    <h6>pressure :{data?.main?.pressure}</h6>
                    
                </div>
            </div>

            <div class="place-container">
                <div class="time-zone" id="time-zone">{data.name}</div>
                <div id="country" class="country">{ data.lat + 'N ' + data.lon+'E'}</div>
            </div>
        </div>

        
    </div>

    <div class="future-forecast">
        <div class="today" id="current-temp">
            <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="weather icon" class="w-icon"/>
            <div class="other">
                <div class="day">{days[day]}</div>
                <div class="temp">Night - {data?.main?.temp_min}&#176; C</div>
                <div class="temp">Day - {data?.main?.temp_max}&#176; C</div>
            </div>
        </div>

        <div class="weather-forecast" id="weather-forecast">
            <div class="weather-forecast-item">
                <div class="day">Monday</div>
                <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="weather icon" class="w-icon"/>
                <div class="temp">Night - 25.6&#176; C</div>
                <div class="temp">Day - 35.6&#176; C</div>
            </div>
            <div class="weather-forecast-item">
                <div class="day">Wed</div>
                <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="weather icon" class="w-icon"/>
                <div class="temp">Night - 25.6&#176; C</div>
                <div class="temp">Day - 35.6&#176; C</div>
            </div>
            <div class="weather-forecast-item">
                <div class="day">Thur</div>
                <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="weather icon" class="w-icon"/>
                <div class="temp">Night - 25.6&#176; C</div>
                <div class="temp">Day - 35.6&#176; C</div>
            </div>
            <div class="weather-forecast-item">
                <div class="day">Fri</div>
                <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="weather icon" class="w-icon"/>
                <div class="temp">Night - 25.6&#176; C</div>
                <div class="temp">Day - 35.6&#176; C</div>
            </div>
            <div class="weather-forecast-item">
                <div class="day">Sat</div>
                <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="weather icon" class="w-icon"/>
                <div class="temp">Night - 25.6&#176; C</div>
                <div class="temp">Day - 35.6&#176; C</div>
            </div>

        </div>
        </div>
    </>
   
 
  );
}

export default App;
