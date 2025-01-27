const Country = ({ country }) => {
    return <div>
        <h1>{country.name.common}</h1>
        <p>capital: {country.capital[0]}</p>
        <p>area: {country.area}</p>
        <h2>languages:</h2>
        <ul>
            {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
        </ul>
        <img src={country.flags.svg} alt={country.flags.alt} width="200px" />
    </div>
}

export default Country
