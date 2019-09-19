import { GithubCommit } from "../../components/App/App";
import { DataActions, success, selectCommitId } from "../../modules/Commits/Actions";
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

const updateSelectedCommitIds = (selectedCommitIds : string[], newSelectedCommitId: string) => {
    if (selectedCommitIds.indexOf(newSelectedCommitId) > -1) {
    // never update state immediately, make a copy or use function that does not mutate original input directly!

    return selectedCommitIds.filter(stateRow => stateRow !== newSelectedCommitId);
  }
  return [...selectedCommitIds, newSelectedCommitId];
};

export interface ICcommitsState {
  items: GithubCommit[];
  isLoading: boolean;
  error: string | null;
  selectedIds : string[];
}

export const commitReducer = (
  state: ICcommitsState = {
    items: [],
    isLoading: false,
    error: null,
    selectedIds: []
  },
  action: DataActions
) => {
  switch (action.type) {
    case success:
      return {
        isLoading: false,
        error: null,
        items: filterCommitsPerEvent(action.data),
        selectedIds: state.selectedIds
      };
    case selectCommitId:
      return {
        items: state.items,
        isLoading: false,
        error: null,
        selectedIds: updateSelectedCommitIds(state.selectedIds, action.commitId)
      }
    default:
      return state;
  }
};
