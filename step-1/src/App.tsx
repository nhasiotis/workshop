import React from "react";
import "./App.css";
import ListItem from "./ListItem";

import { Animal, Cat, CatClass, AnimalClass } from "./jsPrinciples/Prototypes";
import promise from "./jsPrinciples/promises";
import { counterResult } from "./jsPrinciples/closure";

interface AppState {
  items: any;
}

export default class AppClass extends React.Component<{}, AppState> {
  constructor(props) {
    super(props);

    // below is for demo purposes, this type of code should not be in your constructor

    promise();
    counterResult();
    const animal = new Animal();
    const animalClass = new AnimalClass();
    const animalFood = animal.eats();
    const animalFoodInClass = animal.eats();

    const catClass = new CatClass();
    const catFoodInClass = catClass.eats();
    const cat = new Cat();
    const catFood = cat.eats();
    const isReallyACatInstance = cat instanceof Cat;
    const isReallyACat = catClass instanceof CatClass;

    this.fetchData = this.fetchData.bind(this);
    this.state = {
      items: []
    } as AppState;
  }

  private fetchData(event: any) {
    fetch("https://api.github.com/users/LesleyMerks/events")
      .then((data: any) => {
        return data.json();
      })
      .then(
        data => {
          this.setState({
            items: data
          });
        },
        error => {
          console.log("something went wrong");
        }
      );
  }

  public componentDidMount() {
    // async call should be here
    console.log("mounted");
  }

  public componentWillUnmount() {
    console.log("i will unmount");
  }

  public render() {
    console.log("render");
    return (
      <div>
        <button onClick={this.fetchData}>Load information</button>
        <ul>
          {this.state.items.map(item => {
            return <ListItem key={item.id} item={item} />;
          })}
        </ul>
      </div>
    );
  }
}
