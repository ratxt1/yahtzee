import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import ScoreTable from "./ScoreTable";


it("renders without crashing", function() {
  shallow(<ScoreTable doScore={() => {}} scores={{ones: undefined}} />);
});

it("matches snapshot", function() {
  let wrapper = shallow(<ScoreTable doScore={() => {}} scores={{ones: undefined}} />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});