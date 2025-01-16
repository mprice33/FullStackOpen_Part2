import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import phoneBookService from './services/Phonebook'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    phoneBookService
      .getAll()
      .then(initialPersonList => {
        setPersons(initialPersonList)
      })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (persons.find(person=>person.name === newName)){
      alert(`${newName} is already added to phonebook`)
    }else{
      let newPerson = { name: newName, number: newNumber }
      phoneBookService.create(newPerson).then(returnedPerson=>{
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const deleteRequest = (event) => {
    const person = persons.find(person=>person.id === event.target.id)
    if (window.confirm(`Delete ${person.name}?`)){
      phoneBookService.deletePerson(event.target.id).then(response=>{
        console.log(response)
        setPersons(persons.filter(person=>person.id !== event.target.id))
      })
    }
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm handleSubmit={handleSubmit} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} deleteRequest={deleteRequest}/>
    </div>
  )
}

export default App