import { GithubCommit } from "../../components/App/App";
import { DataActions, success, setId } from "../../modules/Commits/Actions";
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
) => {
  switch (action.type) {
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
          selectedIds: action.data
        };
    default:
      return state;
  }
};
