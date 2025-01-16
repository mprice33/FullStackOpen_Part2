import Person from "./Person"
const Persons = ({persons, newFilter, deleteRequest}) => {
  const filteredPersons = persons.filter(person=>(person.number.includes(newFilter) || person.name.toLowerCase().includes(newFilter.toLowerCase())))
  return <div>{filteredPersons.map(person=><Person key={person.name} person={person} deleteRequest={deleteRequest}/>)}</div>
}

export default Persons