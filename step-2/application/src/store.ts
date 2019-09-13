import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import { Status, StatusType } from "./models/Status/Status";
import { scannerReducer } from "./state/reducers/Scanner/ScannerReducer";
import { statusReducer } from "./state/reducers/Status/StatusReducer";
import scannerSaga from "./state/sagas/Scanner/ScannerSaga";

export interface AppState {
    scanners: string[];
    status: Status;
}

const combinedReducers = combineReducers({
    scanners: scannerReducer,
    status: statusReducer
});

const initialState: AppState = {
    scanners: [],
    status: { message: "", type: StatusType.SUCCESS, visible: false }
};

export const rootReducer = (state: AppState = initialState, action: any) => {
    return combinedReducers(state, action);
};

const sagaMiddleware = createSagaMiddleware();

let composeEnhancers: any;
if (process.env.NODE_ENV === "development") {
    // @ts-ignore
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
} else {
    composeEnhancers = compose;
}

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(scannerSaga);

export { store };
