import { ActionState } from "@asml-ui/actions";
import { call, put, takeEvery } from "redux-saga/effects";

import { get } from "../../../services/Api/Api";
import { Actions } from "../../actions/Actions";

export function* fetchData() {
    try {
        const data = yield call(get, "http://localhost:3000/scanners");
        yield put(Actions.FetchData.storeData(data));
        yield put(Actions.FetchData.setAsSuccess());
    } catch (e) {
        yield put(Actions.FetchData.setAsFailure(e.message));
    } finally {
        yield put(Actions.FetchData.finish());
    }
}

/*
  Starts fetchData on each dispatched `START` action.
  Allows concurrent fetches of data.
*/
export function* scannerSaga() {
    yield takeEvery(Actions.FetchData.getType(ActionState.Started), fetchData);
}

export default scannerSaga;
