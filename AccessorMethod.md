### なぜgetter/setter内部では、_プロパティ名が使用されているのか?

- 答え: 無限ループが起こるから。

```JavaScript
    class Student {
        constructor (name) {
            this.name = name:
        }

        set name(name) {
            this.name = name; //ここでもう一度セッターが呼び出され、無限ループになる
        }
    }
```

そのため、プライベートな(外部からはgetter/setterでのみアクセスできる)プロパティ名には_をつける

```JavaScript
    Class Studnet {
        constructor (name) {
            this._name = name;
        }

        set name(name) {
            this._name = name; //_nameへの代入はname()のトリガーにならない
        }
    }
```