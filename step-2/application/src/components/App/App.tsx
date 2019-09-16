import React from "react";
import { connect } from "react-redux";
import { List, Typography, Switch } from "antd";
import "antd/lib/list/style/index.css";
import "antd/lib/switch/style/index.css";
import ClickCounter from "../ClickCounter/ClickCounter";

import { Dispatch } from "redux";

export interface AppState {
  commits: GithubCommit[];
  selectedRows: string[];
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

export class App extends React.Component<{}, AppState> {
  state: AppState = {
    commits: [],
    selectedRows: []
  };

  private fetchData() {
    return fetch("https://api.github.com/users/LesleyMerks/events")
      .then(data => {
        return data.json();
      })
      .then(
        (data: GitHubData[]) => {
          this.setState({
            commits: this.filterCommitsPerEvent(data)
          });
        },
        error => {
          console.log("something went wrong");
        }
      );
  }

  public componentDidMount() {
    this.fetchData();
  }

  private filterCommitsPerEvent(data: GitHubData[]) {
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
  }

  private setSelectedRow = (selectedId: string) => {
    if (this.state.selectedRows.indexOf(selectedId) > -1) {
      // never update state immediately, make a copy or use function that does not mutate original input directly!

      return this.setState({
        selectedRows: this.state.selectedRows.filter(
          stateRow => stateRow !== selectedId
        )
      });
    }
    this.setState((prevState: AppState) => ({
      selectedRows: [...prevState.selectedRows, selectedId]
    }));
  };

  public render() {
    return (
      <div>
        <List
          header={<div>Commit list</div>}
          bordered
          dataSource={this.state.commits}
          renderItem={item => (
            <List.Item>
              <Typography.Text
                mark={this.state.selectedRows.indexOf(item.sha) > -1}
              >
                {item.message}
              </Typography.Text>
              <ClickCounter />
              <Switch onChange={() => this.setSelectedRow(item.sha)} />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(
  null,
  mapDispatchToProps
)(App);
