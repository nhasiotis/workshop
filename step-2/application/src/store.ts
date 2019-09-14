import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import { commitReducer } from "./modules/Commits/reducer";
import { GithubCommit } from "./components/App/App";

// import scannerSaga from "./state/sagas/Scanner/ScannerSaga";

export interface AppState {
  commits: GithubCommit[];
}

const combinedReducers = combineReducers({
  commits: commitReducer
});

const initialState: AppState = {
  commits: []
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
