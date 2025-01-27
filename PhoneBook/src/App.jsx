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
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    phoneBookService
      .getAll()
      .then(initialPersonList => {
        setPersons(initialPersonList)
      })
  }, [])


  const Notification = ({ message }) => {
    let errorStyle = {
      'color': 'green',
      'background': 'lightgrey',
      'fontSize': '20px',
      'borderStyle': 'solid',
      'borderRadius': '5px',
      'padding': '10px',
      'marginBottom': '10px'
    }
    if(error){
      errorStyle = {
        'color': 'red',
        'background': 'lightgrey',
        'fontSize': '20px',
        'borderStyle': 'solid',
        'borderRadius': '5px',
        'padding': '10px',
        'marginBottom': '10px'
      }
    }
    if (message === null || message === '') {
      return null
    }
  
    return (
      <div style={errorStyle}>
        {message}
      </div>
    )
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (persons.find(person=>person.name === newName)){
      if (window.confirm(`${newName} is already added to the phonebook. replace the old number with a new one?`)){
        const person = persons.find(person=>person.name === newName)
        const updatedPerson = { ...person, number: newNumber }
        phoneBookService.updatePerson(person.id, updatedPerson).then(returnedPerson=>{
          setError(false)
          setMessage(
            `Person '${returnedPerson.name}' was updated in the phonebook`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setPersons(persons.map(person=>person.id !== returnedPerson.id ? person : returnedPerson))
          setNewName('')
          setNewNumber('')
        }).catch(error => {
          setError(true)
          setMessage(
            `Information of '${updatedPerson.name}' has already been removed from server`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
      }
    }else{
      let newPerson = { name: newName, number: newNumber }
      phoneBookService.create(newPerson).then(returnedPerson=>{
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setError(false)
        setMessage(
          `Added '${returnedPerson.name}'`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
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
      <Notification message={message} />
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