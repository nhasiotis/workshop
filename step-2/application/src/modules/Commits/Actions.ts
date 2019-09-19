import { Dispatch } from "redux";
import { GitHubData } from "../../components/App/App";

export const loading = "FetchData_Loading";
export const success = "FetchData_Success";
export const failure = "FetchData_Failure";
export const select = "Select";

const fetchDataSuccess = (data: GitHubData[], cid: string[]) => {
  return {
    type: success,
    data,
    cid
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


const setCommitIds = (cid: string) => {
  return {
    type: select,
    cid
  }
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
        dispatch(fetchDataSuccess(data, data.flatMap(abc => abc.payload.commits).filter(a => a != undefined).flatMap(ab => ab.sha)));
      },
      error => {
        dispatch(fetchDataFailure(error));
      }
    )
    .catch(() => {
      console.log("network error");
    });
};

export const setSelectedCommitId = (dispatch: Dispatch, id: string) =>{
  dispatch(setCommitIds(id));
}


export type DataActions = ReturnType<typeof fetchDataSuccess>;
export type OtherActions = ReturnType<typeof setCommitIds>;

