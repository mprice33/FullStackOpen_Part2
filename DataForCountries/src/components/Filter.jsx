const Filter = ({newFilter, handleFilterChange}) => {
    return (
      <div><input value={newFilter} onChange={handleFilterChange} /> </div>
    )
  }

export default Filter