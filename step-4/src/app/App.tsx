import React from "react";
import List from "./components/List/List";
import Form from "./components/Form/Form";
import { get } from "../services/api";
import "./App.css";

export interface AppState {
  term: string;
  items: string[];
  errorStatus: string;
}

export interface AppProps {}

class App extends React.Component<AppProps, AppState> {
  state: AppState;

  constructor(props: AppProps) {
    super(props);
    this.state = { term: "", items: [], errorStatus: "" };
  }

  async componentDidMount() {
    try {
      const data:any = await this.getData();
      this.setState({ items: data })
      return 
    } catch (err) {
      this.setState({ errorStatus: err.message });
    }
  }

  getData = async () => {
    try {
      const response = await get("http://localhost:3000/data");
      return await response;
    } catch (error) {
      this.setState({ errorStatus: error.message });
    }
  };

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
