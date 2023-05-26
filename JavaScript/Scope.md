###### Scope

- 変数の巻き上げとは  
スコープ内においてvarで宣言した変数は、宣言した場所に関係なく<span style="color: red; ">定義だけが先頭に移動されること</span>

        var val = 'global';

        function sample () {
          console.log(val);
          // undefinedとなる

          var val = 'local';

          console.log(val);
          //'local'
        }

<span style="color: red; ">関数内でvarで宣言したから起こった事象</span>  


var無しでvalを関数内で使うとvalはグローバルスコープの方を参照する。

        var val = 'global';

        function sample () {
          console.log(val);
          //'global'

          val = 'local';

          console.log(val);
          //'local'
        }

        console.log(val)
        //'local'に書き換えられている


letでvalを関数内で宣言すると、'そんな変数定義されていない'エラーで落ちる(正しい挙動)

        let val = 'global';

        function sample () {
          console.log(val);
          //valはまだ定義されていないエラー

          let val = 'local';

          console.log(val);
          //'local'
        }
