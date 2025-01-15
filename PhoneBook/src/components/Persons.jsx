import Person from "./Person"
const Persons = ({persons, newFilter}) => {
  const filteredPersons = persons.filter(person=>(person.number.includes(newFilter) || person.name.toLowerCase().includes(newFilter.toLowerCase())))
  return <div>{filteredPersons.map(person=><Person key={person.name} person={person}/>)}</div>
}

export default Persons