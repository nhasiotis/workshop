import { GithubCommit } from "../../components/App/App";
import { success, DataSuccess, setId, SetId } from "../../modules/Commits/Actions";
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
  selectedCommitIds: string[];
}

export const commitReducer = (
  state: ICcommitsState = {
    items: [],
    isLoading: false,
    error: null,
    selectedCommitIds: []
  },
  action: SetId | DataSuccess //I got rid of the DataActions type as the type was actually multi-type and I was unsure on how to cast it to the right one per case
) => {
  switch (action.type) {
    case setId:
      return {
        isLoading: false,
        error: null,
        items: state.items,
        selectedCommitIds: setSelectedCommitId((action as SetId).id, state) // ugly cast to the rescue
      };
    case success:
      return {
        isLoading: false,
        error: null,
        items: filterCommitsPerEvent((action as DataSuccess).data), // ugly cast strikes again
        selectedCommitIds: []
      };
    default:
      return state;
  }
  //I don't know what is the best approach here to deal with the different return types from the action. Is it normal that the action has different return types?
};

const setSelectedCommitId = (selectedId: string, state: ICcommitsState) => {
  if (state.selectedCommitIds.indexOf(selectedId) > -1) {
    return state.selectedCommitIds.filter(
      stateRow => stateRow !== selectedId
    );
  }

  return [...state.selectedCommitIds, selectedId];
};
