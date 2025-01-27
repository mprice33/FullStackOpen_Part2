import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'

const getAll = () => {
    const request = axios.get(`${baseUrl}all`)
    return request.then(response => response.data)
  }

const getByPartialName = (name) => {
  const request = axios.get(`${baseUrl}name/${name}`)
  return request.then(response => response.data)
}

const getWeatherByLatLong = (lat, long) => {
  console.log(import.meta.env.VITE_api_key)
  const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${import.meta.env.VITE_api_key}&units=metric`)
  return request.then(response => response.data)
}

export default {getAll, getByPartialName, getWeatherByLatLong}