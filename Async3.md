### async
- async
    - 関数の前につけるキーワード

    - asyncのついた関数は必ずPromiseを返す

    - asyncのついた関数内では await が利用できる　

---

### asyncの使い方

```js
const greet = async () => {
  return "hello";
};

greet().then((data) => {
  console.log(data);
});
```

<br>

- async functionでは return に任意のデータを設定できるが、それは下記の方法のシンタックスシュガー

```js
const greet = async () => {
  return Promise.resolve("hello");
};

greet().then((data) => {
  console.log(data);
});
```

<br>

- async functionが返すPromiseは以下のようなものがある
    - return に直接値を渡す = FulfilledなPromiseを返す

    - return にPromise.resolve()/reject()を渡す = Promise.resolve()/reject()をそのまま返す

    - async func内で例外が発生した場合 = RejectedなPromiseを返す

```js
// return にPromise.reject()を渡す
const func = async () => {
    return Promise.reject("fail");
};

func().then((result) => {
    // 実行されない
    console.log(result);
}).catch((err) => {
    console.log(err);
    // "fail"
});

// もしくはこうう書くことができる
func().then(undefined, (err) => {
    console.log(err);
    // "fail"
})
```

---

### await

- awaitはプロミスインスタンスの前におけるキーワード

- awaitをつけると後続の処理は指定したPromiseの状態がFulfilledかRejectedになるまで待つ
```js
const func1 = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("func1 done")
        }, 2000);
    });
};

const func2 = async () => {
    // ここでawaitをつけることでfunc1の処理が終わるまで待つ
    await func1().then((result) => {
        console.log(result);
    });

    return "func2 done";
}

func2().then((result) => {
    console.log(result);
})

/**
 * console
 * func1 done
 * func2 done
 */
```

<br>

- 上記は以下と同じ
```js
const func2 = async () => {
    // ここでawaitをつけることでPromiseの処理が終わるまで待つ
    await new Promise((resolve) => {
        setTimeout(() => {
            resolve("func1 done")
        }, 2000);
    }).then((result) => {
        console.log(result);
    });

    return "func2 done";
}

func2().then((result) => {
    console.log(result);
})

/**
 * console
 * func1 done
 * func2 done
 */
```

<br>

- もしawaitを忘れると意図しない処理の順番になる
```js
const func1 = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("func1 done")
        }, 2000);
    });
};

const func2 = async () => {
    // ここでawaitを忘れると、2秒後にfunc1内の処理を動かすようにタイマー登録して後続の処理に進む
    func1().then((result) => {
        console.log(result);
    });

    return "func2 done";
}

func2().then((result) => {
    console.log(result);
})

/**
 * console
 * func2 done
 * func1 done
 */
```

---

### async await チェーン

- Promiseでチェーンを書くとこんな感じ
```js
const getBookData = () => {
  return fetch("http://bit.ly/step-up-javascript-01") // booksデータの取得
    .then((res) => {
      return res.json(); // booksデータのパース
    })
    .then((books) => {
      return books[0]; // booksデータの先頭を取得
    });
};

getBookData().then((res) => {
  console.log(res);
});
// { author: 'おやまだひろし', text: 'はじめてのReact.js' }
```

<br>

- async awaitでチェーンを書くとこんな感じ(そもそもこれをチェーンと言わないかも)
```js
const getBookData = async () => {
  const data = await fetch("http://bit.ly/step-up-javascript-01"); // booksデータの取得
  const parsed = await data.json(); // booksデータのパース
  return parsed[0]; // booksデータの先頭を取得
};

getBookData().then((res) => {
  console.log(res);
});
// { author: 'おやまだひろし', text: 'はじめてのReact.js' }
```

---

### 注意点

- Promise { \<pending\> } が返却される  
    => 大抵戻り値がPromiseのものが多い

```js
const getBookData = () => {
  return fetch("http://bit.ly/step-up-javascript-01") // booksデータの取得
    .then((res) => {
      return res.json(); // booksデータのパース
    })
    .then((books) => {
      return books[0]; // booksデータの先頭を取得
    });
};

// fetch()の戻り値はPromise
console.log(getBookData());
// Promise { <pending> }
```


```js
const getBookData = async () => {
  const data = await fetch("http://bit.ly/step-up-javascript-01"); // booksデータの取得
  const parsed = await data.json(); // booksデータのパース
  return parsed[0]; // booksデータの先頭を取得
};

// await関数の戻り値はPromise
console.log(getBookData());
// Promise { <pending> }
```