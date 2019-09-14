import React from "react";
import Button from "antd/lib/button/button";

import "./ClickCounter.css";

export interface IClickCounterState {
  clickCount: number;
}

export default class ClickCounter extends React.Component<
  {},
  IClickCounterState
> {
  constructor({}) {
    super({});

    this.state = {
      clickCount: 0
    };
  }

  private incrementCount = () => {
    this.setState((prevState: IClickCounterState) => {
      return {
        clickCount: prevState.clickCount + 1
      };
    });
  };

  public render() {
    return (
      <Button className="clickCounter" onClick={this.incrementCount}>
        clicked {this.state.clickCount} times
      </Button>
    );
  }
}
