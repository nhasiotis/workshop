import { Dispatch } from "redux";
import { GitHubData } from "../../components/App/App";
export const loading = "FetchData_Loading";
export const success = "FetchData_Success";
export const failure = "FetchData_Failure";
export const setId = "setSelectedId";

export type DataSuccess = {
  type: string;
  data: GitHubData[];
}

export type SetId = {
  type: string;
  id: string;
}

const fetchDataSuccess = (data: GitHubData[]) => {
  return {
    type: success,
    data
  } as DataSuccess;
};

const fetchDataFailure = (error: String) => {
  return {
    type: failure,
    error
  };
};

const fetchDataLoading = () => {
  return {
    type: loading
  };
};

const setSelectedId = (id: string) => {
  return {
    type: setId,
    id
  } as SetId;
}

export const fetchData = (dispatch: Dispatch) => {
  // fetch actial data,
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
    .catch(() => {
      console.log("network error");
    });
};

export const setSelectedCommitId = (dispatch: Dispatch, id: string) => {
  dispatch(setSelectedId(id));
};
