const getBookData = async () => {
  const data = await fetch("http://bit.ly/step-up-javascript-01");
  const parsed = await data.json();
  return parsed[0];
};

getBookData().then((res) => {
  console.log(res);
});
