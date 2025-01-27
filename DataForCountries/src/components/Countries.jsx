import Country from "../components/Country"
import { useState } from "react"
const Countries = ({countries}) => {

  const [shownList, setShownList] = useState([])

  const handleShow = (country) => {
    shownList.includes(country) ? setShownList(shownList.filter(c=>c!==country)) : setShownList(shownList.concat(country))
  }
  
  if (countries.length > 10){
    return <p>Too many matches, specify another filter</p>
  }else if (countries.length === 1){
    return <Country country={countries[0]}/>
  }
  else{
    return countries.map(country=>{
      if(shownList.includes(country)){
        return (
          <div key={country.name.common}>
            <p>{country.name.common} <button onClick={()=>handleShow(country)}>hide</button></p>
            <Country country={country}/>
          </div>
        )
      }else{
      return (
        <div key={country.name.common}>
        <p>{country.name.common} <button onClick={()=>handleShow(country)}>show</button></p>
      </div>
      )
    }
  }
  )
  }
}

export default Countries
