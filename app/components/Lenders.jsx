import React from 'react'
import {format} from '../utils'
import {connect} from 'react-redux'
import { addLender, editLender, removeLender, setEditLender } from '../actions'

const Lender = ({ lender, onChange, onToggleEdit, onRemoveLender }) => {
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
          <button className="remove-lender" onClick={_ => onRemoveLender(lender.id)}>&times;</button>
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
    
    <form onSubmit={e => { e.preventDefault(); onSubmit(nameRef.value, amountRef.value); e.target.reset(); }}>
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

const Lenders = ({ lenders, onLenderEdit, onNewLender, onToggleEdit, onRemoveLender }) => {
  return (
    <div className="lenders">
      <NewLenderForm onSubmit={onNewLender} />

      <div className="box">
        <h3>Skráðir lánadróttnar</h3>
        <ul className="lenders-list">
          {lenders.map(l => <Lender lender={l} key={l.name} onChange={onLenderEdit} onToggleEdit={onToggleEdit} onRemoveLender={onRemoveLender} />) }
        </ul>
      </div>
    </div>
  )
};

const mapState = (state) => {
  return {
    lenders: state.lenders
  }
};

const mapDispatch = (dispatch) => {
  return {
    onLenderEdit: (id, name, amount) => dispatch(editLender(id, name, amount)),
    onNewLender: (name, amount) => dispatch(addLender(name, amount)),
    onToggleEdit: (id) => dispatch(setEditLender(id)),
    onRemoveLender: id => dispatch(removeLender(id))
  }
} 

export default connect(mapState, mapDispatch)(Lenders)