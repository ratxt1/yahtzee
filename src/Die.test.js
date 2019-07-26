import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Die from "./Die";


it("renders without crashing", function() {
  shallow(<Die />);
});

it("matches snapshot", function() {
  let wrapper = shallow(<Die />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});