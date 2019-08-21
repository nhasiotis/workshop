import { ADD_TODO } from "../actions/actions";
import { Item } from "../../interfaces/item";

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
            
        default: 
            return state
    }
}