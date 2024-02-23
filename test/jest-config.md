### Jest config とは

- jest の設定ファイルのこと
    - webpack.config や babel.config と同じ

- jest の設定は独立したファイルに記述するだけなく、 package.json に定義することもできる
    - package.json が肥大化するリスクはある

```json
// package.json
{
    "jest": {
        //ここにプロパティ名と値で設定する　
        "prop-name": value,
    }
}
```

---

### 設定ファイルを作成する

- 以下の2つの方法がある

    1. jest コマンドに --init　オプションをつける
    ```bash
    jest --init
    ```

    2. 普通に webpack.confog.js/ts/json ファイルを作成する

---

### コードカバレッジを取得する

- collectCoverage 項目を true にする

```js
// jest.config.js
module.exports = {
    collectCoverage: true,
};
```

もしくは

```json
// package.json
{
    "jest": {
        "collectCoverage": true,
    },
}
```

<br>

- テスト実行時にカバレッジの結果がコンソールに表示される + coverage ディレクトリが作成されるので、その中の html ファイルを開くと結果を見ることができる

- カバレッジ結果の出力先を設定したい場合は、 coverageDirectory プロパティを設定する

```js
// jest.config.js
const path = reqire("path");
module.exports = {
    collectCoverage: true,
    coverageDirectory: path.resolve(__dirname, "出力先のディレクトリ");
}
```

---

### moduleNameMapper

- moduleNameMapper はモジュールに対してエイリアスを設定するもの。

- webpack の resolve.alias のようにディレクトリに対して設定はできないので注意

```js
// jest.config.js

module.exports = {
    moduleNameMapper: {
        '正規表現などを用いたエイリアス': '実際のパス'
    }
}
```

例: スタイルシートへのアクセスが簡単になるようにエイリアスを設定する

```js
// jest.config.js

module.exports = {
    moduleNameMapper: {
        "@style/(.*\.css|scss|sass)$": "<rootDir>/style/$1",
    }
}
```

<br>

上記の解説: ソースコードにて @style/ファイル名.css と出てきた場合、 プロジェクトのルートディレクトリ/style/ファイル名.css を検索するようになる

```js
// ソースコード
import "@style/button.css";
// 実際は root/style/button.css を探しに行く
```

---

### 正規表現と置換について

- moduleNameMapper の実際のパスに設定される $1 についての解説

- [置換についてのわかりやすいサイト](https://uxmilk.jp/50944)

- [正規表現についてのわかりやすいサイト](https://www-creators.com/archives/4278#i-10)

- 正規表現の中で () で囲んだ部分とマッチした部分を $1 でそのまま出力するイメージ

<br>

例: 以下のような設定がされていたとする
```js
// jest.config.js

module.exports = {
    moduleNameMapper: {
        "@style/(.*\.css|scss|sass)$": "<rootDir>/style/$1",
    }
}
```
上記設定は以下のように解釈される
```
[ @style/button.css とソースコードに記述があった場合 ]

()で括った箇所とマッチするのは "button.css"

-> よって、 <rootDir>/style/$1 の $1 はbutton.css に置き換えられる

[ <rootDir>/style/button.css を探しに行く ]
```

---

### モジュールを指定する場合に拡張子を省略したい

```js
import { myFunc } from "~~/muModule.js";
```

上記の from 以降に指定するパスにてモジュールの拡張子を省略したい場合

- moduleFileExtensions で省略したい拡張子を指定する

```js
// jest.config.js

module.exports = {
     moduleFileExtensions: ["extension1", "extension2", ..., "extensionX"],
};
```

- デフォルトの設定値は **<font color="red"> ["js", "mjs", "cjs", "jsx", "ts", "tsx", "json", "node"]</font>** なので基本的に自分で設定する必要はないっぽい

---

### どのファイルがテストファイルなのかを認識させる

- testMatch プロパティにて設定する

```js
// jest.config.js

module.exports = {
    testMatch: ["正規表現など", ... "複数指定可能"],
};
```

<br>

- デフォルト: [ "\*\*/\_\_tests\_\_/\*\*/\*.[jt]s?(x)", "\*\*/?(\*.)+(spec|test).[jt]s?(x)" ]

    ->  \_\_tests\_\_ フォルダー内の .js 、 .jsx 、 .ts および .tsx ファイル、および .test または .spec のサフィックスを持つファイルが対象

- もし、 **.mjs でテストファイルを作りたい場合**、デフォルトではテストファイルとして認識されないので動かない

<br>

- .msj のテストファイルを動かしたい場合、以下のファイルをテストファイルとして認識させるのが良い
    - \_\_test\_\_にある .mjs ファイル
    - .test または .spec のサフィックスを持つ .mjsファイル

```js
// jest.config.js

module.exports = {
    testMatch: [
        "**/__tests__/**/*.mjs",
        "**/?(*.)+(spec|test).mjs"
        ],
};
```
