### importとｚrequireの違い

    - import
        - ECMAScriptの構文
        - ブラウザ側で動く

    - require
        - CommonJSの構文
        - サーバー(NodeJS)側で動く

    requireはブラウザ側では動かないし、importはサーバー側では動かない

書き方(関数を例に)

- import
```JavaScript
//export側(module.js)

export let(const) module = () => {
    //処理内容
};
```

<br>

```JavaScript
//import側

import { module } from 'module.jsのパス(ファイル拡張子なし)';

module(); //module.jsの処理がはしる
```

<br>

- require

```JavaScript
//exprt側 (module.js)
module.exports.mod_name = () => {
    //処理内容
};
```

<br>

```JavaScript
//import側

let mod_name = require('module.jsのパス(ファイル拡張子はあってもなくてもいい)');

mod_name(); //module.jsの処理をよぶ
```

<br>

---


### EcmaScriptのimportはhoistingが起きる

```js
// export側
export const a = "foo!";
```

```js
// import側
console.log(a); // "foo!"
import a from "./foo";
```