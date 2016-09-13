import React from 'react'
import {format} from '../utils'

const Lender = ({ lender, onChange, onToggleEdit }) => {
  let amountRef, nameRef

  return (
    <li onDoubleClick={e => onToggleEdit(lender.id)}>
      <div  style={{ display: lender.editing ? 'none' : 'block' }} > 
        <div className="lender"> 
          <div className="lender-name">
            {lender.name}
          </div>
          <div className="lender-amount">
            {format(lender.amount)}
          </div>
        </div> 
      </div>
      <form style={{ display: !lender.editing ? 'none' : 'block' }} 
            onSubmit={(e) => { e.preventDefault(); onChange(lender.id, nameRef.value, amountRef.value) } }>
        <span className="inline-inputs"> 
          <input placeholder="Nafn lánadróttins" type="text" defaultValue={lender.name} ref={r => nameRef = r} required="true" />
          <input defaultValue={lender.amount} type="number" placeholder="Upphæð" ref={r => amountRef = r} required="true"  />
          <button type="submit">✓</button>
        </span>
      </form>
    </li>
  )
};

const NewLenderForm = ({ onSubmit }) => {
  let nameRef, amountRef

  return (
    
    <form onSubmit={e => { e.preventDefault(); onSubmit(nameRef.value, amountRef.value) }}>
    <h3>Lánadróttnar</h3>
      <div className="inline-inputs">
        <input type="text" placeholder="Nafn lánadróttins" ref={r => nameRef = r} />
        <input type="number" placeholder="Upphæð" ref={r => amountRef = r} /> 
      </div>
      <div>
        <button type="submit">Bæta við</button>
      </div>
    </form>
  );
};

const Lenders = ({ lenders, onLenderEdit, onNewLender, onToggleEdit }) => {
  return (
    <div className="lenders">
      <ul className="lenders-list">
        {lenders.map(l => <Lender lender={l} key={l.name} onChange={onLenderEdit} onToggleEdit={onToggleEdit} />) }
      </ul>

      <NewLenderForm onSubmit={onNewLender} />
    </div>
  )
};

export default Lenders