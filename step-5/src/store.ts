import { todoReducer } from './state/reducers/reducers'
import { combineReducers, createStore } from 'redux';
import { Item } from './interfaces/item'

export interface AppState {
  items: Item[]
}

const combinedReducers = combineReducers({
     items: todoReducer
})

const initialState: AppState = {
    items: []
}

export const rootReducer = (state: AppState = initialState, action: any) => {
    return combinedReducers(state, action);
}

let store: any;
// console.log('NODE_ENV',process.env.NODE_ENV) 
if (process.env.NODE_ENV === "development") {
  // @ts-ignore
  store = createStore(rootReducer, /* preloadedState , */ window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
} else {
  store = createStore(rootReducer)
}

export { store }