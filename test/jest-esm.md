### EcmaScriptをJestで動かす

- そもそもなぜEcmaScriptはJestでうまく動かないのか

  - Jestは各ファイルがCommonJSで書かれたファイルであると期待しているから

    - CommonJSであると期待して解析しようとしたら
    EcmaScriptの文法で書かれていた => エラーを吐くのは当然と言えば当然

---

### Fake ESM と Native ESM

- Fake ESM: EcmaScriptもモジュールを書き、BabelなどでCommonJSにトランスパイルしてからNodeで実行する

- Native ESM: EcmaScriptをそのままNodeで実行する

今回は Native ESM でJestを実行したい

---

### そもそも、指定する方法なんてあるのか?

- そもそも、jsファイルがEcmaScriptかCommonJSで書かれているなんて、どこで判断されているのか?

#### 1 .jsファイルのモジュールシステムを指定する方法

  - デフォルトでjsファイルがEcmaScriptのモジュールシステムを使っていると認識させれば大丈夫

    -> package.jsonに "type": "module" を追加することで、.jsファイルはEcmaScriptの記法で書いたということで扱われる
    ```json
    <!-- package.json -->
    {
      ~
      <!-- jsファイルがEcmaScriptで書かれていると認識させる-->
      "type": "module"

      <!-- jsファイルがCommonJSで書かれていると認識させる(デフォルトはこっち) -->
      "type": "commonjs"
    }
    ```

#### 2 ファイル拡張子によって暗黙的にどっちのモジュールシステムを使っているのかを認識させる方法
  - .cjs にすると、そのファイルはCommonJSのモジュールシステムを使っていると認識される

  - .mjs にすると、そのファイルはEcmaScriptのモジュールシステムを使っていると認識される

#### 上記の両方を設定した場合はどうなるのか?

- .cjsか.mjsのファイルについては、package.jsonのtypeフィールドの影響は受けない

---

### 実際にEcmaScriptをJestでテストする方法(babelを使わない方法)

- .jsファイルの場合

  1. .jsファイルにEcmaScriptの記法で記入する

  2. package.jsonに以下を追加する
  ```js
  {
    // jsファイルをEcmaScriptだと認識させる
    "type": "module",
    ~
    // 以下のオプションをnodeコマンドにつけてjestを実行する　
    "scripts": {
      "test": "node --experimental-vm-modules ./node_modules/.bin/jest"
    }
  }
  ```

- .mjsファイルの場合

  1. 上記手順の2を設定する

  2. jestの設定ファイルに"testMatch"を設定する  
    *testMacthとは: テストファイルを認識させるための項目  
    **デフォルトでは__test__フォルダ配下の.js/jsx/ts/tsxファイルをテストファイルと認識する。  
    または対象ファイルの拡張子の前に.test/.specがついたファイルをテストファイルと認識する。(.test.jsなど)**  
    <font color="red">.mjs/cjsはテストファイルとして認識されないため、上記拡張子もテストファイルということを設定する必要がある</font>
  ```js
  // jest.config.js
  const path = require("path");

  module.exports = {
    testMatch: [path.resolve(__dirname, "test", "*.test.mjs")],
  };
  ```
  *testMatchの代わりにtestRegexという項目を設定してもいい


<br>

*node --experimental-vm-modulesは実験的な機能のため、バグや機能不足がある可能性もあるので注意

---

### Native EcmaScriptでjestのモックを利用する際の注意点

- jestを"@jest/globals"からインポートする

- jest.mock()の代わりにjest.unstable_MockModule()を使う

- モック対象のモジュールはawait + 動的インポートでインポートする

- モック対象モジュールのインポートはjest.unstable_MockModule()の後に呼ぶ

<br>

```js
// sample.test.(m)js
// barというモジュールのテスト
// barの中でbazが使われており、bazをモック化したい

// 1. jestを"@jest/globals"からインポートする
import { jest } from "@jest/globals";

// 2. jest.mock()の代わりにjest.unstable_MockModule()を使う
jest.unstable_mockModule("./baz", () => {
  return {
    モック対象: () => {
      // モック内容
    }
  };
});


// 3. モック対象のモジュールはawait + 動的インポートでインポートする
// 4. モック対象モジュールのインポートはjest.unstable_MockModule()の後に呼ぶ
const { barの中の関数など } = await import("./bar");
```

---

### Native ESMにおいて、モック対象を利用しているモジュールのインポートはjest.unstable_MockModule()の後に呼ぶ理由  

- <font color="red">jest.mock()はmock宣言 → import(require)の順で処理されなければならないらしい</font>  
CommonJSでのjest.mock()は自動的に巻き上げが起こるものらしい。

よって、以下のjestのコードは...
```js
// CommonJS
const func = require("./bar");

jest.mock("./baz", () => {
  // モック
});
```

以下のように巻き上げられていた
```js
// 巻き上げ
jest.mockの宣言

const func = require("./bar");

jest.mock("./baz", () => {
  // モック
});
```

<br>

しかし、EcmaScriptでは静的インポートは巻き上げられ、jest.unstable_mockModuleは巻き上げられない。よって、以下のコードはjestのモックの正しい処理順ではない

```js
import { jest } from "@jest/globals";

// モック対象を内部で使っているテスト対象のインポート
import { テスト対象 } from "./bar";

// jest.mock宣言
jest.unstable_mockModule("./baz", () => {
  モック対象
});
```

<br>

jest.mock()はmock宣言 → import の順で処理するためにawaitの使える動的インポートを利用するしかないので以下の書き方が必要になる
```js
import { jest } from "@jest/globals";

// jest.mock宣言
jest.unstable_mockModule("./baz", () => {
  モック対象
});

// モック対象を内部で使っているテスト対象のインポート
const { テスト対象 } = await import("./bar");
```