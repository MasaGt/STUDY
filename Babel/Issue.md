### restパラメータがsyntaxErrorになり、トランスパイルされない

- 利用していたモジュール　
    - @babel/core@7.23.9
    - @babel/polyfill@7.12.1
    - @babel/preset-env@7.23.9
    - babel-cli@6.26.0
    - babel-jest@29.7.0
    - jest@29.7.0

```js
// ソースコード
const data = {
  hoge: "hoooooo",
  fuga: "gaaaaaa",
  piyo: "piiiii",
};

const { hoge, ...other } = data;

console.log(hoge, other);
```

```bash
# console
# SyntaxError: src/before.js: Unexpected token (7:14)
#    5 | };
#    6 | 
# >  7 | const { hoge, ...other } = data;
#      |               ^
#    8 | 
#    9 | console.log(hoge, other);
```

---

### 原因

babel7において、@babel-cliではなくbabel-cliを使っていたから

---

### 解決策

- babel-cliをアンインストールし、代わりに@babel-cliをインストール

```bash
npm uninstall -D babel-cli

npm install -D @babel-cli
```
