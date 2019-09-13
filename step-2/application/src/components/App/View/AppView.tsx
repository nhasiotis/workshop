import "./AppView.css";
import "antd/dist/antd.css";

import { Alert } from "antd";
import React from "react";

import { Status } from "../../../models/Status/Status";
import SelectView from "../../Select/View/SelectView";

export interface AppProps {
    scanners: string[];
    status: Status;
}
export const AppView = (props: AppProps) => (
    <div className="App">
        {props.status.visible ? (
            <Alert
                data-id="alert-msg-id"
                message={props.status.message}
                type={props.status.type}
            />
        ) : null}
        <SelectView items={props.scanners} id={"scanner-select"} />
    </div>
);
