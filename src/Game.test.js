import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import Game from "./Game";


it("renders without crashing", function() {
  shallow(<Game />);
});

it("matches snapshot", function() {
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

it("can't roll if rollsLeft is equal to 0", function() {
  let wrapper = mount(<Game />);
  wrapper.setState({ rollsLeft: 0 });
  wrapper.instance().roll();
 
  expect(wrapper.state().rollsLeft).toEqual(0);
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