import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import { scannerReducer } from "./modules/Scanner/reducer";
import { statusReducer } from "./modules/Status/StatusReducer";
// import scannerSaga from "./state/sagas/Scanner/ScannerSaga";

export interface AppState {
  scanners: any;
  status: any;
}

const combinedReducers = combineReducers({
  scanners: scannerReducer,
  status: statusReducer
});

const initialState: AppState = {
  scanners: [],
  status: { message: "", type: "success", visible: false }
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

// sagaMiddleware.run(scannerSaga);

export { store };
