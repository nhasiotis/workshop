import { ActionState } from "@asml-ui/actions";
import { call, put, takeEvery } from "redux-saga/effects";

import scannerData from "../../../scannerData.json";
import { get } from "../../../services/Api/Api";
import { Actions } from "../../actions/Actions";
import { fetchData, scannerSaga } from "./ScannerSaga";

describe("Given saga", () => {
    const expectedUrl = "http://localhost:3000/scanners";

    describe("scannerSaga", () => {
        it("should call fetchData when receiving STARTED action type", () => {
            const iterator: any = scannerSaga();
            expect(iterator.next().value).toEqual(
                takeEvery(
                    Actions.FetchData.getType(ActionState.Started),
                    fetchData
                )
            );
        });
    });

    describe("fetchData", () => {
        describe("with successfull api call", () => {
            const items = scannerData.scanners;

            it("should go through the saga", () => {
                const iterator = fetchData();
                expect(iterator.next().value).toEqual(call(get, expectedUrl));
                expect(iterator.next(items).value).toEqual(
                    put(Actions.FetchData.storeData(items))
                );
                expect(iterator.next(items).value).toEqual(
                    put(Actions.FetchData.setAsSuccess())
                );
                expect(iterator.next(items).value).toEqual(
                    put(Actions.FetchData.finish())
                );
            });
        });

        describe("with failed api call", () => {
            const err = { message: "SomeError" };

            it("should go through the saga", () => {
                const iterator: any = fetchData();
                expect(iterator.next().value).toEqual(call(get, expectedUrl));
                expect(iterator.throw(err).value).toEqual(
                    put(Actions.FetchData.setAsFailure("SomeError"))
                );
                expect(iterator.next().value).toEqual(
                    put(Actions.FetchData.finish())
                );
            });
        });
    });
});
