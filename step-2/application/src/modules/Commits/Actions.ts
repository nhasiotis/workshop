import { Dispatch } from "redux";
import { GitHubData } from "../../components/App/App";

export const loading = "FetchData_Loading";
export const success = "FetchData_Success";
export const failure = "FetchData_Failure";

export enum Status {
  loading,
  success,
  failure
}

const fetchDataResult = (type: Status, data: GitHubData[], error: string) => {
  return {
    type: type,
    data: data,
    error: error
  };
};

export const fetchData = (dispatch: Dispatch) => {
  // fetch actial data,
  dispatch(fetchDataResult(Status.loading, [], ''));
  return setTimeout(() => {
    fetch("https://api.github.com/users/LesleyMerks/events")
      .then(data => {
        if (Math.random() > 0.5) {
          var p = new Promise<Response>((_, reject) => { reject(); });
          return p;
        }
        return data.json();
      })
      .then(
        (data: GitHubData[]) => {
          dispatch(fetchDataResult(Status.success, data, ''));
        },
        error => {
          dispatch(fetchDataResult(Status.failure, [], 'Alerting is not supported in this alert.'));
        }
      )
      .catch(() => {
        console.log("network error");
      });
  }, 2000);

};

export type DataActions = ReturnType<typeof fetchDataResult>;
