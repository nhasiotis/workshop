import { ActionState } from "@asml-ui/actions";
import { AnyAction } from "redux";

import { Actions } from "../../actions/Actions";

export const scannerReducer = (
    state: string[] = [],
    action: AnyAction
): string[] => {
    switch (action.type) {
        case Actions.FetchData.getType(ActionState.StoreData):
            return action.payload;
        default:
            return state;
    }
};
