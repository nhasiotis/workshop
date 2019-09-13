import { Actions } from "../../actions/Actions";
import { scannerReducer } from "./ScannerReducer";

describe("Given scanner reducer", () => {
    const state: string[] = [];
    const UNDEFINED_TYPE = "undefined";

    describe("when data fetch is succeeded", () => {
        const expectedData = ["scanner 1", "scanner 2", "scanner 3"];

        it("should load the data into the initial state", () => {
            const action = Actions.FetchData.storeData(expectedData);
            const newState = scannerReducer(state, action);
            expect(newState).toEqual(expectedData);
        });
    });

    describe("when action type is default", () => {
        it("should return the initial state", () => {
            const newState = scannerReducer(state, {
                type: UNDEFINED_TYPE
            });
            expect(newState).toEqual(state);
        });
    });
});
