import { takeLatest, put, call } from "@redux-saga/core/effects";
import {
  loading,
  DataActions,
  fetchDataSuccess,
  fetchDataFailure
} from "./Actions";

const fetchData = (url: string) => {
  return fetch(url).then(data => {
    return data.json();
  });
};

function* fetchCommits(action: DataActions) {
  try {
    const response = yield call(
      fetchData,
      "https://api.github.com/users/LesleyMerks/events"
    );

    yield put(fetchDataSuccess(response));
  } catch (error) {
    yield put(fetchDataFailure(error));
  }
}

export const commitsSaga = [takeLatest(loading, fetchCommits)];
