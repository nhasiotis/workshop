import { todoReducer , statusReducer} from './state/reducers'
import { combineReducers, createStore , applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga'
import mySaga from './state/sagas'

import { Item } from './interfaces/item'
import { Status, StatusType } from './interfaces/status';

export interface AppState {
  items: Item[]
  status: Status
}

const combinedReducers = combineReducers({
     items: todoReducer,
     status: statusReducer
})

const initialState: AppState = {
    items: [],
    status: {message: "", type: StatusType.SUCCESS, visible: false}
}

export const rootReducer = (state: AppState = initialState, action: any) => {
    return combinedReducers(state, action);
}

const sagaMiddleware = createSagaMiddleware()

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

sagaMiddleware.run(mySaga)

export { store }