export const REQUEST_APP_DATA = "app/REQUEST_EXAMPLE_DATA";
export const REQUEST_APP_DATA_SUCCESS = "app/REQUEST_APP_DATA_SUCCESS";
export const REQUEST_APP_DATA_FAIL = "app/REQUEST_APP_DATA_FAIL";

export const requestAppData = () => {
  return {
    type: REQUEST_APP_DATA
  } as const;
};

export const requestAppDataSuccess = (data: any) => {
  return {
    type: REQUEST_APP_DATA_SUCCESS,
    value: data
  } as const;
};

export const requestAppDataFail = () => {
  return {
    type: REQUEST_APP_DATA_FAIL
  } as const;
};

export type AppActionTypes = ReturnType<
  | typeof requestAppData
  | typeof requestAppDataSuccess
  | typeof requestAppDataFail
>;
