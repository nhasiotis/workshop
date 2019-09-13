import React from "react";

export interface SelectProps {
    items: string[];
    id: string;
}

const SelectView: React.FC<SelectProps> = ({ items, id }): JSX.Element => {
    return (
        <select data-id={id}>
            {items.map((item, index) => (
                <option key={index}>{item}</option>
            ))}
        </select>
    );
};

export default SelectView;
