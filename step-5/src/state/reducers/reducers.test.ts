import { todoReducer } from './reducers'
import { ADD_TODO } from '../actions/actions';

describe('todoReducer', () => {
  let state = []
  let expectedState = [{text: 'SomeThing', completed: false}]
  it('should be able to handle ADD_TODO action', () => {
    let newState = todoReducer(state,{type: ADD_TODO, text: 'SomeThing'})
    expect(newState).toEqual(expectedState)
  });
})