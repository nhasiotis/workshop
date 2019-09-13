export function createCounter() {
  const updateCounter = function() {
    let counter = 0;
    counter = counter + 1;
    return counter;
  };
  return updateCounter;
}

export function counterResult() {
  const counter = createCounter();
  const counter1 = counter();
  const counter2 = counter();
  const counter3 = counter();

  console.log(`${counter1}, ${counter2}, ${counter3}`);
}

/* tslint:disable */
/* interface UpdateCounter {
  (): number;
}
 */
/* export function closure(): UpdateCounter {
  let counter: number = 0;
  const updateCounter = function(): number {
    counter = counter + 1;
    return counter;
  };
  return updateCounter;
} */
