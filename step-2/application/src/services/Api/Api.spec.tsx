import { get } from "./Api";

describe("Given api calls", () => {
    afterAll(() => {
        // @ts-ignore
        window.fetch.mockRestore();
    });

    const expectedData = ["Scanner1", "Scanner2", "Scanner3"];
    const url = "http://test/data";

    describe("with working API", () => {
        beforeEach(() => {
            window.fetch = jest.fn().mockImplementation(() => ({
                status: 200,
                json: () =>
                    new Promise(resolve => {
                        resolve(expectedData);
                    })
            }));
        });

        it("should return a list of scanner ids if status code is 200", async () => {
            const results = await get(url);
            expect(results).toEqual(expectedData);
        });
    });

    describe("with failing API and status code 401", () => {
        beforeEach(() => {
            window.fetch = jest.fn().mockImplementation(() => ({
                status: 401
            }));
        });

        it("should return an error if status code is not ok", () => {
            return expect(get(url)).rejects.toEqual(
                Error("A network error occured")
            );
        });
    });

    describe("with failing API and status code 500", () => {
        beforeEach(() => {
            window.fetch = jest.fn().mockImplementation(() => ({
                status: 500
            }));
        });

        it("should return an error if status code is not ok", () => {
            expect(get(url)).rejects.toEqual(Error("A network error occured"));
        });
    });
});
