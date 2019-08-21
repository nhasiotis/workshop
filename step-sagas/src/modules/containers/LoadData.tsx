import React from "react";
import { connect } from "react-redux";
import { AppState } from "../../store";
import { requestAppData } from "../state/actions";
import { getData } from "../state/selectors";
import { Item } from "../state/types";
import "./LoadData.css";

export interface LoadDataProps {
  requestAppData: typeof requestAppData;
  data: Item[];
}

const LoadData = ({ requestAppData, data }: LoadDataProps) => {
  return (
    <>
      <div className="App-load-data">
        <span className="App-span-label">Load example data</span>
        <button className="App-button" onClick={requestAppData}>
          Load Data
        </button>
      </div>
      <div>
        {data &&
          data.map(item => (
            <div className="App-data-list">
              <div className="App-data-list">{item.name}</div>
              <div className="App-data-item">{item.price}</div>
            </div>
          ))}
      </div>
    </>
  );
};

const mapStateToProps = (state: AppState) => {
  return { data: getData(state) };
};

const mapDispatchToProps = {
  requestAppData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoadData);
