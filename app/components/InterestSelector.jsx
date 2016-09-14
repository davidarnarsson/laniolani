import React from 'react'
import { connect } from 'react-redux'
import { setInterest } from '../actions'

const InterestSelector = ({ interest, onSetInterest }) => {
  return (
    <div>
      <h3>Vaxtaprósenta</h3>
      <input className="sm-block" type="text" value={interest} onChange={e => onSetInterest(e.target.value)} />
    </div>
  );
};

const mapState = (state) => {
  return {
    interest: state.interest
  }
};

const mapDispatch = (dispatch) => {
  return {
    onSetInterest: interest => dispatch(setInterest(interest))
  }
}

export default connect(mapState, mapDispatch)(InterestSelector);