import React, {useState, useRef, useEffect} from 'react'
import Hint from './Components/Hint'
import WeatherInfo from './Components/WeatherInfo'
import FormSearch from './Components/FormSearch'
import './App.css'

import { apiKey } from './secrets/config'

const API_KEY = apiKey;

function App(){
  const [state, setState] = useState({
    city: undefined,
    country: undefined,
    temperature: undefined,
    wind: undefined,
    humidity: undefined,
    error: undefined
  })

  const [city, setCity] = useState('')
  const [data, setData] = useState('')

  const inputCityNameRef = useRef(null)

  useEffect(()=>{
    async function fetchApi(){
    let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
    response= await response.json()
    setData(response)
    console.log('Cheking weather in '+city+'...')
    }

    if(city){
      fetchApi()
    }
  } ,[city])

  useEffect(()=>{
    if (data.name === city) {
      setState({
        city: data.name,
        country: data.sys.country,
        temperature: Math.trunc(data.main.temp),
        wind: Math.round((data.wind.speed * 3.6)*100)/100,
        humidity: data.main.humidity,
        error: undefined
      });
    } else {
      setState({
        city: undefined,
        country: undefined,
        temperature: undefined,
        wind: undefined,
        humidity: undefined,
        error: 'City name is incorrect'
      });
    }
  // eslint-disable-next-line
  }, [data])

  useEffect(()=>{
      setState({
        city: undefined,
        country: undefined,
        temperature: undefined,
        wind: undefined,
        humidity: undefined,
        error: ' '
      });
  }, [])

  const getWeather = (event) => {
    event.preventDefault()
    setCity(inputCityNameRef.current.value)
    if(!inputCityNameRef.current.value){
      setState({
        city: undefined,
        country: undefined,
        temperature: undefined,
        wind: undefined,
        humidity: undefined,
        error: 'Please enter city name to check the weather'
      });
    }
  }

    return (
      <div className='field'>
        <Hint></Hint>
        <div className='container'>
          <FormSearch 
            getWeatherByCityName={getWeather} inputCityName={inputCityNameRef}
          ></FormSearch>
          <WeatherInfo 
            city={state.city}
            country={state.country}
            temperature={state.temperature}
            wind={state.wind}
            humidity={state.humidity}
            error={state.error}
          ></WeatherInfo>
        </div>
      </div>
    );
}

export default App;