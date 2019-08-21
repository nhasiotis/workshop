import React from "react";
import "./App.css";
import LoadData from "./containers/LoadData";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">Example</header>
      <LoadData />
    </div>
  );
};

export default App;
