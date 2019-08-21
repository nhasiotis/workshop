import React from "react";
import List from "./components/List/List";
import Form from "./components/Form/Form";
// import { get } from "../services/api";
import { addToDo, requestDataFetch } from "../state/actions";
import { Item } from "../interfaces/item"
import { connect } from "react-redux";
import { AppState } from "../store";
import "./App.css";
import 'antd/dist/antd.css'
import { Alert } from 'antd';
import { Status } from "../interfaces/status";

export interface LocalState {
  errorStatus: string;
}

export interface AppProps {
  items: Item[],
  addToDo: any;
  requestDataFetch: any;
  status: Status;
}

export class App extends React.Component<AppProps, LocalState> {
  state: LocalState;

  constructor(props: AppProps) {
    super(props);
    this.state = { errorStatus: "" };
  }
  
  componentDidMount(){
    this.props.requestDataFetch()
  }
  
  render() {
    return (
      <div className="App">
        {this.props.status.visible ? ( <Alert message={this.props.status.message} type={this.props.status.type} />) : null }
        <header className="App-header">example todo list</header>
        <Form addToDo={this.props.addToDo} />
        <List items={this.props.items} />
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    items: state.items,
    status: state.status
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    addToDo: (value: string) => {
      dispatch(addToDo(value))
    },
    requestDataFetch: () => {
      dispatch(requestDataFetch())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

