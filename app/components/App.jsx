import React from 'react';
import Lenders from './Lenders'
import MonthsSelector from './MonthsSelector'
import Results from './Results'
import InterestSelector from './InterestSelector'


const App = () => {
  return (
    <div>
      <h1>Lánareikningur!</h1>
      <div className="row">
        <div className="col">
            <Lenders />
        </div>
        <div className="col">
          <div className="row">
            <div className="col">
              <MonthsSelector />
            </div>
            <div className="col">
              <InterestSelector />
            </div>
          </div>
          
        </div>
      </div>
  
      <Results  />
    </div>
  )
};

export default App;