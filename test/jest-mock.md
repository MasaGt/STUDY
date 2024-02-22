### モジュールのモック化

- jest.mock() を使って、モジュールの 全体/一部 をモック化する

---

### モジュールの一部をモック化

- jest.mock()　にモック化したいモジュールのパスと、コールバック関数(モックの実装)を渡す

- コールバック関数はオブジェクトを返すようにする

- <font color="red">テストコードのトップレベルで jest.mock() を呼ぶ</font>

<br>

```js
// refered-module.js (依存モジュール)

/** 
 * 金額計算のモジュール
 * this is a module for calculation
 */

export const calcSalesTax = (prodct) => {
    if (category == "food") {
        // 8% on food
        return product.price * 1.08;
    } else {
        // 10% on the other products
        return product.price * 1.1;
    }
};

export const calcDeliveryFee = (cart) => {
    // free delivery for the oder over 1,000
    if (cart.total < 1000) {
        // add 15 delivery fee
        cart.total += cart.total + 15;
    }
};
```

<br>

```js
// test-target.js (テスト対象モジュール)

/**
 * オンラインショッピングモジュール
 * this is a module for online shopping
 */

import { calcSalesTax, calcDeliveryFee } from 'refered-moduleのパス';

export const checkout = (cart) => {
    // カートのアイテムの消費税金額計算
    cart.items.forEach((product) => {
        cart.total += calcSalesTax(product.price);
    });

    // 合計金額から送料の計算
    calcDeliveryFee(cart);
}
```

<br>

```js
// test-target.test.js (テストコード)
import { checkout } from 'test-targetのパス';
import { Cart } from 'cartモジュールのパス'; 

/** 
 * jest.mock(
 *              'モック対象モジュールのパス',
 *              () => {
 *                  return { モックの実装 }
 *              }
 *           );
 */

// トップレベルでモック化する
// calcSalesTax をモック化する
jest.mock('refered-moduleのパス', () => {
    return {
        calcSalesTax: (product) => {return product.price}
    }
});

test('checkout test', () => {
    

    const cart = new Cart();
    cart.items.add({ name: "pizza", price: 10});
    cart.items.add({ name: "desk", price: 55});
    
    //expect total = 10 + 55 + delivery fee(15)
    expect(checkout).toBe(80);

    /**
     * result: fail
     * cause: モック化したrefered-moduleにcalcDeliveryFeeが定義されて無い
     */
});
```

<br>

- 上記例でモック化した refered-module にcalcDeliveryFee が定義されていないというエラーが出る

- モジュールを一部モック化する場合、残りは実際の実装をそのまま渡す必要がある

```js
// test-target.test.js (テストコード)

// トップレベルでモック化する
// calcSalesTax をモック化する
jest.mock('refered-moduleのパス', () => {

    // 実際のモジュールの読み込み
    const originalModule = jest.requireActual('../foo-bar-baz');

    return {
        //　モック化しない部分はそのまま渡す
        ...originalModule,

        // モック化する部分は上書く
        calcSalesTax: (product) => {return product.price}
    }
});
```

---

### モジュール全体のモック化

- jest.mock() の第一引数にモジュールのパスを指定する

- **<font> Math のような built-in modules は jest.mock() でのモック化はできない</font>**

- イメージとしては以下の感じで、モジュールの全てのメソッドが jest.fn() に置き換わるイメージ
```js
jest.mock('../myModule');
// myModule.func1 = jest.fn();
// myModule.func2 = jest.fn();
// ...
// myModule.funcX = jest.fn();
``` 

<br>

例: axios を使っているモジュールがあるとする。 axios で実際に HTTP リクエストを送るのではなく、モック化することで固定のデータを返すようにできる。

```js
// test-target.js

import axios from "axios";

export const fetchFirstEntry = async () => {
    const result = await axios.get('http:~~');
    /**
     * the structure of "result"
     * {
     *      data: [{entry1}, {entry2}, {entry3}]
     * }
     */
    if (result != null) {
        return result.data[0];
    } else {
        return null;
    }
};
```

<br>

```js
// test-target.test.js (テストコード)

import axios from "axios";
import { fetchFirstEntry } from "test-target.jsのパス";

// from '~~' の　~~を渡す
jest.mock('axios');

test("fetchFirstEntry test", async () => {

    // axiosのgetメソッドをモック化
    axios.get.mockResolvedValue({mock: 'mocked!'});

    const result = await fetchFirstEntry();

    expect(result).toEqual({mock: 'mocked!'});
    // fail
});
```

<br>

- テスト結果が fail な理由: <font color="red"> test-target.js での実際の axios.get() の戻り値のデータ構造とモック化した axios.get() のデータ構造が異なっているから</font>

```js
// test-target.js

import axios from "axios";

export const fetchFirstEntry = async () => {
    const result = await axios.get('http:~~');
    /**
     * 実際のaxios.get()の戻り値のデータ構造
     * {
     *      data: [{entry1}, {entry2}, {entry3}]
     * }
     */

    /**
     * しかし、Mockingしたaxios.get()の戻り値のデータ構造は
     * {mock: 'mocked!'}
     */

    if (result != null) {
        /** 戻り値にdataというプロパティがあるのを期待してアクセス
         * しかし、mockingしたaxios.get()にはdataというプロパティがない
         * 結果、テストがfailする
         */
        return result.data[0];
    } else {
        return null;
    }
```

<br>

- <font color=red>**実際に戻ってくるデータの構造と同じ構造でモック化しないと、後続処理でうまくいかなくなることがあるので注意**</font>

```js
// test-target.test.js (テストコード)

import axios from "axios";
import { fetchFirstEntry } from "test-target.jsのパス";

jest.mock('axios');

test("fetchFirstEntry test", async () => {

    /**
     * 下記のようなモック対象関数の実際の戻り値に合わせて
     * モッキングする必要がある
     * {
     *      data: [{entry1}, {entry2}]
     * }
     */
    axios.get.mockResolvedValue({data: {mock: 'mocked!'}});

    const result = await fetchFirstEntry();

    expect(result).toEqual({mock: 'mocked!'});
    // pass
});
```
---

### Promiseを返す関数のモック化に注意

#### mockResolvedValue と mockImplementation の違い

- mockResolvedValue
    - 対象の非同期関数が Fulfilled の状態になった時に返す値を設定

- mockImplementation
    - モック対象の関数自体をモック化する
    - モック対象の関数が 同期 / 非同期 のどちらでもモック化できる
    - 非同期の関数をモック化する場合は、Promiseインスタンスを返す必要がある

```js
// テストコード

axios.get.mockResolvedValue({ data: [{ msg: "mocked" }] });

// 上記は以下のシュガーシンタックス
axios.get.mockImplementation(() => {
return new Promise((resolve) => {
    return resolve({ data: [{ msg: "mocked" }] });
});
```