### Jestとは

- JavaScriptのユニットテストのためのツール

---

### はじめかた

- jestをインストール
```bash
npm init

# jest インストール
npm install --save-dev jest
```

<br>

- package.jsonにnpm script追加
```json
{
  "scripts": {
    "test": "jest"
  }
}
```

<br>

- コマンドでテスト実施
```bash
npm run test
``` 

---

### 注意点

- JestはNode.jsでテストを実行するので、テスト対象はCommonJSの文法に従っていないと動かない
  - 例: import/exportではなく、module.exports/requireを使っていないと動かない

- 解決策: EcmaScriptからCommonJSに変換したものをJestでテストすればいい
  - babelを使う必要がある

- EcmaScriptをそのままJestで動かせる方法
  - nodeの--experimental-vm-modulesという機能を使えばいけるっぽい。[詳しくはこちら](./jest-esm.md)

---

### トランスフォーマー

- トランスフォーマーとは: テスト実行時にコードをメモリ上でトランスパイルする仕組みらしい(よって結果はキャッシュにしかない)

- 主な目的としてはNode(CommonJS)がサポートしていないシンタックス(JSX, TypeScript, EcmaScript)をCommonJSにトランスパイルすることらしい

```json
// jest.config.json 
{
  "transform": {
    // 対象ファイル: 使用するトランスフォーマーのペア
    "\\.[jt]sx?$": "babel-jest",
  }
}
```

- babel-jestとはJestに同梱されているトランスフォーマーであり、babelの設定ファイルに従って対象ファイルをbabelで処理する
