###### 関数

- 関数を定義するのと、変数に代入する事の違い

定義するとコード解析の時点でその関数を登録するため、関数を呼び出すコードはその関数事態の前に書いてもよい  

        console.log(helllo());

        function hello () {
          return 'hello';
        };


関数を変数に代入する場合、実行時に関数を代入しその変数を認識するため、事前に呼び出しコードを書いている場合エラーが発生する  

        console.log(hello());
        //これはエラー

        let hello = () => {
          return 'hello';
        };


---

- デフォルト引数

関数の定義側にデフォルトの引数の値を設定できる

        function add(a = 1, b = 2) {
          return a + b;
        }

        console.log(add());
        //3
        console.log(add(5));
        //7
        console.log(add(10, 1));
        //11


デフォルト引数は変数に代入する無名関数にも設定できる

        let add = (a = 1, b = 2) => {
          return a + b;
        };

---

- バッククォートで引数を渡す

以下の条件に当てはまる関数呼び出しの場合、括弧をつけずに関数を実行できる
  1. 引数が文字列
  2. 引数が1つ以下

  ```js
  const hello = (name) => {
    return `Hello ${name}`;
  }

  // バッククォートで関数実行
  console.log(hello`Bob`);
  // Hello Bob
  ```

  <br>

  特殊な仕様: バッククォートで実行される関数は、配列として引数を受け取る

  ```js
  const hello = (name) => {
    console.log(name); // [ 'Bob' ]
    return `Hello ${name}`;
  }

  console.log(hello`Bob`);
  ```