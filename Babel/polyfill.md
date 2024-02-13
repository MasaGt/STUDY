### ポリフィルとは？

- 古いブラウザでは使えない機能を動かすための仕組み
    - 既存の機能の組み合わせ(ライブラリ)で置き換える

- 置き換えるライブラリをポリフィルと呼び、置き換えること自体をポリフィルとも呼ぶ(文脈で使い分ける)

- 例: Promiseを使ったコードを書いたが、Promiseが使えないブラウザがある(IE11とOpera Mini)
    - プロミスと同じ処理をするライブラリを入れ、Promiseの部分をそのライブラリでの処理に置き換えれば対応していないブラウザでも書いたコードが動く

---

### ポリフィルの利用方法

- Babel7.4.0 から @babel/preset-env でポリフィルができるようになったらしい


- useBuiltIns: "usage" を指定することで、必要なものだけ自動的にコードをポリフィルしてくれる

- 代替コードの元(ライブラリ)をインストールしておく必要がある。大体は core-js で OK

- corejs: "バージョン" で使用するcore-jsのバージョンを指定する

```bash
# core-jsのインストール
npm install core-js@3
```

```js
// babel.config.js
module.exports = {
    presets: ["@babel/preset-env", 
                {
                useBuiltIns: "usage",
                corejs: 3,
                }
            ],
};
```

---

### 動作対象のプラットフォームにIEを入れない

- IEのサポートを切れば、polyfillも必要ないケースが増える