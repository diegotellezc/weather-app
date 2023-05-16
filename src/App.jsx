import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import './App.css'
import Loader from './components/Loader'
import Weather from './components/Weather'
import Searcher from './components/Searcher'
import Footer from './components/Footer'

function App() {
  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [weatherCity, setWeatherCity] = useState()
  const [temp, setTemp] = useState()
  const [tempCity, setTempCity] = useState()
  const [iconID, setIconId] = useState("")
  const [query, setQuery] = useState("");

  const bgImages = {
    "01d": "bg-[url('/images/bgImages/bg01n.jpg')]",
    "01n": "bg-[url('/images/bgImages/bg01n.jpg')]",
    "02d": "bg-[url('/images/bgImages/bg02d.jpg')]",
    "02n": "bg-[url('/images/bgImages/bg02n.jpg')]",
    "03d": "bg-[url('/images/bgImages/bg03d.jpg')]",
    "03n": "bg-[url('/images/bgImages/bg03n.jpg')]",
    "04d": "bg-[url('/images/bgImages/bg04d.jpg')]",
    "04n": "bg-[url('/images/bgImages/bg04n.jpg')]",
    "09d": "bg-[url('/images/bgImages/bg09d.jpg')]",
    "09n": "bg-[url('/images/bgImages/bg09n.jpg')]",
    "10d": "bg-[url('/images/bgImages/bg10d.jpg')]",
    "10n": "bg-[url('/images/bgImages/bg10n.jpg')]",
    "11d": "bg-[url('/images/bgImages/bg11d.jpg')]",
    "11n": "bg-[url('/images/bgImages/bg11n.jpg')]",
    "13d": "bg-[url('/images/bgImages/bg13d.jpg')]",
    "13n": "bg-[url('/images/bgImages/bg13n.jpg')]",
    "50d": "bg-[url('/images/bgImages/bg50d.jpg')]",
    "50n": "bg-[url('/images/bgImages/bg50n.jpg')]"
  }

  const success = (pos) => {
    const currentCoords = {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude
    }
    setCoords(currentCoords)
  }

  // Efecto para la localización
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  // Efecto del llamado a la API - usuario
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

        setIconId(res.data.weather[0].icon)
        setTemp(newTemps)
      })
      .catch((err) => console.log(err))
    }
  }, [coords])

// Funcion del llamado a la API - input
const handleSearch = (e) => {
  e.preventDefault();
  if (query) {
    const URLCity = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=68187a38d653607d35b491707478c55a`;

    axios.get(URLCity)
      .then((res) => {
        console.log(res.data)
        setWeatherCity(res.data)

        const celsius = (res.data.main.temp - 273.15).toFixed(1)
        const fahrenheit= (celsius * (9/5) + 32).toFixed(1)
        const newTemps = {
          celsius,
          fahrenheit
        }
        setIconId(res.data.weather[0].icon)
        setTempCity(newTemps)
        setQuery(""); // Limpia la barra de búsqueda después de realizar la búsqueda.
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
  
  return (
    <div className={`App ${bgImages[iconID]} bg-cover min-h-screen grid place-content-center px-2`}>
      
      {
        weather ? (
          <div className={`flex flex-col flex-wrap justify-center items-center ${tempCity ? "gap-8" : ""}  mt-[11rem] mb-12 sm:flex-row`}>

            <div className='sm:order-2'>
              {tempCity && <Searcher weather={weatherCity} temp={tempCity} />}
            </div>

            <div className='sm:order-1'>
              <Weather weather={weather} temp={temp} />
            </div>
            

            <form onSubmit={handleSearch} className='absolute top-16 left-1/2 transform -translate-x-1/2 sm:top-[10%]' action="">

                <input className='bg-white block rounded-md border-none text-gray-700 py-1 mb-4 px-4 leading-tight focus:outline-none sm:w-64' type="text" placeholder='Search by city' value={query} onChange={(e) => setQuery(e.target.value)} />

                <button className='bg-blue-500 block mx-auto py-2 px-6 text-white font-bold rounded-full hover:bg-blue-800 duration-200 text-sm' type='submit'>Search</button>
            </form>

            <footer className='fixed bottom-0 w-full'>
              <Footer />
            </footer>
          </div>
          ) : (
            <Loader />
          )
      }
    </div>
  )
}

export default App
