import { all, takeEvery, put } from "redux-saga/effects";
import * as api from "../../services/api";
import * as actions from "./actions";

function* requestData() {
  const apiResponse = yield api.get("http://localhost:3000/kitties");
  if (!apiResponse.length) {
    yield put(actions.requestAppDataFail());
  } else {
    yield put(actions.requestAppDataSuccess(apiResponse));
  }
}

export default function* appSaga() {
  yield all([takeEvery(actions.REQUEST_APP_DATA, requestData)]);
}
