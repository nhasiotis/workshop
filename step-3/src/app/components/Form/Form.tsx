import React from "react";

export interface FormProps {
  value: string;
  onChange(event: any): void;
  onSubmit(event: any): void;
}

const Form: React.FC<FormProps> = ({ value, onChange, onSubmit }) => {
  return (
    <form className="App-form" onSubmit={onSubmit}>
      <input value={value} onChange={onChange} />
      <button>Submit</button>
    </form>
  );
};

export default Form;
