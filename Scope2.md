###### Scope

- 仮引数を使うときの注意  
値渡しと参照渡し

intなどメモリに直接値を持っている変数を渡す際は、仮引数は、その値を新しいメモリにコピーする。  
そのため、仮引数を関数内で変更しても呼び出し元の変数には影響を与えない

        let num = 0;

        function increment (num) {
          num++;
        }

        increment(num);

        console.log(num);
        //0

オブジェクトや配列などを渡す場合、メモリの参照値を渡すので、関数内で変更してしまうと呼び出し元の変数の中身も変わってしまう。

        let arr = [0, 1, 2];

        function change (arr) {
          arr[0] = 100;
        }

        change(arr);

        console.log(arr)
        //[100, 1, 2]

----

- ブロックスコープ  
{}の範囲のみ有効となるスコープ  
letはプロックスコープに対応した変数を宣言できる  
varは対応しない  

        for (var i = 0; i < 2; i++) {
          console.log(i);
        }

        console.log(i);
        //2

        //↓のletで宣言した変数はforブロックの中でのみ有効
        for (let i = 0; i < 2; i++) {
          console.log(i);
        }

        console.log(i);
        //そんな変数ないエラー
