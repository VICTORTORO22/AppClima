import { useEffect } from 'react'
import './App.css'
import { useState } from 'react'
import axios from 'axios'
import WeatherCard from './components/WeatherCard'
import Loading from './components/Loading'

function App() {
  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [showMesage, setShowMesage] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setShowMesage(true)
    }, 3000)


    const success = pos => {
      console.log(pos)
      setCoords({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      })
    }
    const error = () => {
      setHasError(true)
      setIsLoading(false)

    }
    navigator.geolocation.getCurrentPosition(success, error)
  }, [])

  


  useEffect(() =>{
   
    if(coords){

      const apiKey = '1c68399f71b373582346afcbf7a70b49'

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}`
      axios.get(url)
      .then(res => {
        setWeather(res.data)
        const celsius = (res.data.main.temp - 273.15).toFixed(1)
        const fahrenheit = (celsius * 9/5 * 32).toFixed(1)
        setTemp({celsius, fahrenheit})
      })
      .catch(err => console.log(err))
      .finally( () => setIsLoading(false)) 
    }

  }, [coords])

  console.log(weather)




  return (
   <div className='app'>
    {
      isLoading
      ?(
        <div>
          <Loading /> 
          {
            showMesage && <p style={{backgroundColor:'rgba(214, 241, 252, 0.5)', textAlign:'center'}}><br />Por favor, activa la ubicación</p>
          }
        </div>
        
      )
      : (
        hasError 
        ? 
        <h1 style={{backgroundColor:'rgba(214, 241, 252, 0.5)'}}>para obtener el clima debe permitir la ubicacion</h1>
        
        :
        <WeatherCard
        weather={weather}
        temp={temp}
        />
      )
    }
   

   </div>
  )
}

export default App
