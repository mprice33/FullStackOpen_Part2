import countryService from "../services/Country"
import { useState, useEffect } from "react"

const Country = ({ country }) => {

    const [weather, setWeather] = useState({})
    useEffect(() => {
        countryService.getWeatherByLatLong(country.capitalInfo.latlng[0], country.capitalInfo.latlng[1])
            .then(weather => {
                console.log(weather)
                setWeather(weather)
            })
    }, [country.latlng])

    return <div>
        <h1>{country.name.common}</h1>
        <p>capital: {country.capital[0]}</p>
        <p>area: {country.area}</p>
        <h2>languages:</h2>
        <ul>
            {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
        </ul>
        <img src={country.flags.svg} alt={country.flags.alt} width="200px" />
        <h2>Weather in {country.capital[0]}</h2>
        <p>temperature: {weather.main?.temp} Celsius</p>
        {weather.weather && <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt={weather.weather?.[0].description} />}
        <p>wind: {weather.wind?.speed} m/s</p> 
    </div>
}

export default Country
