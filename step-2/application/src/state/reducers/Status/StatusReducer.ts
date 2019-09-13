import { ActionState } from "@asml-ui/actions";
import { AnyAction } from "redux";

import { Status, StatusMessage, StatusType } from "../../../models/Status/Status";
import { Actions } from "../../actions/Actions";

export const statusReducer = (
    state: Status = { message: "", type: StatusType.SUCCESS, visible: false },
    action: AnyAction
): Status => {
    switch (action.type) {
        case Actions.FetchData.getType(ActionState.Succeed):
            return {
                message: StatusMessage.DATA_LOADED_SUCCESSFULLY,
                type: StatusType.SUCCESS,
                visible: true
            };
        case Actions.FetchData.getType(ActionState.Failed):
            return {
                message: StatusMessage.DATA_LOADED_FAILED,
                type: StatusType.ERROR,
                visible: true
            };
        default:
            return state;
    }
};
