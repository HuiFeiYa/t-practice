新建一个 `ts` 文件，文件名为你的花名，解答下面题目

请在 `ts` 文件中加入一行 `export {}`

- 现有如下 `interface`:

    ```ts
    interface ComplexObject {
        a: string | number | null;
        b: number[];
        c: string[];
        d: {
            m: 'gh' | 'ij';
            n: (1 | 2 | 3)[];
            o: {
                p: unknown;
                q: unknown;
                r: {
                    name: string;
                    rank: number;
                };
            }[];
        }
    }

    let x = {} as ComplexObject;
    ```

    现在有一个对象 `x`，它的类型是 `ComplexObject`，请使用索引访问和索引查询的方法按下列需求进行类型标注（解答此题先上上述代码拷贝到 `ts` 文件中）

    1. 变量 `k`，只能取值 `x` 拥有的属性名称
    2. 变量 `abc`，能将 `x.a`, `x.b`, `x.c` 赋值给它
    3. 变量 `mn`, 能将 `x.d.m`, `x.d.n` 赋值给它
    4. 类型别名 `O`, 为 `x.d.o[0]` 的类型

- 补充下面代码中各个 `interface` 的内容，使得代码通过类型检测，不允许使用 `any`

    ```ts
    interface JqInstance {
        // 补充这里
    }

    interface JqStatic {
        // 补充这里
    }

    let $ = {} as JqStatic;
    $.polyfill();
    $(function(version) {
        console.log(version.split('.'));
        let $d: JqInstance = $('.div');
        let $f: JqInstance = $(document.createElement('p'));
        $d.add($f).addClass('good');
        let h: string = $d.html();
        let $s: JqInstance = $f.html('<span>hello world</span>').addClass('test').appendTo(document.body).find('span').text('hi');
        let s: string = $s.text();
        $d.on('click', function(evt) {
            console.log('click at', evt.x, evt.y, 'text', this.text());
        });
    });
    ```