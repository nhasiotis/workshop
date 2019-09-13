import { Status, StatusMessage, StatusType } from "../../../models/Status/Status";
import { Actions } from "../../actions/Actions";
import { statusReducer } from "./StatusReducer";

describe("Given status reducer", () => {
    const state: Status = { message: "", type: undefined, visible: false };
    const UNDEFINED_TYPE = "undefined";

    describe("when data fetch is succeeded", () => {
        it("should have status message and type OK", () => {
            const expectedState: Status = {
                message: StatusMessage.DATA_LOADED_SUCCESSFULLY,
                type: StatusType.SUCCESS,
                visible: true
            };
            const action = Actions.FetchData.setAsSuccess(
                StatusMessage.DATA_LOADED_SUCCESSFULLY
            );
            const newState = statusReducer(state, action);
            expect(newState).toEqual(expectedState);
        });
    });

    describe("when data fetch has failed", () => {
        it("should have correct error message and type ERROR", () => {
            const expectedState: Status = {
                message: StatusMessage.DATA_LOADED_FAILED,
                type: StatusType.ERROR,
                visible: true
            };
            const action = Actions.FetchData.setAsFailure(
                StatusMessage.DATA_LOADED_FAILED
            );
            const newState = statusReducer(state, action);
            expect(newState).toEqual(expectedState);
        });
    });

    describe("when action type is default", () => {
        it("should return the initial state", () => {
            const newState = statusReducer(state, {
                type: UNDEFINED_TYPE
            });
            expect(newState).toEqual(state);
        });
    });
});
