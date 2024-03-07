### bind とは

- 指定した関数の this の参照先を変えるメソッド

- 指定した関数の引数を固定することもできる

---

### 指定した関数の this の参照先を変える方法

- bind() の第一引数に this の参照先となるインスタンスを渡す

```ts
class Person {
  constructor(name) {
    this._name = name;
  }

  greet() {
    return `hello, my name is ${this._name}`;
  }
}

class Dog {
  constructor(name) {
    this._name = name;
  }
}

const bob = new Person("Bob");
const max = new Dog("Max");
console.log(bob.greet.bind(max)()); // 'hello, my name is Max'

// this を max に bind した関数を変数に代入してもいい
const newGreet = bob.greet.bind(max);
```

---

### 指定した関数の引数を固定する

- 第一引数にnullを指定すると this はそのままで、さらに第二引数以降がもとの関数の引数として引き継がれる

```js
const greet = (f_name, l_name) => {
  return `hello, ${f_name} ${l_name}`;
};

const newGreet = greet.bind(null, "John");

console.log(newGreet(null, "Smith")); // 'hello, John Smith'

// 以下のようにbindで引数を固定したら、そのまま実行してもいい
console.log(greet.bind(null, 'William')('Smith')); // 'hello, William Smith'
```