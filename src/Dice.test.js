import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Dice from "./Dice";


it("renders without crashing", function() {
  shallow(<Dice dice={[1,2]} locked={[true, false]} toggleLocked={() => {}} />);
});

it("matches snapshot", function() {
  let wrapper = shallow(<Dice dice={[1,2]} locked={[true, false]} toggleLocked={() => {}} />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});