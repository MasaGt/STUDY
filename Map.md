###### Map

- Arrayと異なる所  
  1. keyとvalueのペアを保持する  
  (key)の型は文字列以外でもいい

  2. new Map()で生成する。  

  3. new Map()に連想配列を渡し、初期化することもできる  
  連想配列: [[key, val], [key, val]]


- Mapの基本的な操作

  1. get(key): 指定したkeyに紐づくvalueを取得

  2. set(key, val): key,valのペアを追加(key重複時は上書き)

  3. delete(key): 指定したkeyに一致するペアを削除

  4. clear(): すべての要素を削除

  5. keys(): すべてのkeyを取得(iterableで返却される)

  6. values(): 全てのvalueを取得(iterableで返却される)

  7. entries:　全てのペアを取得(iterableで返却される)

map.entriesの例

        let m = new Map([
          ['k1', 1],
          ['k2', 2],
          ['k3', 3]
          ]);

        //iterableなのでofで回す
        for (entry of m.entries()) {
          console.log(entry);
        }
        //[ 'k2', 2 ]
        //[ 'k1', 1 ]
        //[ 'k3', 3 ]
