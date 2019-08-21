import React from "react";
import ReactDOM from "react-dom";
import sinon from "sinon";
import { shallow, mount } from "enzyme";
import App from "./App";
import * as toDoList from "../todolistData.json";
import Form from "./components/Form/Form";

describe("App components", () => {
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
});

describe("App initial state", () => {
  it("renders app with initial state attributes", () => {
    const initialState = {
      term: "",
      items: toDoList.data
    };
    const context = mount(<App />);
    expect(context.state("term")).toBe(initialState.term);
    expect(context.state("items")).toStrictEqual(initialState.items);
  });
});

describe("App on form changes", () => {
  it("calls the onChange method of Form", () => {
    const context = shallow(<App />);

    context.find(Form).simulate("change", { target: { value: "shopping" } });

    expect(context.find(Form).props().value).toBe("shopping");
    expect(context.state("term")).toBe("shopping");
  });

  it("calls the onSubmit method of Form", () => {
    const fakeEvent = { preventDefault: () => console.log("preventDefault") };
    const expectedItemsState = [
      "shopping",
      "cleaning kitchen",
      "watering plants",
      "building bookcase",
      "clean car"
    ];
    const context = shallow(<App />);

    context.find(Form).simulate("change", { target: { value: "clean car" } });

    context.find(Form).simulate("submit", fakeEvent);

    expect(context.state("term")).toBe("");
    expect(context.state("items")).toStrictEqual(expectedItemsState);
  });
});
