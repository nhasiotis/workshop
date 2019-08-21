import * as actions from "./actions";
import { Item } from "./types";

export interface AppState {
  data: Item[];
}

const initialState: AppState = {
  data: []
};

export const appReducer = (
  state: AppState = initialState,
  action: actions.AppActionTypes
): AppState => {
  switch (action.type) {
    case actions.REQUEST_APP_DATA:
      return {
        ...state
      };
    case actions.REQUEST_APP_DATA_SUCCESS:
      return {
        ...state,
        data: action.value
      };

    default:
      return state;
  }
};
