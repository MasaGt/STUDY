### babelとは

- トランスパイラー

- 設定に従って、対象のJSコードの書き方を変換し、出力するツール

---

### babelのインストール

- 開発時にのみ必要なので、-Dでインストール

```bash
npm install -D @babel/core @babel/cli @babel/preset-env
```

- @babel/core: Babel本体

- @babel/cli: コマンドからBabelを操作できるようにするパッケージ

- @babel/preset-env: プリセット(複数のプラグインを1つにまとめたもの)

---

### babelの変換処理の仕組み

- babelは以下の処理でトランスパイルを行う
```
1. jsファイルを解析
2. 解析したファイルをASTに変換
3. ASTに何らかの変換処理を行う
4. ASTをjsファイルに変換 
```

3の変換処理に用いるのがプラグイン。プラグインを使わないと、無変換のままAST => JSに出力されてしまう。

複数のプラグインがセットになったものがプリセット(みたいなイメージ)

---

### 設定ファイル

- babel.config.json(.js) か .babelrc(.json/.js) 
    - babel.config.json はプロジェクトフォルダ直下に配置するプロジェクト全体の設定ファイル
    - .babelrc は対象フォルダの配下に置く対象ファイルの設定ファイル

---

### 設定項目


#### presets
- presets: AST => AST　の変換処理の際に利用するプリセットの指定

```json
// babel.config.json
{
    "presets": ["プリセット名"]
}
```

- 出力後のコードを動かしたいブラウザを指定する  
    -> 指定することで、babelは対象ブラウザで動くようなコードにトランスパイルする
```js
module.exports = {
    presets: [
                ["プリセット名", 
                    targets: {
                        ブラウザ名: "バージョン"
                    }
                ]
            ]
}
```

- @babel/preset-env で polyfill する
    - core-js のインストールが必要
```bash
npm install core-js@3
```

```js
// babel.config.js
module.exports = {
    presets: [
        ["@babel/preset-env",
            {
                useBuiltIns: "usage",
                corejs: 3,
            },
        ],
    ],
};
```

<br>

#### env

- env: 環境変数 NODE_ENVの値によって有効化する設定を記載できる

```json
{
    "env": {
        "環境変数 NODE_ENVの値": {
            "presets": ["指定したNODE_ENVの時に有効化するプリセット名"]
        }
    }
        
}
```

<br>

例: Jest実行時にのみ有効化したい設定がある場合  
*Jest実行時、NODE_ENV=testになる
```js
module.exports = {
    env: {
        test: {
            presets: ["jest実行時に利用したいプリセット名"],
        },
    },
};
```

---

### Babelの実行

babelコマンドでトランスパイルする

- 対象ファイルを指定して実行
```bash
npx babel <対象ファイル> -o <出力ファイル> 
```
*npm scriptsに記載する場合
```json
{
    "scripts": [
        "build": "babel <対象ファイル> -o <出力ファイル> "
    ]
}
```

<br>


- 対象がディレクトリの場合
```bash
npx babel <対象フォルダ> -d <出力フォルダ>
```

----

### 参考サイト

- babelの設定項目についてわかりやすかったもの
    - [今更のバベる。 Babel 7を試してみたメモ](https://chaika.hatenablog.com/entry/2018/11/21/150000)