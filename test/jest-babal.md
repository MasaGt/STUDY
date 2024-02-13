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

- presetsの設定を忘れると、babel は変換処理をしないことになるので、 jest 実行時にエラーになる(exportが使えない等のエラーが表示されることになる)
```js
// babel.config.js
module.exports = {
    presets: ["@babel/preset-env"],
};
```

---

### Webpack + Babel + Jest

