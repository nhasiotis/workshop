import { takeLatest, put } from "@redux-saga/core/effects";
import { loading, DataActions } from "./Actions";

function* fetchCommits(action: DataActions) {
  console.log("hello from saga");
}

export const commitsSaga = [takeLatest(loading, fetchCommits)];
