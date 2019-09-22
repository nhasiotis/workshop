import { all } from "@redux-saga/core/effects";
import { commitsSaga } from "./modules/Commits/sagas";

export default function* rootSaga() {
  yield all([...commitsSaga]);
}
