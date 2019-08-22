let promise = () =>
  new Promise(function(resolve, reject) {
    setTimeout(() => resolve(1), 1000);
  })
    .then(function(result: any) {
      alert(result); // 1

      return new Promise((resolve, reject) => {
        setTimeout(() => resolve((result as any) + 1), 1000);
      });
    })
    .then(function(result: any) {
      alert(result); // 2

      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(result + 1), 1000);
      });
    })
    .then(function(result: any) {
      alert(result); // 3
    });

export default promise;
