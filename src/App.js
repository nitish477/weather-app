import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import cloud from './cloudy-sky-background-with-big-sun-flat-style_23-2147793151-removebg-preview.png'

function App() {
  const [weathers, setWeathers] = useState({})
  const [city, setCity] = useState('pune')
  const [weatherDiscription, setWeatherDiscripyion] = useState('')

  async function loadWeather() {
    let responce = ""
    try {
      responce = await axios.get(` https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a74cbde469b6cc2c5c52dceafa045fb0`)
      setWeathers(responce.data)
    } catch (error) {
      console.log(error)
    }




  }



  useEffect(() => {
    loadWeather();
  }, [])

  useEffect(() => {
    loadWeather();
  }, [city])

  useEffect(() => {
    setWeatherDiscripyion(` ${weathers?.weather?.[0]?.main} 
 (${weathers?.weather?.[0]?.description}) `)

  }, [weathers])

  return (
    <>
      <div className='container'>
        <input
          className='cityInput'
          type='text'
          placeholder='Search'
          value={city}
          onChange={(e) => { setCity(e.target.value) }}
        />


        <div className='top-bar'>
          <div className='mobile-screen'>
            <div>

              <p>City : <span style={{ fontSize: '20px' }}> {weathers?.name} </span>

                <br />  temperature <br />

                <span style={{ fontSize: '30px', fontWeight: '600' }}>  {(weathers?.main?.temp - 273).toFixed(2)}°C </span>
              </p>
            </div>

            <div className='maxtemp'>
              <p>Min_temp: <br />  {(weathers?.main?.temp_min - 273).toFixed(2)}°C </p>
              <p>Max_temp: <br /><span>  {(weathers?.main?.temp_max - 273).toFixed(2)}°C  </span></p>
            </div>
          </div>
          <div>
            <img src={cloud} className='img' alt='' />
            <p className='disp'> {weatherDiscription} </p>
          </div>


        </div>
        <span className='air-condition'>Air Condition</span>
        <div className='main-container'>

          <div className='sub'>
            <div>
              <p>
                <img src='https://cdn-icons-png.flaticon.com/128/2100/2100100.png' className='icon' alt='' /> : {(weathers?.main?.feels_like - 273).toFixed(2)}°C  (Feel Like )
              </p>
            </div>
            <div>
              <p>

                <img src='https://cdn-icons-png.flaticon.com/128/4148/4148460.png' className='icon' alt='' /> :
                {(weathers?.main?.humidity)}% (Humidity)
              </p>
            </div>
            <div>
              <p><img src="https://cdn-icons-png.flaticon.com/128/8740/8740155.png" alt="" className='icon' />
                :   {(weathers?.main?.sea_level)} mm (Sea_level)
              </p>
            </div>
          </div>
          <div className='sub'>
            <div> <p><img src="https://cdn-icons-png.flaticon.com/128/1506/1506761.png" alt="" className='icon' /> :
              {weathers?.wind?.speed} Km/h (Wind Speed)
            </p></div>
            <div> <p>
              <img src="https://cdn-icons-png.flaticon.com/128/3579/3579149.png" className='icon' alt="" /> :
              {(weathers.visibility / 1000)} km (Visibility)
            </p></div>
            <div>
              <img src='https://cdn-icons-png.flaticon.com/128/2412/2412655.png' alt='' className='icon' /> :
              {weathers?.main?.pressure} hPa (Air Pressure)
            </div>
          </div>


        </div>
      </div>


    </>
  );
}

export default App;


