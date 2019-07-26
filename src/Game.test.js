import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import Game from "./Game";


it("renders without crashing", function() {
  shallow(<Game />);
});

it("matches snapshot", function() {
  Math.random = () => 1
  let wrapper = shallow(<Game />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});

it("can lock a die on click", function() {
  let wrapper = mount(<Game />);
  const die = wrapper.find(".Die").first();
  die.simulate("click");

  expect(wrapper.state().locked[0]).toEqual(true);
});

it("can unlock a die on click", function() {
  let wrapper = mount(<Game />);
  const die = wrapper.find(".Die").first();
  die.simulate("click");
  die.simulate("click");

  expect(wrapper.state().locked[0]).toEqual(false);
});

it("can't roll if rollsLeft is equal to 0", function() {
  let wrapper = mount(<Game />);
  let rollButton = wrapper.find('.Game-reroll');

  wrapper.setState({ rollsLeft: 1 });
  rollButton.simulate('click');

  setTimeout(() => {
    expect(wrapper.state().rollsLeft).toEqual(0)
  }, 1001);

  rollButton.simulate('click');
  expect(wrapper.state().rollsLeft).not.toEqual(-1);
});

it("can't reassign score in scoretable", function() {
  let wrapper = mount(<Game />);
  let score = wrapper.find('.RuleRow').first();
  expect(score.hasClass("RuleRow-active")).toBe(true);

  score.simulate('click');

  let currentScore = wrapper.state().scores.ones
  expect(currentScore).not.toBe(undefined);

  score.simulate('click');
  expect(wrapper.state().scores.ones).toBe(currentScore)

  score = wrapper.find('.RuleRow').first();
  expect(score.hasClass("RuleRow-active")).toBe(false);

});