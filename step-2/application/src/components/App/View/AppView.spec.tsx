import { shallow } from "enzyme";
import React from "react";

import { StatusType } from "../../../models/Status/Status";
import { AppView } from "./AppView";

describe("Given AppView", () => {
    describe("when rendering", () => {
        it("should have AppView with alert component and list of scanners matching snapshot", () => {
            const expectedStatusVisible = {
                message: "Data is loaded successfully",
                type: StatusType.SUCCESS,
                visible: true
            };
            const expectedScanners = ["scannerA", "scannerB"];
            const appView = shallow(
                <AppView
                    scanners={expectedScanners}
                    status={expectedStatusVisible}
                />
            );

            expect(appView).toMatchSnapshot();
        });

        it("should have AppView without alert component and empty scanner list matching snapshot", () => {
            const expectedstatusNotVisible = {
                message: "Data is not loaded",
                type: StatusType.ERROR,
                visible: false
            };
            const appView = shallow(
                <AppView scanners={[]} status={expectedstatusNotVisible} />
            );

            expect(appView).toMatchSnapshot();
        });
    });
});
