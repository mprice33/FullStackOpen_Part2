const Person = ({ person, deleteRequest }) => {
  return <p>{person.name} {person.number} <button id={person.id} onClick={deleteRequest}>delete</button></p>
}

export default Person
