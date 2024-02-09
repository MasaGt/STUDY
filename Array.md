###### Array

- arrayの基本的な操作

  1. array.push(elem): arrayの末尾にelemを追加する

  2. array.pop(): arrayの末尾の要素を返却&arrayから削除

  3. array.shift(): arrayの先頭の要素を返却&arrayから削除

  4. array.unshift(elem):arrayの先頭にelemを追加する

  5. array.foreach(func(val, index, array){}): 配列の要素を順に処理する->処理の内容は渡したfunction内で決める

  6. array.map(func(val, index, array)): 配列の要素を順に加工し返却する->加工の内容は渡したfunction内で決める

  7. array.some(func(val. index, array)): 配列の要素を順に確認し、functionの条件に合致した場合trueを返す

  8. array.filter(function(val, index, array){}): 配列の要素を特定の条件で絞り込む。絞り込む条件はfunction側で決める

  9. arry.sort(function(elem1, elem2){}): 配列の要素を特定の条件で並べ替える。並べ替える条件はfunction側で決める  

    *比較の結果、>0だった場合、順番を変更する*    
    - コールバック関数が0未満（例えば-1）を返した場合：elem1はelem2の前に来る（順番は変わらない）
    - コールバック関数が0より大きい値（例えば1）を返した場合：elem2はelem1の前に来る（順番が変わる）
    - コールバック関数が0を返した場合：何もしない


array.map例

        let arr = [1,2,3,4];

        let double = arr.map(
          function(val) {
            return val*2;
          }):
        console.log(double):
        //[ 2, 4, 6, 8 ]


array.some例

        let arr = [1,3,5,9];

        let result = arr.some(function(elem) {
          return (elem % 2 == 0);
        });

        console.log(result);
        //false

        //trueのパターン
        let arr = [1,3,5,8];

        let result = arr.some(function(elem) {
          return (elem % 2 == 0);
        });

        console.log(result);
        //true



array.sort例

        let rank = ['S','A','B','C'];

        let arr = [
          {name: 'one', rank: 'C'},
          {name: 'two', rank: 'S'},
          {name: 'three', rank: 'A'},
          {name: 'four', rank: 'B'},
        ];

        let result = arr.sort(function(e1, e2) {
          return rank.indexOf(e1.rank) -
           rank.indexOf(e2.rank);
        });

        console.log(result);
        //[
        // { name: 'two', rank: 'S' },
        // { name: 'three', rank: 'A' },
        // { name: 'four', rank: 'B' },
        // { name: 'one', rank: 'C' }
        //]
