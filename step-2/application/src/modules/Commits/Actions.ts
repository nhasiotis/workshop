import { Dispatch } from "redux";
import { GitHubData } from "../../components/App/App";

export const loading = "FetchData_Loading";
export const success = "FetchData_Success";
export const failure = "FetchData_Failure";
export const setId = "Set_Selected_Id";

const fetchDataSuccess = (data: GitHubData[]) => {
  return {
    type: success,
    data
  } as const;
};

const fetchDataFailure = (error: string) => {
  return {
    type: failure,
    error
  } as const;
};

const fetchDataLoading = () => {
  return {
    type: loading
  } as const;
};

const setSelectedId = (id: string) => {
  return {
    type: setId,
    selectedId: id
  } as const;
};

export const fetchData = (dispatch: Dispatch) => {
  // fetch actual data,
  dispatch(fetchDataLoading());
  return fetch("https://api.github.com/users/LesleyMerks/events")
    .then(data => {
      return data.json();
    })
    .then(
      (data: GitHubData[]) => {
        dispatch(fetchDataSuccess(data));
      },
      error => {
        dispatch(fetchDataFailure(error));
      }
    )
    .catch(error => {
      dispatch(fetchDataFailure(error));
      console.log("network error");
    });
};

export const setSelectedCommitId = (dispatch: Dispatch, selectedId: string) => {
  dispatch(setSelectedId(selectedId));
};

export type DataActions = ReturnType<
  | typeof fetchDataSuccess
  | typeof setSelectedId
  | typeof fetchDataFailure
  | typeof fetchDataLoading
>;
