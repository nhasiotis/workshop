import "antd/dist/antd.css";

import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Actions } from "../../../state/actions/Actions";
import { AppState } from "../../../store";
import { App } from "../Container/App";

const mapStateToProps = (state: AppState) => {
    return {
        scanners: state.scanners,
        status: state.status
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        requestDataFetch: () => {
            dispatch(Actions.FetchData.start());
        }
    };
};

const AppConnected = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export { AppConnected };
