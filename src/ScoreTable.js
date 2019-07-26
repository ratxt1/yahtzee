import React, { Component } from 'react';
import './ScoreTable.css';
import {
  ones,
  twos,
  threes,
  fours,
  fives,
  sixes,
  threeOfKind,
  fourOfKind,
  fullHouse,
  smallStraight,
  largeStraight,
  yahtzee,
  chance
} from './Rules';
import RuleColumn from './RuleColumn';


class ScoreTable extends Component {

  render() {
    const { scores, doScore } = this.props;

    const upper = {
      name: "Upper",
      rows: [
        { name: "Ones", score: scores.ones, doScore: () => doScore("ones", ones.evalRoll) },
        { name: "Twos", score: scores.twos, doScore: () => doScore("twos", twos.evalRoll) },
        { name: "Threes", score: scores.threes, doScore: () => doScore("threes", threes.evalRoll) },
        { name: "Fours", score: scores.fours, doScore: () => doScore("fours", fours.evalRoll) },
        { name: "Fives", score: scores.fives, doScore: () => doScore("fives", fives.evalRoll) },
        { name: "Sixes", score: scores.sixes, doScore: () => doScore("sixes", sixes.evalRoll) },
      ],
      diceRolling: this.props.diceRolling
    }

    const lower = {
      name: "Lower",
      rows: [
        { name: "Three of a Kind", score: scores.threeOfKind, doScore: () => doScore("threeOfKind", threeOfKind.evalRoll) },
        { name: "Four of a Kind", score: scores.fourOfKind, doScore: () => doScore("fourOfKind", fourOfKind.evalRoll) },
        { name: "Full House", score: scores.fullHouse, doScore: () => doScore("fullHouse", fullHouse.evalRoll) },
        { name: "Small Straight", score: scores.smallStraight, doScore: () => doScore("smallStraight", smallStraight.evalRoll) },
        { name: "Large Straight", score: scores.largeStraight, doScore: () => doScore("largeStraight", largeStraight.evalRoll) },
        { name: "Yahtzee", score: scores.yahtzee, doScore: () => doScore("yahtzee", yahtzee.evalRoll) },
        { name: "Chance", score: scores.chance, doScore: () => doScore("chance", chance.evalRoll) },
      ],
      diceRolling: this.props.diceRolling
    }

    return (
      <div className="ScoreTable">
        <section className="ScoreTable-section">
          <RuleColumn {...upper} />
        </section>
        <section className="ScoreTable-section ScoreTable-section-lower">
          <RuleColumn {...lower} />
        </section>
        <h3 className="ScoreTable-total"> Total Score: {
          Object.values(scores).reduce((acc, val) => {
            if (val !== undefined) {
              acc += val
            }
            return acc
          }, 0)
        }
        </h3>


      </div>
    )
  }
}

export default ScoreTable;
