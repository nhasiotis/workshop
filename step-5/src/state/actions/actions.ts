export const ADD_TODO = 'ADD_TODO';

export const addToDo = (text: String) => {
    return {type: ADD_TODO, text } as const;
}