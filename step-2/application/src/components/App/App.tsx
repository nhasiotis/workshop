import React from "react";
import { List, Typography } from "antd";
import ClickCounter from "../ClickCounter/ClickCounter";

export interface AppState {
  commits: GithubCommit[];
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
  constructor({}) {
    super({});

    this.state = {
      commits: []
    };
  }

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

  public render() {
    return (
      <div>
        <List
          header={<div>First commit for each commit event</div>}
          footer={<div>Data fetched from github api</div>}
          bordered
          dataSource={this.state.commits}
          renderItem={item => (
            <List.Item>
              <Typography.Text mark>{item.message}</Typography.Text>
              <ClickCounter />
            </List.Item>
          )}
        />
      </div>
    );
  }
}
