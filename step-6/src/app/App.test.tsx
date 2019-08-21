import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount } from "enzyme";
import { App } from "./App";
import ConnectedApp from "./App";
import * as toDoList from "../todolistData.json";
import { AppState } from "../store"
import { Item } from "../interfaces/item";
import configureStore from 'redux-mock-store'
import { Provider } from "react-redux";
import { StatusType, Status } from "../interfaces/status";

const addToDo = jest.fn()
const requestDataFetch = jest.fn()
const state = {items: [], status: {message: "", type: StatusType.SUCCES, visible: false}}

const setUpComponent = (initialState:AppState= state) => {
  const items = initialState.items
  const status = initialState.status
  const wrapper = shallow(<App status={status} requestDataFetch={requestDataFetch} addToDo={addToDo} items={items} />)
  return wrapper;
};

const setUpConnectedComponent = (initialState: AppState=state) => {
  const middlewares:any[] = []
  const mockStore = configureStore(middlewares)
  const store = mockStore(initialState)
  const wrapper = mount(<Provider store={store}><ConnectedApp /></Provider>)
  return wrapper;
};

describe("App components", () => {

  let context:any;

  beforeAll(()=> {
    context = setUpComponent()
  })

  it("renders without crashing", () => {
    const div = document.createElement("div");
    const items:Item[] = []
    const status:Status = {message: "Message", type: StatusType.SUCCES, visible: true}
    ReactDOM.render(<App status={status} requestDataFetch={requestDataFetch} addToDo={addToDo} items={items}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders app with one header", () => {
    // console.log(context.debug())
    expect(context.find("header").length).toBe(1);
  });

  it("renders app with header called example todo list", () => {
    expect(context.find("header").text()).toBe("example todo list");
  });

  it("renders app with a todo list component", () => {
    expect(context.find("List").length).toBe(1);
  });
});

describe("Connected App", () => {
  let context:any;
  let state = {
    items: toDoList.items,
    status: {message: "", type: StatusType.SUCCES, visible: true}
  }

  beforeAll(()=> {
    context = setUpConnectedComponent(state)
  })

  it("Should have the props loaded from the store", () => {
    // console.log(context.debug())
    expect(context.find('App').props().items).toBe(state.items);
  })

})