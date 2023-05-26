###### Set

- 特徴
  1. 重複を許さない配列というイメージ

  2. new Set()で宣言する  
  new Set([val1, val2])で初期化も同時にできる

  3. 一つだけ要素を取得するのが出来ない(めんどくさい)  
  データ構造的にそういう使い方を期待するものではないため?

- Setの基本的な操作

  1. add(elem): elemを追加

  2. delete(elem): 指定したelemを削除する

  3. clear(): すべての要素を削除する

  4. entries(): すべてのキー/値を取得する

  5. values(): すべての値を取得する


面白いentries()

        let s = new Set([10, 1, 100]);

        for (let elem of s.entries()) {
          console.log(elem);
        }
        //[ 10, 10 ]
        //[ 1, 1 ]
        //[ 100, 100 ]

        //そのため、elem[0]でもelem[1]でも同じ値を取得できる
        //文字列を格納したsetでも同じ
