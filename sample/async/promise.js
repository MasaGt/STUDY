// Promise chain

const getBookData = () => {
  return fetch("http://bit.ly/step-up-javascript-01")
    .then((res) => {
      return res.json();
    })
    .then((books) => {
      return books[0];
    });
};

getBookData().then((res) => {
  console.log(res);
});
