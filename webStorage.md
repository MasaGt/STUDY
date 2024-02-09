### WEb Storageとは  
web側からクライアント側にデータの保存ができるようになる仕組み  
- データ形式はKVS
- Cookieとの違い  
    - Cooki  
        保存できるデータサイズ:　小さい  
        保存できる期限: あり  
        データ通信: リクエスト都度,Cookieはやり取りされる  
    
    - Storage  
        保存きるデータサイズ: 大きい(4MB)  
        保存できる期限: なし  
        データ通信: 発生しない

- Storageの種類  
    - local storage  
        - オリジン単位でデータを管理  
            \*オリジンとはURLのスキーム、ホスト、ポート番号の3つを組み合わせたもの  
            例: スキーマ://ホスト名:ポート番号  
            http://sample.co.jp:8080

        - オリジン単位でデータの管理をしているため、２つのタブ(ウィンドウ)で同じURLを開いている時はデータは共有される
        
        - ブラウザを閉じてもデータは残る  
            よって、明示的にデータを削除する必要がある

    - session storage
        - 現在のセッション(ブラウザが開いている間)で
        管理されるデータ  

        - 異なるタブやウィンドウでデータの共有はされない


### Storageの使い方

- local storage
                let storage = localStorage; //localStorage取得
                
                //方法1
                storage.setItem('key', value); //Key Value形式的でデータ保存
                storage.getItem('key') /Keyに紐づいているデータ取得

                //方法2
                storage.key = value; //データ保存
                storage.key //データ取得

                //方法3
                storage['key'] = value; //データ保存
                storage['key'] //データ取得

- sessionStorage
                let storage = sessionStorage;

                データの保存/取得方法はlocalStorageと同じ

- データの削除方法
                //方法1
                storage.removeItem('key');

                //方法2
                delete storage.key;

                //方法3
                delete storage['key']

                //方法4(全てのデータを削除)
                storage.clear();

