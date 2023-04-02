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

  // Estado para cambio de imagenes de fondo
  const [clase, setClase] = useState("")

  const success = (pos) => {
    const currentCoords = {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude
    }
    setCoords(currentCoords)
  }

  console.log(weather)

  // Efecto para la localización
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  // Efecto del llamado a la API
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
        console.log(res.data.weather[0].icon)
        getId(res.data.weather[0].icon)
        setTemp(newTemps)
      })
      .catch((err) => console.log(err))
    }
  }, [coords])
  
  // const bgImages = {
  //   "01d": '/images/bgImages/bg01n.jpeg',
  //   "01n": '/images/bgImages/bg01n.jpeg',
  //   "02d": '/images/bgImages/bg02d.jpeg',
  //   "02n": '/images/bgImages/bg02n.jpeg',
  //   "03d": '/images/bgImages/bg03d.jpeg',
  //   "03n": '/images/bgImages/bg03n.jpeg',
  //   "04d": '/images/bgImages/bg04d.jpeg',
  //   "04n": '/images/bgImages/bg04n.jpeg',
  //   "09d": '/images/bgImages/bg09d.jpeg',
  //   "09n": '/images/bgImages/bg09n.jpeg',
  //   "10d": '/images/bgImages/bg10d.jpeg',
  //   "10n": '/images/bgImages/bg10n.jpeg',
  //   "11d": '/images/bgImages/bg11d.jpeg',
  //   "11n": '/images/bgImages/bg11n.jpeg',
  //   "13d": '/images/bgImages/bg13d.jpeg',
  //   "13n": '/images/bgImages/bg13n.jpeg',
  //   "50d": '/images/bgImages/bg50d.jpeg',
  //   "50n": '/images/bgImages/bg50n.jpeg',
  // }


  function getId (id) {
    if(id == "01d") setClase("img1")
    else if(id == "01n") setClase("img2")
    else if(id == "02d") setClase("img3")
    else if(id == "02n") setClase("img4")
    else if(id == "03d") setClase("img5")
    else if(id == "03n") setClase("img6")
    else if(id == "04d") setClase("img7")
    else if(id == "04n") setClase("img8")
    else if(id == "09d") setClase("img9")
    else if(id == "09n") setClase("img10")
    else if(id == "10d") setClase("img11")
    else if(id == "10n") setClase("im12")
    else if(id == "11d") setClase("img13")
    else if(id == "11n") setClase("img14")
    else if(id == "13d") setClase("img15")
    else if(id == "13n") setClase("img16")
    else if(id == "50d") setClase("img17")
    else if(id == "50n") setClase("img18")
  }

  return (
    <div className={`App ${clase} bg-cover min-h-screen grid place-content-center px-2`}>
      
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
