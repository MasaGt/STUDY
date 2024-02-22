# Index

1. [Promise](#sec1)
2. [Promiseの使い方](#sec2)
3. [Promiseの状態](#sec3)
4. [Promiseチェーン](#sec4)
5. [finally](#sec5)

---
<div id="sec1"></div>

### Promise

- 非同期処理の非同期処理の結果を返す約束をするビルトインオブジェクト

- コールバックチェーンを解消するための仕組みとして提供された

*コールバックチェーン: Aというコールバック関数の後にBというコールバック関数を呼び、さらにその後にCというコールバック関数を呼び、Dという•••

```js
// コールバックチェーンの例
setTimeout(() => {
    // 処理A

    setTimeout(() => {
        // 処理B

        setTimeout(() => {
            // 処理C
            •••
        }, 1000);
    }, 1000);
}, 1000);
```

```js
// プロミスを使うと上記の処理がもっとすっきり簡潔に書ける
// *あくまで書き方のイメージであり、実際の書き方と異なる
処理Aの関数().then(処理Bの関数).then(処理Cの関数)...;
```

---
<div id="sec2"></div>

### Promiseの使い方

- プロミスインスタンスを生成する
    - 引数のコールバック関数は以下の引数を撮ることができる  
        - 第一引数: プロミスを成功状態(Fulfilled)にするための関数
        - 第二引数: プロミスを失敗状態(Rejected)にするための関数

```js
const promise = new Promise((resolve, reject) => {
    // 成功の場合
    resolve(結果のデータなど);

    // 失敗の場合
    reject(結果のデータなど);
});
```

<br>

- resolveで成功状態にすると、then()の第一引数で結果を受け取れるようになる
```js
const promise = new Promise((resolve, reject) => {
    // 処理が成功したとする
    resolve(結果のデータなど);
});

promise.then((result) => {
    console.log(result);
    // 上記のresolveで渡される"結果のデータなど"が渡ってくる
});
```

<br>

- rejectで失敗状態にすると、thenの第二引数またはcatchで結果を受け取れるようになる

*処理中に例外が投げられても失敗状態になる
```js
// thenの第二引数で受け取る場合
const promise = new Promise((resolve, reject) => {
    // 処理が失敗したとする
    reject(結果のデータなど);
});

// 第一引数は空の関数でもいい
promise.then(undefined, (result) => {
    console.log(result);
    // 上記のrejectで渡される"結果のデータなど"が渡ってくる
});
```

```js
// catch受け取る場合
const promise = new Promise((resolve, reject) => {
    // 処理が失敗したとする
    reject(結果のデータなど);
});

promise.catch((result) => {
    console.log(result);
    // 上記のrejectで渡される"結果のデータなど"が渡ってくる
});
```

```js
// 処理中に例外が投げられた場合
const promise = new Promise((resolve, reject) => {
    throw new Error();
});

promise.catch((result) => {
    console.log(result);
    // 例外で投げられたエラーオブジェクトが渡ってくる
});
```

---
<div id="sec3"></div>

### Promiseの状態

- 内部的に次の3つの状態があるらしい

    - Fulfilled
        - resolve（成功）したときの状態。このときonFulfilled ( Promise をインスタンス化するときの第1引数のコールバック) が呼ばれる

    - Rejected
        - reject（失敗）または例外が発生したときの状態。このときonRejected ( Promise をインスタンス化するときの第2引数のコールバック) が呼ばれる

    - Pending
        - FulfilledまたはRejectedではない状態
        - new Promiseでインスタンスを作成したときの初期状態


- 1度でもFulfilledかRejectedの状態になったら、以降そのPromiseの状態は変化しない

```js
// 1度Fulfilledになる例
const promise = new Promise((resolve, reject) => {
    // 一度Fulfilledにすると
    resolve("成功");
    // 以降状態変化させようとしても変化しない
    reject("失敗");
});

promise.then((result) => {
    // この行は実行される
    console.log(result);
}).catch((result) => {
    // この行は実行されない
    console.log(result);
})
```

```js
// 1度Rejectedになる例
const promise = new Promise((resolve, reject) => {
    // 一度Rejectedにすると
    reject("失敗");
    // 以降状態変化させようとしても変化しない
    resolve("成功");
});

promise.then((result) => {
    // この行は実行されない
    console.log(result);
}).catch((result) => {
    // この行は実行される
    console.log(result);
})
```

<br>

- また１度でもFulfilledかRejectedになった後に再びresolve()/reject()を呼び出してもthen/catchが複数回呼ばれることはない

```js
const promise = new Proise((resolve) => {
    resolve('Hello');
    resolve('World');
});

promise.then((result) => {
    // 実行されるのは最初のresolve時のみ
    console.log(result);
    // 'Hello'
});
```

---
<div id="sec4"></div>

### Promiseチェーン

- Promise.then()やPromise.catch()の戻り値は新しいPromiseインスタンス

-　よってPromise.then().then()...catch()のようにthenやcatchを繋げて書くことができる

```js
const promise = new Promise((resolve) => {
    // 何らかの処理
    resolve("process A is fulfilled");
});

promise.then((result) => {
    console.log(result);
    // "process A is fulfilled"
    
    // thenの中でPromiseを返却すると、そのPromiseが成功/失敗するまで次のthenが待つ
    return new Promise((resolve) => {
        // 何らかの処理2
        resolve("process B is fulfilled");
    });
}).then((result) => {
    console.log(result);
    // "process B is fulfilled"
});
```

<br>

- then()の中で任意の値を返却すると、Fulfilled状態のPromiseインスタンスを返却する
```js
const promise = new Promise((resolve) => {
    resolve("TaskA done");
});

promise.then((result) => {
    console.log(result);
    // "TaskA done"

    return "TaskB done"
}).then((result) => {
    console.log(result);
    // "TaskB done"
});
```

<br>

- then()の中で例外が投げられると、Rejected状態のPromiseインスタンスを返却する
```js
const promise = new Promise((resolve) => {
    resolve("TaskA done");
});

promise.then((result) => {
    console.log(result);
    // "TaskA done"

    thow new Error("error!");
}).catch((err) => {
    console.log(err.message);
    // "error!"
});
```

---
<div id="sec5"></div>

### finally

- Promiseの状態がFulfilled、Rejectedのどちらの状態であっても呼び出されるコールバック

```js
const promise = new Promise((resolve) => {
    resolve("TaskA done");
});

promise.then((result) => {
    console.log(result);
    // "TaskA done"
}).finally(() => {
    // 共通の最終処理など
    console.log("finally");
    // "finally"
});

// Rejectedの状態になってもfinallyは実行される
promise.then(() => {
    throw new Error("error");
}).catch((err) => {
    // エラー時の処理
}).finally(() => {
    // 共通の最終処理など
    console.log("finally");
    // "finally"

});
```

---
### Promise.all()

- 複数の非同期処理を並行して実行し、<font color="red">すべての非同期処理が成功した場合</font>にthen()のコールバックを実行する

- all()はインスタンスに紐づかない<font color="red">クラスメソッド</font>であることに注意

- then()にはすべてのPromiseから渡された結果値は配列として渡される

```js
// procces1
const proc1 = new Promise((resolve) => {
    resolve("proc1 done");
});

// procces2
const proc2 = new Promise((resolve) => {
    resolve("proc2 done");
});

// procces3
const proc3 = new Promise((resolve) => {
    resolve("proc3 done");
});

Promise.all([
    proc1,
    proc2,
    proc3
]).then((result) => {
    console.log(result);
    // [ 'proc1 done', 'proc2 done', 'proc3 done' ]
});
```

<br>

- どれか一つでもRejectedになった場合、thenの第二引数またはcatchで結果を受け取る

- Promise.all()と同様にrace()もクラスメソッド

```js
const proc1 = new Promise((resolve) => {
    resolve("proc1 done");
});

// procces2
const proc2 = new Promise((resolve) => {
    resolve("proc2 done");
});

// procces3
const proc3 = new Promise((resolve) => {
    resolve("proc3 done");
});

Promise.race([
    proc1,
    proc2,
    proc3
]).then((result) => {
    console.log(result);
    // proc1~3の中で一番早く完了したPromiseの結果値が表示される
});
```

---

### Promise.race()

- 複数の非同期処理を並行して実行し、<font color="red">どれか1つの非同期処理が最初に成功した時点で</font>にthen()のコールバックを実行する

```js
const proc1 = new Promise((resolve) => {
    resolve("proc1 done");
});

// procces2
const proc2 = new Promise((undefined, reject) => {
    //処理失敗などによってRejected状態になった場合
    reject("proc2 failed");
});

// procces3
const proc3 = new Promise((resolve) => {
    resolve("proc3 done");
});

Promise.all([
    proc1,
    proc2,
    proc3
]).then((result) => {
    // 実行されない
    console.log(result);
}).catch((err) => {
    console.log(err);
    // "proc2 failed"
});
```