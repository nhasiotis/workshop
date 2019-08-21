import { applyMiddleware, createStore, combineReducers, compose } from "redux";
import CreateSagaMiddleware from "redux-saga";
import { persistReducer, persistStore } from "redux-persist";
import thunkMiddleware from "redux-thunk";
import storage from "redux-persist/lib/storage";
import rootSaga from "./rootSaga";

import { appReducer, AppState } from "./modules/state/reducer";

export interface AppState {
  app: AppState;
}

const persistConfig = {
  key: "root",
  storage
};

const rootReducer = (state: any, action: any) => {
  return combinedReducers(state, action);
};

const sagaMiddleware = CreateSagaMiddleware();

const combinedReducers = combineReducers({
  app: appReducer
});

let composeEnhancers: any;
if (process.env.NODE_ENV === "development") {
  // @ts-ignore
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
} else {
  composeEnhancers = compose;
}

export const createNewStore = () => {
  return createStore(
    persistReducer(persistConfig, rootReducer),
    composeEnhancers(applyMiddleware(thunkMiddleware, sagaMiddleware))
  );
};

const store = createNewStore();

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
