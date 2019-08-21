import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import App from "./App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders app with one header", () => {
  const context = shallow(<App />);
  expect(context.find("header").length).toBe(1);
});

it("renders app with header called example todo list", () => {
  const context = shallow(<App />);
  expect(context.find("header").text()).toBe("example todo list");
});

it("renders app with a todo list component", () => {
  const context = shallow(<App />);
  expect(context.find("List").length).toBe(1);
});
