import React from "react";
import List from "./components/List/List";
import Form from "./components/Form/Form";
// import { get } from "../services/api";
import "./App.css";
import { addToDo } from "../state/actions/actions";
import { Item } from "../interfaces/item"
import { connect } from "react-redux";
import { AppState } from "../store";

export interface LocalState {
  errorStatus: string;
}

export interface AppProps {
  items: Item[],
  addToDo: any;
}

export class App extends React.Component<AppProps, LocalState> {
  state: LocalState;

  constructor(props: AppProps) {
    super(props);
    this.state = { errorStatus: "" };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">example todo list</header>
        <Form
          addToDo={this.props.addToDo}
        />
        <List items={this.props.items} />
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    items: state.items
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    addToDo: (value: string) => {
      dispatch(addToDo(value))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

