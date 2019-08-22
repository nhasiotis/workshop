import * as React from "react";
import "./listItem.css";

export interface ListItemProps {
  item: any;
  name?: string;
}

const ListItem: React.FunctionComponent<ListItemProps> = ({ item, name }) => {
  return (
    <li className="listItem">
      <span />
      {`Event id: ${item.id} Created at: ${item.created_at} Created by: ${
        item.actor.login
      }`}
    </li>
  );
};

ListItem.defaultProps = {
  name: "lesley"
} as Partial<ListItemProps>;

export default ListItem;
