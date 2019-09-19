import React from "react";
import { connect } from "react-redux";
import { List, Typography, Switch, Spin } from "antd";
import "antd/lib/list/style/index.css";
import "antd/lib/switch/style/index.css";
import 'antd/dist/antd.css';
import ClickCounter from "../ClickCounter/ClickCounter";
import './animation.css'
import { Dispatch } from "redux";
import { fetchData, setSelectedCommitId } from "../../modules/Commits/Actions";
import { IApplicationState } from "../../store";

export interface AppState {}

export interface GithubAuthor {
  email: string;
  name: string;
}

export interface GithubCommit {
  sha: string;
  author: GithubAuthor;
  message: string;
  distinct: boolean;
  url: string;
}

export interface GitHubData {
  id: string;
  type: string;
  actor: {
    id: number;
    login: string;
    display_login: string;
    gravatar_id: string;
    url: string;
    avatar_url: string;
  };
  repo: {
    id: number;
    name: string;
    url: string;
  };
  payload: {
    push_id: number;
    size: number;
    distinct_size: number;
    ref: string;
    head: string;
    before: string;
    commits: GithubCommit[];
  };
  public: boolean;
  created_at: string;
}

interface IAppProps {
  fetchData: () => void;
  setSelectedCommitId: (a:string) => void;
  commits: GithubCommit[];
  selectedIds: string[];
  errors: String | null;
}  
const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchData: () => fetchData(dispatch),
  setSelectedCommitId: (id: string) => setSelectedCommitId(dispatch, id)
 });

const mapStateToProps = (state: IApplicationState) => ({
  commits: state.commits.items,
  selectedIds: state.commits.selectedIds,
  errors:  state.commits.error
});

const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export class App extends React.Component<IAppProps, AppState> {
  state: AppState = {   
  };

  public componentDidMount() {
    sleep(10000).then(() => { this.props.fetchData();})
  }

  public render() {
    return (
      <div>
       {this.props.errors && <div className="animation">{this.props.errors}</div>}
       {this.props.commits.length == 0 && <div className="spin"><Spin tip="Loading.."  className="spin"/></div>}
       <List
          header={<div>Show Commit list</div>}
          bordered
          dataSource={this.props.commits}
          renderItem={item => (
            <List.Item>
              <Typography.Text className="transition"
                mark={this.props.selectedIds.indexOf(item.sha) > -1}
              >
                {item.message}
              </Typography.Text>
              <ClickCounter />
              <Switch onChange={() => this.props.setSelectedCommitId( item.sha)} />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
