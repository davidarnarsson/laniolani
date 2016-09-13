import {
  LENDER_ADD,
  LENDER_SET_EDIT,
  LENDER_EDIT,
  MONTH_SET,
  RESULTS_SET,
  INTEREST_SET
} from './constants'

import calculate from './calculator'

function asReactive(fn) {
  return function() {
    let args = arguments, ctx = this; 
    return (dispatch, getState) => {
      dispatch(fn.apply(ctx, args))
      const { lenders, month, interest } = getState();

      calculateResults(lenders, month, interest)
        .then(rs => {
          console.log(rs)
          dispatch(setResults(rs))
        });
    }
  }
}

export const addLender = asReactive((name, amount) => ({ name,  amount, type: LENDER_ADD }));

export const editLender = asReactive((id, name, amount) => ({ id, name, amount, type: LENDER_EDIT }));

export const setEditLender = (id) => {
  console.log("EDITING " + id)
  return {
    type: LENDER_SET_EDIT,
    id
  }
}

export function calculateResults(lenders, months, interest) {
  return calculate(lenders, months, interest)
}

export function setResults(results) {
  return {
    type: RESULTS_SET,
    results
  }
}

export function monthSet(month) {
  return {
    type: MONTH_SET, 
    month
  };
}


export const setMonth = asReactive(monthSet);

export const setInterest = asReactive((interest) => ({ interest, type: INTEREST_SET }))

// export function setMonth(m) {
//   return (dispatch, getState) => {
//     dispatch(monthSet(m));

//     const { lenders, month } = getState();

//     calculateResults(lenders, month)
//       .then(rs => {
//         console.log(rs)
//         dispatch(setResults(rs))
//       })
//   };
// }