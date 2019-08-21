import React from "react";

export interface ListProps {
  data: string[];
}

const List: React.FC<ListProps> = ({ data }) => {
  return (
    <ul>
      {data.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

export default List;
