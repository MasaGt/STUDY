### JSでのクラスの書き方
- Javaでのコンストラターはクラス名と同じだが、JavaScriptではconstructorキーワードを使う  

            class クラス名 {
                constructor(引数) {
                    初期化処理
                }

                メソッド(引数) {
                    処理
                }
            }


### extendsの書き方

- Javaと同じ書き方

                class BaseClass {

                }

                class SubClass extends BaseClass {

                }

### override

- 親クラスと同じ名前のメソッドを子クラスに定義すると、子クラスのメソッドが優先して使用される。

            class Base {
                constructor() {}
                greeting() {return `hi`;}
            }

            class Sub extends Base {
                constructor() {}
                greeting() {return `Hello`;}
            }

            let obj = new Sub();
            consle.log(obj.greeting()) //Hello


- Subクラス内でBaseのコンストラクタ、メソッドを使う際にはsuperキーワードを使う

                class Base {
                    constructor(name) {this.name = name;}
                    greeting() {return `hello ${this.name}`}
                }

                class Sub extends Base {
                    constructor(name, age) {
                        super(name); //Baseクラスのコンストラクター呼び出し
                        this.age = age;
                    }
                    greeting() {
                        return `hi ${age} years old` + supre.greeting;
                    }
                }

### overload

- JavaScriptではオーバーロード機能は使えない
