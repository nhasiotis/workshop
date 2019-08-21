import { todoReducer , statusReducer} from '.'
import { ADD_TODO , DATA_FETCH_SUCCEEDED, DATA_FETCH_FAILED} from '../actions';
import { Item } from '../../interfaces/item';
import { Status, StatusType, StatusMessage} from '../../interfaces/status'

describe('todoReducer', () => {
  let state:Item[] = []

  describe('addToDo', ()=>{
    let expectedState = [{text: 'SomeThing', completed: false}]
    it('should be able to handle ADD_TODO action', () => {
      let newState = todoReducer(state,{type: ADD_TODO, text: 'SomeThing'})
      expect(newState).toEqual(expectedState)
    });
  })

  describe('dataFetchSucceeded', ()=> {
    const testdata = [
      {text: 'Learn React', completed: false},
      {text: 'Write my test', completed: false},
      {text: 'Write my code', completed: false},
    ]
    it('should load the data into the initial state', ()=> {
      let newState = todoReducer(state, {type: DATA_FETCH_SUCCEEDED, data: testdata })
      expect(newState).toEqual(testdata)
    })

  })

  describe('statusReducer', () => {
    let state:Status = {message: "", type: undefined, visible: false}
    
    describe('dataFetchSucceeded', ()=> {

      it('should have status message and type OK', () => {
        let expectedState:Status = {message: StatusMessage.DATA_LOADED_SUCCESSFULLY, type: StatusType.SUCCESS, visible: true}
        let newState = statusReducer(state, {type: DATA_FETCH_SUCCEEDED, data: {}})
        expect(newState).toEqual(expectedState)
      })
    })

    describe('dataFetchFailed', ()=> {
      const errorMessage = 'SomeError'

      it('should have correct error message and type ERROR', () => {
        let expectedState:Status = {message: StatusMessage.DATA_LOADED_FAILED, type: StatusType.ERROR, visible: true}
        let newState = statusReducer(state, {type: DATA_FETCH_FAILED, errorMessage})
        expect(newState).toEqual(expectedState)
      })
    })


  })

})
