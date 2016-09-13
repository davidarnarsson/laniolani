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
              <td>{format(r.total)}</td>
              <td>{format(r.total - monthlySumWithoutInterest)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={1 + lenders.length}></td>
            <td>Samtals</td>
            <td>{format(sum)}</td>
          </tr>
          <tr>
            <td colSpan={1 + lenders.length}></td>
            <td>Án vaxta</td>
            <td>{format(sumWithoutInterest)}</td>
          </tr>
          <tr>
            <td colSpan={1 + lenders.length}></td>
            <td>Samtals vextir:</td>
            <td>{format(sum - sumWithoutInterest)}</td>
          </tr>
        </tfoot>
      </table>

    </div>
    
  )
}

export default Results