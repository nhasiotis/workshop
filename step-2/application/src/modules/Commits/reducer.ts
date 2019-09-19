import { GithubCommit } from "../../components/App/App";
import { DataActions, success, OtherActions ,select} from "../../modules/Commits/Actions";
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

const selectIds = (selectedId: string, state: ICcommitsState) =>{
    if (state.selectedIds.indexOf(selectedId) > -1) {
      return  state.selectedIds.filter(
          stateRow => stateRow !== selectedId
        )
          }
     return  [...state.selectedIds,selectedId];
   }



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
  action: DataActions | OtherActions
) => {
  switch (action.type) {
    case success:
      return {
        isLoading: false,
        error: null,
        items: filterCommitsPerEvent((action as DataActions).data),
       selectedIds: []
      };
      case  select:
        return {
          isLoading: state.isLoading,
          error: state.error,
          items: state.items,
          selectedIds: selectIds((action as OtherActions).cid, state)
          };
        
    default:
      return state;
  }
};
