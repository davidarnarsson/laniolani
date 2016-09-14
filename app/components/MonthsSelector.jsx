import React from 'react'
import { setMonth } from '../actions'
import {connect} from 'react-redux'

const MonthsSelector = ({month, onSelectMonth}) => {
  return (
    <div>
      <h3>Fjöldi mánaða</h3>
      <input className="sm-block" type="number" onChange={e => onSelectMonth(e.target.value)} value={month} />
    </div>
  )
}

const mapState = (state) => {
  return {
    month: state.month
  }
};

const mapDispatch = (dispatch) => {
  return {
    onSelectMonth: month => dispatch(setMonth(month))
  }
}

export default connect(mapState, mapDispatch)(MonthsSelector);