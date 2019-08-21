import React from "react";
import List from "./components/List";
import * as todoList from "../todolistData.json";
import "./App.css";

const listItems: string[] = todoList.data;
const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">example todo list</header>
      <List data={listItems} />
    </div>
  );
};

export default App;
