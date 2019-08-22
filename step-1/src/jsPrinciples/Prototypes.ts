export function Animal() {}

Animal.prototype.breathe = function() {
  console.log("animals breath");
};

Animal.prototype.eats = function() {
  return "animals eat food";
};

// With constructor functions, the newly created object inherits from the constructor's prototype

export function Cat() {}

// inheritance in javascript!!
Cat.prototype = new Animal();
// make sure that cats know that they are cats!
Cat.prototype.constructor = Cat;

// overwrite the parents' eat function on the prototype
Cat.prototype.eats = function() {
  return "cats eat fish";
};

// es 6 version of all the above !!
export class AnimalClass {
  breathe() {
    console.log("animals breathe");
  }

  eats() {
    return "animals eat food";
  }
}

export class CatClass extends AnimalClass {
  eats() {
    return "cats eat food";
  }
}
