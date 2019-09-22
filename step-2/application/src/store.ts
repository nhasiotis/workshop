import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import { commitReducer, ICcommitsState } from "./modules/Commits/reducer";
import rootSaga from "./sagas";

export interface IApplicationState {
  commits: ICcommitsState;
}

const combinedReducers = combineReducers({
  commits: commitReducer
});

const sagaMiddleware = createSagaMiddleware();

let composeEnhancers: any;
if (process.env.NODE_ENV === "development") {
  // @ts-ignore
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
} else {
  composeEnhancers = compose;
}

const store = createStore(
  combinedReducers,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export { store };
