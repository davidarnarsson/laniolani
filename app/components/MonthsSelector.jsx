import React from 'react'


const MonthsSelector = ({month, onSelectMonth}) => {
  return (
    <div>
      <h3>Fjöldi mánaða</h3>
      <input type="number" onChange={e => onSelectMonth(e.target.value)} value={month} />
    </div>
  )
}


export default MonthsSelector