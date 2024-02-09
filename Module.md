#### ファイルのモジュール化

##### class, 変数のインポート
- exportする側はexportしたいクラスや変数に対してexportキーワードをつける
- imporする側は import {インポートする要素} from 'ファイルパス(拡張子は除く)'でimportする

export側
```JavaScript
    //file name: sample.js
    export class Membere {

    }

    export const PASSWORD = 12342342;
```

import側

```JavaScript
    import { Member, PASSWORD } from './sample';

    //使う時
    if (userInput === PASSWORD) {

    }
```
<br>


##### モジュール全体をまとめてインポート  
- インポート側でアスタリスク(*)を指定することで,fromに指定されたファイル内のexportされている全ての要素にアクセス可能
- アスタリスクは {} で囲わなくていい
- この場合 as　キーワードでモジュールの別名をしておく必要がある
 **import * as モジュールの別名 from "モジュールのパス(拡張子は除く)"**

import側
```JavaScript
    import * as app from './sample';

    //利用するとき
    if (userInput === app.PASSWORD) {}
```

##### default export
- 1つのファイル内で一つだけexportするときだけ利用できる
- エクスポート側はクラス/関数名の設定は不要(設定してても良い)
- インポート側はモジュール名を {} で囲わなくていい
- インポート側はイインポート時に常に独自の名前を作成する必要がある  

export側
```JavaScript
    //file name: sample.js
    export default class {
        calcSum(val1, val2) {
            return val1 + val2;
        }
    }
```

import側
```JavaScript
    import Calclator from './sample';

    let calc = new Calclator();

    console.log(calc.calcSum(10,20));
```