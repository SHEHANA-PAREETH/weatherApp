import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import icon from './images/ios-weather.svg'
import { useEffect, useState } from 'react';
import axios from 'axios'
function App() {

  const [data,setData]=useState({})
const [cityName,setCity]=useState('')
  //const apiKey='558a2e64474b6eb0b07f2a6b87965c75';
  const getWeatherData=(cityName)=>{
if(!cityName) return
const apiKey = "a9906c2a20bd80d191b59d5f96ed1357"
const url="https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
   
    axios.get(url).then((resp)=>{
      console.log(resp);
      setData(resp.data)
    }).catch((error)=>{
      console.log(error);
    })
  }
  const handleChange=(e)=>{
    setCity(e.target.value)
  }
  const handleSearch=()=>{
    getWeatherData(cityName)
  }
  useEffect(()=>{
    getWeatherData("delhi")
  },[])
  return (
    <div className="container-fluid weatherBg">
      <div className="row ">
      <div className='col-md-12'>
        <div>
        <h1 className='heading'>Weather App</h1>
    <div className='d-grid gap-3 mt-3'>
    <input type="text" className='form-control' value={cityName} onChange={handleChange}/>
  <button onClick={handleSearch} className='btn btn-primary'>Search</button>
    </div>
        </div>
</div>
    </div>
    <div className='row'>
<div className="col-md-12">
  <div className='shadow rounded weatherResultBox'>
   <img className='weatherIcon' src={icon} alt="" />
  <h5 className='weatherCity'>{data?.name}</h5>
  <h6 className='weatherTemp'>{((data?.main?.temp)-273.15).toFixed(2)} °C</h6>
  </div>
</div>
    </div>
    </div>
  );
}

export default App;
