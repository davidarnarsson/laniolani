import { combineReducers } from 'redux'
import {
  LENDER_REMOVE
  , LENDER_ADD
  , LENDER_EDIT
  , LENDER_SET_EDIT
  , MONTH_SET
  , RESULTS_SET
  , INTEREST_SET
} from './constants'


const createReducer = (initialState, handlers) => (state = initialState, action) => {
  if (handlers[action.type]) {
    return handlers[action.type](state, action);
  }
  return state;
};


let ID = 0; 
const newId = () => (ID++); 

/** Lenders  */
export const LendersDefaultState = [];
const LenderDefaultState = {
  id: newId(),
  name: null,
  amount: 0,
  editing: false
};

const lendersHandlers = {
  [LENDER_ADD]: (state, action) => [...state, lender(state, action)],
  [LENDER_EDIT]: (state, action) => state.map(x => lender(x, action)),
  [LENDER_SET_EDIT]: (state, action) => state.map(x => lender(x, action)),
  [LENDER_REMOVE]: (state, action) => {
    var idx = state.indexOf(state.find(x => x.id === action.id)); 
    
    return [...state.slice(0, idx), ...state.slice(idx + 1)];
  } 
};

const lenders = createReducer(LendersDefaultState, lendersHandlers);

const lenderHandlers = {
  [LENDER_ADD]: (state, action) => Object.assign({}, LenderDefaultState, {
    id: newId(),
    name: action.name,
    amount: +action.amount
  }),
  [LENDER_EDIT]: (state, action) => state.id !== action.id
    ? state
    : Object.assign({}, state, { name: action.name, amount: +action.amount, editing: false }),
  [LENDER_SET_EDIT]: (state, action) => { 
    console.log(state, action)
    return state.id !== action.id 
      ? Object.assign({}, state, { editing: false })
      : Object.assign({}, state, { editing: !state.editing })
    }
};

const lender = createReducer(LenderDefaultState, lenderHandlers);

/** month */

export const MonthDefaultState = 1;

const monthHandler = {
  [MONTH_SET]: (state, action) => +action.month
};

const month = createReducer(MonthDefaultState, monthHandler);

/** results */

export const ResultsDefaultState = []

const resultsHandler = {
  [RESULTS_SET]: (state, action) => action.results
}


const results = createReducer(ResultsDefaultState, resultsHandler)

/** Interest rate */

export const InterestDefaultState = 0.001;

const interestRateHandler = {
  [INTEREST_SET]: (state, action) => action.interest
};

const interest = createReducer(InterestDefaultState, interestRateHandler);

export default combineReducers({
  lenders,
  month,
  results,
  interest
});