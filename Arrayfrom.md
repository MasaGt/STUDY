### Array.from( {length:5}, (\_, i) => {i} ) を読み解く

**わからなかったところ**  
- Array.from() の使い方

- {length: 5} ってなに?

- (\_, i) の \_ってなに?

---

### Array.from() の使い方

- 反復可能オブジェクト/配列風オブジェクトからコピーして新しい配列を作成する関数

    - 1次元配列はディープコピー
    - 多次元配列シャローコピー

    (JavScriptの配列のコピー系の関数はそうなっているらしい)[参考サイト](https://zenn.dev/tomokumo/articles/fc17bc98701fda)
    

```js
// 呼び方

Array.from(arrayLikeObj);

Array.from(arrayLikeObj, mapFn);
*mapFnは第一引数に要素、第二引数にインデックスを受け取る
```

<br>

```js
Array.from('hello');
// [ 'h', 'e', 'l', 'l', 'o' ]

Array.from('hello', (elem, index) => {`${elem} at ${index}`});
// [ 'h at 0', 'e at 1', 'l at 2', 'l at 3', 'o at 4' ]

Array.from(Array(5));
// [undefined, undefined, undefined, undefined, undefined]
```

<br>

```js
// shallow copy と deep copy

// 1次元配列は shallow copy
let org = [1, 2, 3];
let copy = Array.from(org);
org[0] = 100;
console.log(org);
// [100, 2, 3]
console.log(copy);
// [1, 2, 3]


// 多次元配列は deep copy
org = [[0, 1], [2, 3], [4, 5]];
copy = Array.from(org);
org[0][1] = 100;
console.log(org);
// [[0, 100], [2, 3], [4, 5]]
console.log(copy);
// [[0, 100], [2, 3], [4, 5]]
```

---

### {length: 5} ってなに?

- 配列風オブジェクトのことだった
    - length プロパティを持つオブジェクトは配列風オブジェクトとして見なされる
    - よって、{length: 5} は長さ5の配列風オブジェクトを意味する

```js
Array,form({legth: 3}, (elem) => {elem});
// [ undefined, undefined, undefined ]
```

---

### (\_, i) の \_ ってなに?

- \_ は慣例で使用しない引数名につける名前らしい

```js
Array.from({length: 3}, (_, i) => {i});
// [0, 1, 2]
```