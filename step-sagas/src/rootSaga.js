import { fork, all } from "redux-saga/effects";
import appSaga from "./modules/state/sagas";

export default function* rootSaga() {
  yield all([fork(appSaga)]);
}
