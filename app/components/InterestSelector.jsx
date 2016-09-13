import React from 'react'

const InterestSelector = ({ interest, onSetInterest }) => {
  return (
    <div>
      <h3>Vaxtaprósenta</h3>
      <input type="text" value={interest} onChange={e => onSetInterest(e.target.value)} />
    </div>
  );
};

export default InterestSelector