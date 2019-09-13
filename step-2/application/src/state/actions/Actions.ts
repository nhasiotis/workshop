import { UserAction } from "@asml-ui/actions";

import { ActionType } from "./ActionType";

export const Actions = {
    FetchData: new UserAction({ type: ActionType.FetchData })
};
