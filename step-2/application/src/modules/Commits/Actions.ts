import { Dispatch } from "redux";
import { GitHubData } from "../../components/App/App";
export const loading = "FetchData_Loading";
export const success = "FetchData_Success";
export const failure = "FetchData_Failure";
export const selectCommitId = "SelectCommitId";

const fetchDataSuccess = (data: GitHubData[]) => {
  return {
    type: success,
    data
  };
};

const fetchDataFailure = (error: String) => {
  return {
    type: "failure",
    error
  };
};

const fetchDataLoading = () => {
  return {
    type: "loading"
  };
};

const setSelectedCommitIdAction = (commitId: string) => {
  return {
    type: selectCommitId,
    commitId
  };
};

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

export const setSelectedCommitId = (dispatch: Dispatch, selectedId: string) => {
  dispatch(setSelectedCommitIdAction(selectedId));
}

export interface DataActions {
    type: string;
    data: GitHubData[];
    commitId: string;
}
