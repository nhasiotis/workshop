import React from "react";
import { connect } from "react-redux";
import { List, Typography, Switch, Spin, Alert } from "antd";
import "antd/lib/list/style/index.css";
import "antd/lib/switch/style/index.css";
import "antd/lib/spin/style/index.css";
import "antd/lib/alert/style/index.css";

import "./App.css";
import ClickCounter from "../ClickCounter/ClickCounter";

import { Dispatch } from "redux";
import { fetchData, setSelectedCommitId } from "../../modules/Commits/Actions";
import { IApplicationState } from "../../store";

export interface AppState {
  selectedCommitIds: string[];
}

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
  commits: GithubCommit[];
  selectCommitId: (id: string) => void;
  selectedIds: string[];
  isLoading: boolean;
  error: string | null;
}

export class App extends React.Component<IAppProps, AppState> {
  state: AppState = {
    selectedCommitIds: []
  };

  public componentDidMount() {
    this.props.fetchData();
  }

  public render() {
    if (this.props.isLoading) {
      return <Spin />;
    }

    if (this.props.error) {
      return <Alert message={"something went wrong fetching your data"} />;
    }
    return (
      <div>
        <List
          header={<div>Commit list</div>}
          bordered
          dataSource={this.props.commits}
          renderItem={item => (
            <List.Item>
              <Typography.Text
                mark={this.props.selectedIds.indexOf(item.sha) > -1}
              >
                {item.message}
              </Typography.Text>
              <ClickCounter />
              <Switch onChange={() => this.props.selectCommitId(item.sha)} />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchData: () => fetchData(dispatch),
  selectCommitId: (commitId: string) => setSelectedCommitId(dispatch, commitId)
});

const mapStateToProps = (state: IApplicationState) => ({
  commits: state.commits.items,
  selectedIds: state.commits.selectedIds,
  isLoading: state.commits.isLoading,
  error: state.commits.error
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
