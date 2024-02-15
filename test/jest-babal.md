### Babel を使って EcmaScript モジュールをテストする

1. jest, babel をインストールする
```bash
npm install -D jest

npm install -D @babel/core @babel/preset-env
```
*@babel/cli はいらない -> 今回は babel をコマンドから実行しないので

2. Babel の設定ファイルに以下を記述
```js
// babel.config.js
module.exports = {
    preset: ["@babel/preset-env"],
};
```

3. Jest の実行
```json
// package.json
{
    "scripts": [
        "test": "jest"
    ]
}
```

<br>

```bash
npm run test
```

---

### 疑問: Jest, Babel 実行順はどうなってるの?

- Babel でトランスパイル(結果はキャッシュに保存) -> jest でトランスパイルされたコードをテスト

- jest の設定はデフォルトで以下になっている
    - babel-jest とは、テスト実行時に Babel の設定ファイルを読み込んでコードを変換する
    - tranform については[こちらの"トランスフォーマー"を参照](./jest.md)
```js
// jest.config.js
module.exports = {
    "transform": {
        "\\.[jt]sx?$": "babel-jest",
    }
}
```

<br>

- Babel で presets を指定しているから babel-jest が設定に従ってトランスパイルしてくれ、 jest で EscmaScript のテストがうまくいく

- presets の設定を忘れると、babel は変換処理をしないことになるので、 jest 実行時にエラーになる(exportが使えない等のエラーが表示されることになる)
```js
// babel.config.js
module.exports = {
    presets: ["@babel/preset-env"],
};
```

---

### Webpack + Babel + Jest

- babel + Jestと必要なモジュールはあまり変わらない

- alias を設定している場合は、 jest の設定ファイルをいじる必要がある

- また、静的ファイルを読み込んでいるコードはテストの際にその静的ファイルをモックした方がいい(トランスパイルできないファイルがあるとエラーになるらしい)

---

### Webpack + Babel + Jest 利用方法

1. webpack, webpack-cli, jest, @babel/core, @babel/preset-env babel-loader を -D でインストールする
```bash
npm install -D webpack webpack-cli jest @babel/core @babel/preset-env babel-loader
```

<br>

2. webpack の設定ファルを設定する
    - ビルドモードの選択
    - エントリーポイントの設定
    - 出力先や出力ファイル名の設定
    - ローダーの設定
    - エイリアスや拡張子の設定
    - プラグインの設定  
    など

<br>

3. babel の設定ファイルにて、使用するプリセットを指定する

<br>

4. 静的ファイルのモックを設定する
    - **基本的なイメージ**: import "静的ファイルのパス" が静的ファイルを読み込むのではなく、<font color="red">空の無名オブジェクトを読み込ませるようにする</font>

    1. 空のオブジェクトを export するモックファイルを作成しておく
    ```js:mock.js
    // mock.js
    module.exports = {};
    ```

    2. jest.config にて画像ファイルに対して読み込み先を mock.js に向けてやる
    ```js:jest.config.js
    // jest.config.js
    module.exports = {
        moduleNameMapper: {
            ".(jpeg|jpg|png|gif|svg)$": "mock.jsのパス",
            ".(css|scss|sass)$": "mock.jsのパス"
        },
    };
    ```

<br>

5. webpack の設定ファイルにて、 resolve.alias を設定していた場合、jest の設定ファイルに moduleNameMapper の設定を記述する

    ```js: webpack.config.js
    // webpack.config.js
    module,exports = {
        resolve: {
            alias: {
                "alias_name": path.resolve(__dirname, "対象フォルダへのパス");
            }
        }
    }
    ```

    *moduleNameMapper はモジュールに対してエイリアスを設定するイメージ

    よって、jest.config では webpack で設定した alias の配下のモジュールに対してエイリアスを設定するイメージ

    ```js:jest.config.js
    // jest.config.js
    module.exports = {
        moduleNameMapper: {
            "alias_name/(.+)$": "<dirname>/対象フォルダへのパス/$1"
        }
    }
    ```

---

### css ファイルのモック

- identity-obj-proxy というパッケージを使って css のモック化をすることもできる

1. パッケージのインストール

```bash
npm install -D identity-obj-proxy
```

<br>

2. jest.cofig に css 系の拡張子を読み込む場合、インストールしたパッケージ読み込むように設定

```js:jest.config.js
// jest.config.js
module.exports = {
    moduleNameMapper: {
        "\.(css|scss|sass)^": "identity-obj-proxy"
    }
}
```