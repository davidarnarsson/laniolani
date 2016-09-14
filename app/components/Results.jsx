import React from 'react'
import {format} from '../utils'


const Results = ({ results, lenders, months }) => {
  const sumWithoutInterest = lenders.reduce((s, l) => s + l.amount, 0);

  const monthlySumWithoutInterest = sumWithoutInterest / months;

  const sum = results.reduce((s, r) => s + r.total, 0)

  if (results.length === 0) {
    return (<strong className="no-results">Engar niðurstöður til að birta enn sem komið er, endilega fikta meira!</strong>)
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Mánuður</th>
            {lenders.map(l => <th key={l.name}>{l.name}</th>)}
            <th>Samtala mánaðar</th>
            <th>Vextir í mánuði</th>
          </tr>
        </thead>
        <tbody> 

          {results.map((r, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              {r.breakdown.map(b => (<td key={b.name}>{format(b.amount)}</td>))}
              <td className="totals">{format(r.total)}</td>
              <td>{format(r.total - monthlySumWithoutInterest)}</td>
            </tr>
          ))}

        </tbody>
      </table>

      <ul className="totals">
        <li> <strong>Samtals</strong> <span className="amt">{format(sum)}</span></li>
        <li> <strong>Án vaxta</strong> <span className="amt">{format(sumWithoutInterest)}</span></li>
        <li> <strong>Samtals vextir</strong> <span className="amt">{format(sum - sumWithoutInterest)}</span></li>
      </ul>


    </div>
    
  )
}

export default Results