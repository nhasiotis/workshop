import { AppState } from "../../store";

export const getData = (state: AppState) => state.app.data;
