import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount } from "enzyme";
import sinon from "sinon";
import Form from "./Form";
import App from "../../App";

describe("Form", () => {
  const term: string = "";

  it("renders app with one form", () => {
    const context = shallow(
      <Form value={term} onChange={() => {}} onSubmit={() => {}} />
    );
    expect(context.find("form").length).toBe(1);
  });
  it("renders form with one input", () => {
    const context = shallow(
      <Form value={term} onChange={() => {}} onSubmit={() => {}} />
    );
    expect(context.find("input").length).toBe(1);
  });

  it("renders form with one button", () => {
    const context = shallow(
      <Form value={term} onChange={() => {}} onSubmit={() => {}} />
    );
    expect(context.find("button").length).toBe(1);
  });

  it("renders form input with expected value the initial state of term", () => {
    const context = mount(
      <Form value={term} onChange={() => {}} onSubmit={() => {}} />
    );
    expect(context.find("input").props().value).toBe("");
  });

  it("calls the onChange method when input changes", () => {
    const onChange = sinon.spy();
    const context = shallow(
      <Form value={term} onChange={onChange} onSubmit={() => {}} />
    );
    context.find("input").simulate("change");
    expect(onChange).toBeCalled;
  });

  it("calls the onSubmit method", () => {
    const onSubmit = sinon.spy();
    const context = mount(
      <Form value={term} onChange={() => {}} onSubmit={onSubmit} />
    );

    context.find(Form).simulate("submit");
    expect(onSubmit).toBeCalled;
  });
});
