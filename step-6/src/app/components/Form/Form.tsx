import React from "react";

export interface FormProps {
  addToDo(value: string): void;
}

export interface FormState {
  value: string;
}

class Form extends React.Component<FormProps, FormState> {
  constructor(props: FormProps) {
    super(props);
    this.state = { value: ""};
  }

  onChange = (event: any) => {
    this.setState({ value: event.target.value });
  };

  onSubmit = (event: any) => {
    event.preventDefault();
    this.props.addToDo(this.state.value)
    this.setState({value: ""})
  }

  render(){
    return (
      <form className="App-form" onSubmit={this.onSubmit}>
        <input value={this.state.value} onChange={this.onChange} />
        <button>Submit</button>
      </form>
    );
  }
};

export default Form;
