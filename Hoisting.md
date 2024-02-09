### 変数の巻き上げとは

- var スコープは関数スコープ

            if (true) {
               var foo = `bar`;
            }

            console.log(foo); // "bar"

- letはブロックスコープ

            if (true) {
                let foo = `bar`;
            }

            console.log(foo); // fooはブロックの外側に存在しないためエラー

変数の巻き上げとは**宣言の前に変数を使用できる動作です**  
letでは巻き上げは起こらない  

- varで変数宣言

            function test () {
                console.log(val); //undefined ->つまり変数の宣言はされている状態

                var val = 1;
                return val;
            }

    上記のようにvalを宣言&代入したのは関数の途中でも、先頭でvalが宣言されていることになってしまった = 変数の巻き上げ


- letで変数宣言

        function test() {
            console.log(val); //参照エラー発生

            let val = 100;
            return val;
        }

    変数宣言より前に、その変数を使用しようとすると、参照エラーで落ちる
