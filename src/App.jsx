import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import Loader from './components/Loader'
import Weather from './components/Weather'

function App() {
  // Estado para coordenadas que da el navegador
  const [coords, setCoords] = useState()

  // Estado para la info que traemos de la API
  const [weather, setWeather] = useState()

  // Estado de las temperaturas
  const [temp, setTemp] = useState()

  const success = (pos) => {
    const currentCoords = {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude
    }
    setCoords(currentCoords)
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  useEffect(() => {
    if(coords) {
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=68187a38d653607d35b491707478c55a`

    axios.get(URL)
      .then((res) => {
        setWeather(res.data)
        const celsius = (res.data.main.temp - 273.15).toFixed(1)
        const fahrenheit= (celsius * (9/5) + 32).toFixed(1)
        const newTemps = {
          celsius,
          fahrenheit
        }
        setTemp(newTemps)
      })
      .catch((err) => console.log(err))
    }
  }, [coords])
  


  return (
    <div className="App bg-[url('/images/bg-pokemon.jpeg')] bg-cover min-h-screen grid place-content-center px-2">
      
      {
        weather ? (
          <Weather weather={weather} temp={temp} />
        ) : (
          <Loader />
        )
      }
    </div>
  )
}

export default App
