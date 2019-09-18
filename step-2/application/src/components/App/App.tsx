import React from "react";
import { connect } from "react-redux";
import { List, Typography, Switch, Spin, Alert } from "antd";
import "antd/lib/list/style/index.css";
import "antd/lib/switch/style/index.css";
import "antd/lib/spin/style/index.css";
import "antd/lib/alert/style/index.css";
import ClickCounter from "../ClickCounter/ClickCounter";

import { Dispatch } from "redux";
import { fetchData } from "../../modules/Commits/Actions";
import { IApplicationState } from "../../store";

export interface AppState {
  selectedCommitIds: string[];
  loadingText: string
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
  error: string | null;
  isLoading: boolean;
}

export class App extends React.Component<IAppProps, AppState> {
  loadingTexts: string[] = [
    "Fetching coffee...",
    "Ensuring Everything Works Perfektly...",
    "Attaching property handlers...",
    "Bootstrapping bootstrap...",
    "Mapping state to props...",
    "Uploading cookie data...",
    "Dropping database...",
    "Installing new search bar...",
    "Setting explorer as your default browser...",
    "Prettifying CSS..."
  ];

  private getLoadingText = () => {
    return this.loadingTexts[Math.floor(Math.random() * 10)];
  }

  state: AppState = {
    selectedCommitIds: [],
    loadingText: this.getLoadingText()
  };

  public componentDidMount() {
    this.periodicallyChangeLoadingText();
    this.props.fetchData();
  }

  private periodicallyChangeLoadingText = () => {
    setTimeout(
      () => {
        this.setState(() => { return { loadingText: this.getLoadingText() } });
        if (this.props.isLoading) {
          this.periodicallyChangeLoadingText();
        }
      }, 700);
  }


  private setSelectedCommitId = (selectedId: string) => {
    if (this.state.selectedCommitIds.indexOf(selectedId) > -1) {
      // never update state immediately, make a copy or use function that does not mutate original input directly!

      return this.setState({
        selectedCommitIds: this.state.selectedCommitIds.filter(
          stateRow => stateRow !== selectedId
        )
      });
    }
    this.setState((prevState: AppState) => ({
      selectedCommitIds: [...prevState.selectedCommitIds, selectedId]
    }));
  };

  public render() {
    return (

      < div >
        {
          this.props.error ? <Alert
            message="You shall not have commits"
            description={this.props.error}
            type="error"
          /> : null
        }
        <Spin size="large" tip={this.state.loadingText} spinning={this.props.isLoading}>
          <List
            header={<div>Commit list</div>}
            bordered
            dataSource={this.props.commits}
            renderItem={item => (
              <List.Item>
                <Typography.Text
                  mark={this.state.selectedCommitIds.indexOf(item.sha) > -1}
                >
                  {item.message}
                </Typography.Text>
                <ClickCounter />
                <Switch onChange={() => this.setSelectedCommitId(item.sha)} />
              </List.Item>
            )}
          />
        </Spin>
      </div >
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchData: () => fetchData(dispatch)
});

const mapStateToProps = (state: IApplicationState) => ({
  error: state.commits.error,
  commits: state.commits.items,
  isLoading: state.commits.isLoading
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
