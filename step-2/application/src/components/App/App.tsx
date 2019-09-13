import React from "react";

export interface AppProps {
  scanners: any;
  status: any;
}

export class App extends React.Component<{}, {}> {
  componentDidMount() {
    // this.props.requestDataFetch();
  }

  render() {
    return <div>hello world!!!</div>;
  }
}
