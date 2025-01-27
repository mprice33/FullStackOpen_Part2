import Country from "../components/Country"
const Countries = ({countries}) => {
  console.log(countries)
  if (countries.length > 10){
    return <p>Too many matches, specify another filter</p>
  }else if (countries.length === 1){
    return <Country country={countries[0]}/>
  }
  else{
    return countries.map(country=><p key={country.name.common}>{country.name.common}</p>)
  }
}

export default Countries
