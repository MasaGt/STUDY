### モジュールの一部分をモック化する

- jest.spyOn(対象モジュール名, "メソッド名")でモック化する
    - モジュール.メソッド名 = jest.fn() のイメージ

- jest.spyOn() はjest.mock() とは異なり <font color="red"> test() の中に記述していい </font>

- jest.spyOn() の戻り値が何回呼ばれた/呼ばれた際の引数などを記録している

```js
import { myModule } from "対象モジュールのパス";

// テストコード
test("jest.spyOn sample", () => {
    //　myModule.モック対象メソッド = jest.fn() のイメージ
    const spy = jest.spyOn(myModule, "モック対象メソッド名");

    // モック化したメソッドに実装を渡す
    spy.mockImplementation(() => {
        // 実装内容
    });

    // モックしたメソッドが何回呼ばれた/呼ばれる際の引数などのテスト
    expect(spy).toHaveBeenCalledTime(0);
});
```

<br>

例: Math.random()　を使ってるモジュールがあり、実行時にどんな数が生成されるかわからず、テストしずらい。

-> Math.random() を jest.spyOn() でモックする


```js
// test-target.js
// 占いモジュール (テスト対象)
// this is a forune telling module
const readFortune = () => {
    // lucky number is between 1 to 10
    return `your lucky number is ${Math.random() * 10 + 1}`;
};
```

```js
// test-target.test.js (テストコード)

import { readFortune } from "test-target.jsのパス";

test("readFortune test", () => {
    const spy = jest.spyOn(Math, 'random')
        .mockImplementation(() => {
        return 0;
        });
    
    expect(readFortune()).toBe("your lucky number is 1");
    // pass

    expect(spy).toHaveBeenCalledTimes(1);
    // pass
});
```

---

### jest.spyOn() のいいところ

-  jest.spyOn() の戻り値オブジェクトの mockRestore() で<font color="red">モック化を解除できる</font>こと

- jest.restoreAllMocks() を afterEach() の中で呼ぶことを公式で推奨されている

```js
// テストコード

afterEach("restore the mocked func", () => {
    jest.restoreAllMocks();
});

test("test case1", () => {
    jest.spyOn(myModule, "method");
    // 以降の処理
});
```