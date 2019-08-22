/* tslint:disable */
interface UpdateCounter {
  (): number;
}

export function closure(): UpdateCounter {
  let counter: number = 0;
  const updateCounter = function(): number {
    counter = counter + 1;
    return counter;
  };
  return updateCounter;
}
