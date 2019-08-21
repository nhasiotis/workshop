import { Item } from "../../interfaces/item";

export const ADD_TODO = 'ADD_TODO';
export const DATA_FETCH_REQUESTED='DATA_FETCH_REQUESTED';
export const DATA_FETCH_SUCCEEDED='DATA_FETCH_SUCCEEDED';
export const DATA_FETCH_FAILED='DATA_FETCH_FAILED';

export interface data {
    items: Item[]
}

export const addToDo = (text: String) => {
    return {type: ADD_TODO, text } as const;
}

export const requestDataFetch = () => {
    return {type: DATA_FETCH_REQUESTED} as const;
}

export const dataFetchSucceeded = (items: Item[]) => {
    return {type: DATA_FETCH_SUCCEEDED, data: items}
}

export const dataFetchFailed = (message: string) => {
    return {type: DATA_FETCH_FAILED, message: message}
}