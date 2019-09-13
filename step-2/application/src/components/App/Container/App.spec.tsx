import { shallow, ShallowWrapper } from "enzyme";
import React from "react";

import { StatusType } from "../../../models/Status/Status";
import { AppView } from "../View/AppView";
import { App } from "./App";

describe("Given an App", () => {
    let component: ShallowWrapper;
    const requestDataFetch = jest.fn();
    const scanners = ["scannerA", "scannerB"];
    const status = {
        message: "Data loaded!",
        type: StatusType.SUCCESS,
        visible: true
    };

    beforeEach(() => {
        requestDataFetch.mockClear();
        component = shallow(
            <App
                scanners={scanners}
                requestDataFetch={requestDataFetch}
                status={status}
            />
        );
    });

    describe("when rendering", () => {
        it("should call on fetch data listener", () => {
            expect(requestDataFetch).toHaveBeenCalled();
        });

        it("should propagate props to view", () => {
            const actual = component.find(AppView).props();
            const expected = { scanners, status };
            expect(actual).toMatchObject(expected);
        });
    });
});
