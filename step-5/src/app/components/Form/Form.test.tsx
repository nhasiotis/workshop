import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount } from "enzyme";
import sinon from "sinon";
import Form from "./Form";
import App from "../../App";

describe("Form", () => {

  let context: any;
  const addToDo = jest.fn()

  beforeEach(()=> {
    context = shallow(<Form addToDo={addToDo}/>)
  })

  it("renders app with one form", () => {
    expect(context.find("form").length).toBe(1);
  });
  it("renders form with one input", () => {
    expect(context.find("input").length).toBe(1);
  });

  it("renders form with one button", () => {
    expect(context.find("button").length).toBe(1);
  });

  it("renders form input with expected value the initial state of term", () => {
    expect(context.find("input").props().value).toBe("");
  });

  it("calls the onChange method when input changes", () => {
    const onChange = sinon.spy();
    context.find("input").simulate("change", {target: { value: "SomeThing"}});
    expect(onChange).toBeCalled;
  });

  it("renders Form with initial state attributes", () => {
    const initialState = {
      value: "",
    };
    expect(context.state("value")).toBe(initialState.value);
  });

  it("changes state when input is changed", () => {

    context.find('input').simulate("change", { target: { value: "shopping" } });

    expect(context.state("value")).toBe("shopping");
  });

  it("calls the onSubmit method of Form", () => {
    const fakeEvent = { preventDefault: () => {} };

    context.find('input').simulate("change", { target: { value: "clean car" } });
    context.find('form').simulate("submit", fakeEvent);

    expect(context.state("value")).toBe("");
    expect(addToDo).toHaveBeenCalledWith("clean car");
  });

});
