import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'
import countryService from './services/Country'


const App = () => {
  const [country, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    countryService
      .getAll()
      .then(intialCountryList => {
        setCountries(intialCountryList)
      })
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    setFilteredCountries(country.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  return (
    <div>
      <p>find a country</p>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <Countries countries={filteredCountries} newFilter={newFilter}/>
    </div>
  )
}

export default App