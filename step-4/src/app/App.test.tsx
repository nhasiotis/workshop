import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import App from "./App";
import * as toDoList from "../todolistData.json";
import Form from "./components/Form/Form";

describe("App components", () => {
  let context:any

  beforeEach(() => {
    context = shallow(<App />)
  })

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders app with one header", () => {
    expect(context.find("header").length).toBe(1);
  });

  it("renders app with header called example todo list", () => {
    expect(context.find("header").text()).toBe("example todo list");
  });

  it("renders app with a todo list component", () => {
    expect(context.find("List").length).toBe(1);
  });
});

describe("App initial state", () => {
  let promise:any

  beforeEach(() => {
    const mockData = toDoList.data
    promise = Promise.resolve(mockData)
    window.fetch = jest.fn().mockImplementation(() => ({
      status: 200,
      json: () =>
        promise
    }));
  })

  afterEach(() => {
    window.fetch.mockRestore()
  })

  it("renders app with initial state attributes", async () => {
    const initialState = {
      term: "",
      items: toDoList.data
    };
    
    const context = shallow(<App />);
    await context.instance().componentDidMount();
    expect(context.state("term")).toBe(initialState.term);
    expect(context.state("items")).toStrictEqual(initialState.items);
  });
});

describe("App on form changes", () => {
  let context:any

  beforeEach(() => {
    context = shallow(<App />)
  })

  it("calls the onChange method of Form", () => {

    context.find(Form).simulate("change", { target: { value: "shopping" } });

    expect(context.find(Form).props().value).toBe("shopping");
    expect(context.state("term")).toBe("shopping");
  });

  it("calls the onSubmit method of Form", () => {
    const fakeEvent = { preventDefault: () => {}};

    context.find(Form).simulate("change", { target: { value: "clean car" } });

    context.find(Form).simulate("submit", fakeEvent);

    expect(context.state("term")).toBe("");
  });
});

describe("App on asychronous call", () => {
  let wrapper: any;

  beforeAll(() => {
    window.fetch = jest.fn();
  });

  beforeEach(() => {
    wrapper = shallow(<App />, { disableLifecycleMethods: true });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("triggers on componentDidMount the fetch call", async () => {
    const spyDidMount = jest.spyOn(App.prototype, "componentDidMount");
    //@ts-ignore
    fetch.mockImplementation(() => {
      return Promise.resolve({
        status: 200,
        json: () => {
          return Promise.resolve(["shopping", "cleaning"]);
        }
      });
    });

    await wrapper.instance().componentDidMount();

    expect(spyDidMount).toHaveBeenCalled();
  });
});