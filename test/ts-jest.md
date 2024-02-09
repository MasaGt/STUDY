### Typescriptのファイルをテストする

- ts-jestが1つの手段

---

### tes-jestの使い方

- 必要なパッケージをインストーるする

    - jest
    - ts-jest
    - @types/jest

```bash
npm install --save-dev jest ts-jest @types/jest
```

<br>

- Jestの設定ファイル(jest.config.js)を作成し、TpeScriptのテストができるように設定を追加する

```bash
# コマンドで設定ファイルを作成する場合
npx ts-jest config:init
```

```js
// 設定ファイルの中身

/** @type {import("ts-jest/dist/types").InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
};
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

- コマンドでテスト実行

```bash
npm test
```

---

### 実際にあった問題

状況: ~~.test.tsを作成し、簡単なテストメソッドを作成した

問題: コンパイルエラーで落ちる (テストメソッドへの引数の数がダメらしい)

エラーメッセージ: TS2554: Expected 1 arguments, but got 2

```typescript
// ~~.test.ts
const testTarget = require("テスト対象モジュール");

test("sample", () => {
  expect(1).toBe(1);
})
```

---

### 原因

同じ階層にtestメソッドを持つモジュールがあり、テストファイル側でそのtestを読んでいる感じだった

---

###　解決策

同じ階層のモジュールのtestメソッドをリネームした