import { mount } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import { StatusType } from "../../../models/Status/Status";
import * as scannerData from "../../../scannerData.json";
import { Actions } from "../../../state/actions/Actions";
import { AppConnected } from "./AppConnected";

const state = {
    scanners: scannerData.scanners,
    status: { message: "Data loaded!", type: StatusType.SUCCESS, visible: true }
};

const store = configureStore()(state);

describe("Given connected app", () => {
    let context: any;
    beforeAll(() => {
        context = mount(
            <Provider store={store}>
                <AppConnected />
            </Provider>
        );
    });

    it("should have the props loaded from the store", () => {
        expect(context.find("App").props().scanners).toBe(state.scanners);
        expect(context.find("App").props().status).toBe(state.status);
    });

    it("should fetch data when requested ", () => {
        const actions = store.getActions();
        expect(actions).toEqual([Actions.FetchData.start()]);
    });
});
