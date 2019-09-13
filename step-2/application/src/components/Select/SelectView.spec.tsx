import { shallow } from "enzyme";
import React from "react";

import * as scannerData from "../../scannerData.json";
import SelectView from "./SelectView";

describe("Given SelectView", () => {
  describe("when rendering", () => {
    const items: string[] = scannerData.scanners;
    const id = "testId";

    it("should have select component with id and empty list of options matching snapshot", () => {
      const component = shallow(<SelectView items={[]} id={id} />);
      expect(component).toMatchSnapshot();
    });

    it("should have select component with id and list with 5 options matching snapshot", () => {
      const component = shallow(<SelectView items={items} id={id} />);
      expect(component).toMatchSnapshot();
    });
  });
});
