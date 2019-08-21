import React from "react";
import List from "./components/List/List";
import Form from "./components/Form/Form";
import * as todoList from "../todolistData.json";
import "./App.css";

const listItems: string[] = todoList.data;

export interface AppState {
  term: string;
  items: string[];
}

export interface AppProps {}

class App extends React.Component<AppProps, AppState> {
  state: AppState;

  constructor(props: AppProps) {
    super(props);
    this.state = { term: "", items: listItems };
  }

  onChange = (event: any) => {
    this.setState({ term: event.target.value });
  };

  onSubmit = (event: any) => {
    event.preventDefault();
    this.setState({
      term: "",
      items: [...this.state.items, this.state.term]
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">example todo list</header>
        <Form
          value={this.state.term}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
        />
        <List data={this.state.items} />
      </div>
    );
  }
}

export default App;
