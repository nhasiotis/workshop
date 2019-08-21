import { ADD_TODO,DATA_FETCH_SUCCEEDED, DATA_FETCH_FAILED } from "../actions";
import { Item } from "../../interfaces/item";
import { Status, StatusMessage, StatusType } from "../../interfaces/status";

export const todoReducer = (state: Item[] = [], action: any): Item[]=> {
    switch(action.type){ 
        case ADD_TODO:
            return [
                ...state,
                {
                    text: action.text,
                    completed: false
                }
            ]
            
        case DATA_FETCH_SUCCEEDED:
            return action.data
        default: 
            return state
    }
}

export const statusReducer = (state: Status = {message: "", type: StatusType.SUCCESS, visible: false}, action: any): Status => {
    switch(action.type){
        case DATA_FETCH_SUCCEEDED:
            return {message: StatusMessage.DATA_LOADED_SUCCESSFULLY,type: StatusType.SUCCESS, visible: true}
        case DATA_FETCH_FAILED:
            return {message: StatusMessage.DATA_LOADED_FAILED, type: StatusType.ERROR, visible: true}
        default: 
            return state
    }
}