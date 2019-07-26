import React, { Component } from 'react';
import './RuleColumn.css'
import RuleRow from './RuleRow'

class RuleColumn extends Component {
  render() {
    return (
      <div>
        <h2>{this.props.name}</h2>
        <table cellSpacing="0">
          <tbody>
            {this.props.rows.map(row => {
              return <RuleRow
                name={row.name}
                score={row.score}
                doScore={row.doScore}
                diceRolling={this.props.diceRolling}
              />
            })}
            <tr className="RuleColumn-total">
              <td className="RuleColumn-total-name">Total</td>
              <td className="RuleColumn-total-score">
                {this.props.rows.reduce((acc, row) => {
                  if (row.score !== undefined) {
                    acc += row.score
                  }
                  return acc
                }, 0)
                }
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default RuleColumn;