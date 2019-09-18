import { Dispatch } from "redux";
import { GitHubData } from "../../components/App/App";
export const loading = "FetchData_Loading";
export const success = "FetchData_Success";
export const failure = "FetchData_Failure";

const fetchDataSuccess = (data: GitHubData[]) => {
  return {
    type: success,
    data
  } as const
};

const fetchDataFailure = (error: string) => {
  return {
    type: failure,
    error
  } as const
};

const fetchDataLoading = () => {
  return {
    type: loading
  } as const
};

const delay = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const fetchData = (dispatch: Dispatch) => {
  // fetch actual data,
  dispatch(fetchDataLoading());
  delay(3000).then(() => {
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
    }
  )
};

export type DataActions = ReturnType<typeof fetchDataSuccess | typeof fetchDataLoading | typeof fetchDataFailure>;
