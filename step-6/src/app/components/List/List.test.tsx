import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount } from "enzyme";
import * as todoList from "../../../todolistData.json";
import List from "./List";
import { Item } from "../../../interfaces/item.js";

describe("List", () => {
  const listItems: Item[] = todoList.items;

  it("renders without crashing a list", () => {
    const div = document.createElement("div");
    ReactDOM.render(<List items={listItems} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders one unordered list", () => {
    const context = shallow(<List items={listItems} />);
    expect(context.find("ul").length).toBe(1);
  });

  it("renders an unordered list with 3 list items", () => {
    const context = shallow(<List items={listItems} />);
    expect(context.find("li").length).toBe(4);
  });

  it("renders a list with receiving prop data", () => {
    const context = mount(<List items={listItems} />);

    expect(context.props().items).toBe(listItems);
  });
});
