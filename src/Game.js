import React, { Component } from 'react';
import Dice from './Dice';
import ScoreTable from './ScoreTable';
import './Game.css';

const NUM_DICE = 5;
const NUM_ROLLS = 3;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dice: Array
        .from({ length: NUM_DICE })
        .map(d => Math.ceil(Math.random() * 6)),
      locked: Array(NUM_DICE).fill(false),
      rollsLeft: NUM_ROLLS - 1,
      scores: {
        ones: undefined,
        twos: undefined,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        threeOfKind: undefined,
        fourOfKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined,
        chance: undefined
      },
      diceRolling: false
    };
    this.roll = this.roll.bind(this);
    this.doScore = this.doScore.bind(this);
    this.toggleLocked = this.toggleLocked.bind(this);
    this.handleDieRoll = this.handleDieRoll.bind(this);
    this.reset = this.reset.bind(this);
  }

  roll(evt) {
    // roll dice whose indexes are in reroll
    this.setState(st => ({
      dice: st.dice.map(
        (d, i) => st.locked[i] ? d : Math.ceil(Math.random() * 6)),
      locked: st.rollsLeft > 1 ? st.locked : Array(NUM_DICE).fill(true),
      rollsLeft: st.rollsLeft - 1,
      diceRolling: false
    }));
  }

  handleDieRoll(evt) {
    // toggle class to shake die on roll
    this.setState(st => ({
      diceRolling: true
    }));
    setTimeout(this.roll, 500)
  }

  toggleLocked(idx) {
    // toggle whether idx is in locked or not
    this.setState(st => ({
      locked: [
        ...st.locked.slice(0, idx),
        !st.locked[idx],
        ...st.locked.slice(idx + 1)
      ],
    }))
  }

  reset() {
    this.setState({
      dice: Array
        .from({ length: NUM_DICE })
        .map(d => Math.ceil(Math.random() * 6)),
      locked: Array(NUM_DICE).fill(false),
      rollsLeft: NUM_ROLLS - 1,
      scores: {
        ones: undefined,
        twos: undefined,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        threeOfKind: undefined,
        fourOfKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined,
        chance: undefined
      },
      diceRolling: false
    })
  }

  doScore(rulename, ruleFn) {
    // evaluate this ruleFn with the dice and score this rulename
    this.setState(st => ({
      scores: { ...st.scores, [rulename]: ruleFn(this.state.dice) },
      rollsLeft: NUM_ROLLS,
      locked: Array(NUM_DICE).fill(false),
    }));
    this.handleDieRoll();
  }

  render() {
    return (
      <section>
        <div className={this.state.diceRolling ? "Die-shake": ""}>
          <Dice dice={this.state.dice}
            locked={this.state.locked}
            toggleLocked={!this.state.locked.every(x => x) ? this.toggleLocked : () => { }}
          />
        </div>

        <button
          className="Game-reroll"
          disabled={this.state.locked.every(x => x)}
          onClick={this.handleDieRoll}>
          {this.state.rollsLeft} Rerolls Left
        </button>
        <ScoreTable doScore={this.doScore} scores={this.state.scores} diceRolling={this.state.diceRolling} />
        {(Object.values(this.state.scores).every(s => s !== undefined)) ? <button onClick={this.reset}>Play Again?</button> : null}
      </section >
    );
  }
}

export default Game;