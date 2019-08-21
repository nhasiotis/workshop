import React from "react";
import { Item } from "../../../interfaces/item";

export interface ListProps {
  items: Item[];
}

const List: React.FC<ListProps> = ({ items }) => {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item.text}</li>
      ))}
    </ul>
  );
};

export default List;
