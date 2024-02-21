### Jest でのモックの利用
- モック化して何が嬉しいのか?
    - 例1: テスト対象が未完成のクラスを使っている場合、そのクラスの完成を待つことなくテストを開始できる
    - 例2: テスト対象が外部の API を利用している場合、そのAPIをモック化することで、実際にAPIを叩かなくてもテストを実行できる

---

### 関数のモック化

- jest.fn() を使って関数をモック化する

- jest.fn() は Test Stub と Test Spy の両方を併せ持つイメージ

```js:test.js
test("jest.fn()の使用例", () => {
    // 引数nを受け取り、nをそのまま返すようなモック関数を設定
    const mockFunc = jest.fn((n) => {return n});

    // モック関数の呼び出し
    mockFunc(1);
    mockFunc(2);

    // モック関数の呼び出しについてのテスト

    // mockFuncの呼び出し回数のテスト
    expect(mockFunc).toHaveBeenCalled(2); // pass

    // 直近でmockFuncを呼び出した際の引数
    expect(mockFunc).toHaveBeenCalledWith(2); // pass
});
```

---

### jest.fn についてもっと詳しく

#### jest.fn() の引数に何も渡さないと、undefined を返却するモック関数が定義される

```js:test.js
// undefineを返す中身のないモック関数
const mockFunc2 = jest.fn();

mockFunc2();

// 戻り値がundefinedだったことをテスト
expect(mockFunck.mock.results[0].value).toBeUndefined() // pass
```

<br>

#### モック関数オブジェクトは .mock プロパティがあり、そこに呼び出し回数や呼び出した際の引数が記録されている

    - jest.fn()のオブジェクト.mock.calls
        - 呼び出し方に関する情報が記録されている

    - jest.fn()のオブジェクト.mock.results
        - モック関数の戻り値などが記録されている

```js:test.js
// モック関数の設定
const mockFunc = jest.fn();
mockFunc('test');

// モック関数の呼び出しについてのテスト

// mockFunc.mock.calls: モック関数が呼び出されたか
expect(mockFunc.mock.calls).toHaveLength(1); 

// mockFunc.mock.calls[n][x]: モック関数がn番目に呼び出された際のx番目の引数
expect(mockFunc.mock.calls[0][0]).toBe('test'); 

// mockFunc.mock.results[n].value: n番目に呼ばれたモック関数の返却値
expect(mockFunc.mock.results[0].value).toBeUndefined();
```

<br>

#### モックの戻り値はもっと細かく設定できる

- jest.fn().mockReturnValueOnce(戻り値)
    - 初回の呼び出しに対する戻り値を設定する
    - 戻り値に何も設定しないと undefined を返す

- mockReturnValueOnce をチェーンすることで、次の呼び出しに対する戻り値を前もって設定できる

- jest.fn().mockReturnValue(戻り値)
    - モック関数の戻り値を設定する
    - 通常は mockReturnValueOnce をチェーンしていった最後に設定する
    - 戻り値に何も設定しないと undefined を返す

```js: test.js
const mockFunc = jest.fn();
/**
 * 1回目の戻り値: 10
 * 2回目の戻り値: 'hi'
 * 以降の戻り値: false
 */
mockFunc.mockReturnValueOnce(10)
        .mockReturnValueOnce('hi')
        .mockReturnValue(false);

mockFunc(); // 10を返す
mockFunc(); // 'hi'を返す
mockFunc(); // falseを返す

// 1回目の呼び出しの際に10を返していることをテスト
expect(mockFunc).nthReturnedWith(1, 10);
// 2回目の呼び出しの際に'hi'を返していることをテスト
expect(mockFunc).nthReturnedWith(2, "hi");
// 3回目の呼び出しの際にfalseを返していることをテスト
expect(mockFunc).nthReturnedWith(3, false);
```

#### ちょっとした疑問

- jest.fn().mockReturnValueOnce(戻り値) にて設定されている mockReturnValueOnce の回数を超えた呼び出しが行われた時、戻り値はどうなるのか?

    -> jest.fn() のデフォルトの実装での戻り値になる

```js:test.js
// jest.fn()のデフォルトの実装
const mockFunc = jest.fn(() => {
    return 'this is mock';
});

// 初回の呼び出しの際の戻り値の設定
mockFunc.mockReturnValueOnce(10);

// モック関数の呼び出し
mockFunc();
mockFunc()

// n回目の呼び出しの際の戻り値のテスト
expect(mockFunc).nthReturnedWith(1, 10); // pass
expect(mockFunc).nthReturnedWith(2, 'this is mock'); //pass
```

---

### カスタムマッチャー (Custom Matcher)

- 通常は jest.fn().mock.props を toBe などのマッチャーで確認するが、もっと便利で明示的なマッチャーがある

<br>

#### n 回目に呼ばれた際の引数を確認したい

- jest.fn()のオブジェクト.mock.calls[n][x]
    - n 番目に呼ばれた際の x 番目の引数にアクセスする
    - **n は 0 からスタートする**

- expect().toHaveBeenNthCalledWith(n, arg1, ...)
    - **n は 1 からスタートする**

```js:test.js
const mockFunc = jest.fn();

mockFunc(10,11);
mockFunc(true);

// 以下は同じ
expect(mockFunc.mock.calls[0][0]).toBe(10);
expect(mockFunc.mock.calls[0][1]).toBe(11);

expect(mockFunc).toHaveBeenNthCalledWith(1, 10, 11); // pass

// 以下は同じ
expect(mockFunc.mock.calls[1][0]).toBeTruthy();

expect(mockFunc).toHaveBeenNthCalledWith(2, true); //pass
```

<br>

#### n 回目に呼ばれた際の戻り値を確認したい

- jest.fn()のオブジェクト.mock.results[n].value

- expect().nthReturnedWith(n, value)

```js:test.js
const mockFunc = jest.fn();
mockFunc.mockReturnValueOnce(10);

mockFunc();
mockFunc();

/**
 * 以下と同じ
 * expect(mockFunc.mock.results[0].value).toBe(10);
 */
expect(mockFunc).nthReturnedWith(1, 10);

// 以下は同じ
expect(mockFunc.mock.results[1].value).toBeUndefined();

expect(mockFunc).nthReturnedWith(2, undefined);
```

<br>

#### モック関数が最低1回は呼ばれたことを確認
- jest.fn()のオブジェクト.mock.calls.length

- expect().toHaveBeenCalled()

```js:test.js
const mockFunc = jest.fn();

mockFunc();

// 以下は同じ
expect(mockFunc.mock.calls.length).toBeGreaterThan(0)

expect(mockFunc).toHaveBeenCalled(); // pass
```

<br>

#### モック関数が n 回呼ばれたことを確認

- jest.fn()のオブジェクト.mock.calls.length

- expect().toHaveBeenCalledTimes()

```js:test.js
const mockFunc = jest.fn();

mockFunc();
mockFunc();

// 以下は同じ
expect(mockFunc.mock.calls.length).toBe(2);

expect(mockFunc).toHaveBeenCalledTimes(2);
```