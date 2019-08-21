import React from "react";
import { get } from "./api";

describe("apiCalls", () => {

  afterAll(() => {
    window.fetch.mockRestore()
  })

  describe('with working API', () => {

    beforeEach(() => {
      window.fetch = jest.fn().mockImplementation(() => ({
        status: 200,
        json: () =>
          new Promise((resolve, reject) => {
            resolve({
              items: ["shopping", "cleaning"]
            });
          })
      }));
    })
  
  
    it("returns an array of todolists if status code is ok", async () => {
  
      const results = await get("http://test/data")
      expect(results).toEqual({
        items: ["shopping", "cleaning"]
      });
    });
  })

  describe('with failing API', () => {
    beforeEach(() => {
      window.fetch = jest.fn().mockImplementation(() => ({
        status: 500
      }));

    })

    it("throws an error if status code is not ok", () => {
  
      expect(get("http://test/data")).rejects.toEqual(
        Error("A network error occured")
      );
    });

  })

});

