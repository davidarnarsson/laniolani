import React from 'react';
import Lenders from './Lenders'
import MonthsSelector from './MonthsSelector'
import Results from './Results'
import InterestSelector from './InterestSelector'

import {connect} from 'react-redux'


import {
  addLender
  , editLender
  , removeLender
  , setEditLender
  , setMonth
  , setInterest
} from '../actions'

const App = ({ lenders, onLenderEdit, onLenderAdd, onMonth, month, results, interest, onSetInterest, onToggleEdit, onRemoveLender }) => {
  return (
    <div>
      <h1>Lánareikningur!</h1>
      <div className="row">
        <div className="col">
            <Lenders lenders={lenders} onLenderEdit={onLenderEdit} onNewLender={onLenderAdd} onToggleEdit={onToggleEdit} onRemoveLender={onRemoveLender} />
        </div>
        <div className="col">
          <div className="row">
            <div className="col">
              <MonthsSelector onSelectMonth={onMonth} month={month} />
            </div>
            <div className="col">
              <InterestSelector onSetInterest={onSetInterest} interest={interest} />
            </div>
          </div>
          
        </div>
      </div>
  
      
      <Results results={results} lenders={lenders} months={month} />
    </div>
  )
}


const mapState = (state) => {
  return {
    lenders: state.lenders,
    month: state.month,
    interest: state.interest,
    results: state.results
  }
}

const mapDispatch = (dispatch) => {
  return {
    onLenderEdit: (id, name, amount) => dispatch(editLender(id, name, amount)),
    onLenderAdd: (name, amount) => dispatch(addLender(name, amount)),
    onToggleEdit: (id) => dispatch(setEditLender(id)),
    onMonth: (month) => dispatch(setMonth(month)),
    onSetInterest: interest => dispatch(setInterest(interest)),
    onRemoveLender: id => dispatch(removeLender(id))
  }
};

export default connect(mapState, mapDispatch)(App)