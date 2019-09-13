import React from "react";

import { Status } from "../../../models/Status/Status";
import { AppView } from "../View/AppView";

export interface AppProps {
    scanners: string[];
    requestDataFetch: Function;
    status: Status;
}

export class App extends React.Component<AppProps, {}> {
    componentDidMount() {
        this.props.requestDataFetch();
    }

    render() {
        return (
            <AppView
                scanners={this.props.scanners}
                status={this.props.status}
            />
        );
    }
}
