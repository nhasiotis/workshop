import { GithubCommit } from "../../components/App/App";
import {
  DataActions,
  success,
  loading,
  failure,
  setId
} from "../../modules/Commits/Actions";
import { GitHubData } from "../../components/App/App";

const filterCommitsPerEvent = (data: GitHubData[]) => {
  return data.reduce(
    (acc, cur) => {
      if (cur.payload.commits && cur.payload.commits.length > 0) {
        cur.payload.commits.forEach(commit => {
          acc.push(commit);
        });
      }
      return acc;
    },
    [] as GithubCommit[]
  );
};

const getSelectedCommitIds = (curState: ICcommitsState, selectedId: string) => {
  if (curState.selectedIds.indexOf(selectedId) > -1) {
    return curState.selectedIds.filter(stateRow => stateRow !== selectedId);
  } else {
    return [...curState.selectedIds, selectedId];
  }
};

export interface ICcommitsState {
  items: GithubCommit[];
  isLoading: boolean;
  error: string | null;
  selectedIds: string[];
}

export const commitReducer = (
  state: ICcommitsState = {
    items: [],
    isLoading: false,
    error: null,
    selectedIds: []
  },
  action: DataActions
): ICcommitsState => {
  switch (action.type) {
    case loading:
      return {
        isLoading: true,
        error: null,
        items: [],
        selectedIds: []
      };
    case success:
      return {
        isLoading: false,
        error: null,
        items: filterCommitsPerEvent(action.data),
        selectedIds: []
      };
    case setId:
      return {
        isLoading: false,
        error: null,
        items: state.items,
        selectedIds: getSelectedCommitIds(state, action.selectedId)
      };
    case failure:
      return {
        isLoading: false,
        error: action.error,
        selectedIds: [],
        items: []
      };
    default:
      return state;
  }
};
