import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')


  const handleSubmit = (event) => {
    event.preventDefault()
    if (persons.find(person=>person.name === newName)){
      alert(`${newName} is already added to phonebook`)
    }else{
      let newPerson = { name: newName }
      setPersons(persons.concat(newPerson))
      setNewName('')
    }
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <br></br>
      <div>{persons.map(person=><p key={person.name}>{person.name}</p>)}</div>
    </div>
  )
}

export default App