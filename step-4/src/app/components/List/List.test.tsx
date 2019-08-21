import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount } from "enzyme";
import * as todoList from "../../../todolistData.json";
import List from "./List";

describe("List", () => {
  const listItems: string[] = todoList.data;

  it("renders without crashing a list", () => {
    const div = document.createElement("div");
    ReactDOM.render(<List data={listItems} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders one unordered list", () => {
    const context = shallow(<List data={listItems} />);
    expect(context.find("ul").length).toBe(1);
  });

  it("renders an unordered list with 3 list items", () => {
    const context = shallow(<List data={listItems} />);
    expect(context.find("li").length).toBe(4);
  });

  it("renders a list with receiving prop data", () => {
    const context = mount(<List data={listItems} />);

    expect(context.props().data).toBe(listItems);
  });
});
