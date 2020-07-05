# TypeScript

---

# Chapter 1

## 编写 `ts` 代码

- 语法上 `ts` 是 `js` 的超集（superset）。
- `ts` 代码 = `js` 代码 + 类型标注。

    怎么加？在变量声明后面加上 `:` 和 `<type>` 即可。

- `ts` 编译时进行静态类型检测，在运行时不存在类型标注。

    ```ts
    let a: number = 1;
    let b: string = '2';
    function f(x: boolean): void {
        console.log(x);
    }
    ```

    编译后

    ```js
    let a = 1;
    let b = '2';
    function f(x) {
        console.log(x);
    }
    ```
- 可以先写 `js`，然后为关键部分写类型标注，很多情况下 `ts` 能够自动推断变量的类型。
- 代码文件后缀为 `ts` 和 `tsx`， 分别对应 `js` 和 `jsx`。

## tsconfig.json
```json
{
    "compilerOptions": {
        "target": "esnext",
        "strict": true,
    }
}
```
### strict 严格模式
严格模式下，不能将 `null`，`undefined` 赋值给非空类型的变量；还包括其他限制。开启严格模式能够检测处更多潜在的问题。
> 下面的教程主要基于严格模式。

## 基本类型

>`js` 中的 primitive type 包括 `string`, `number`, `boolean`, `undefined`, `symbol`(es6), `bigint`(es2020)。

- Quiz

    ```js
    typeof 1
    typeof 'a'
    typeof Number('1')
    typeof new String('s')
    typeof null
    typeof undefined
    typeof true
    typeof Symbol()
    typeof Object
    typeof Function
    typeof new Date()
    typeof 1n
    ``` 

### `ts` 中的基本类型 与 `js` 对应的部分
```ts
let a: number = 1;
let b: string = '2';
let c: boolean = true;
let d: undefined = undefined;
let e: symbol = Symbol();
let f: bigint = 1n;
```

### `ts` only 部分
```ts
let g: void = function () {}();
let h: null = null;
let i: any = new String();
let j: unknown = 1;
let k: object = function () {};
let l: never = function() { throw 1 }();
```
- `null` 和 `undefined`

    严格模式下，`null` 和 `undefined` 有单独的类型，不能赋值给其他类型的变量。

- `void` 和 `undefined`

    `void` 表示返回值不存在，在运行时返回的值为 `undefined`。

- `any`

    `any` 类型的变量可以赋值给任何其他除 `never` 以外的类型的变量；也可以将任何类型的变量和值赋值给 `any` 类型的变量。可以访问任何属性和方法，`ts` 并不会报错。

    ```ts
    i = g
    i = h
    i.toString()
    ```

    > 使用 `any` 类型的变量失去了 `ts` 类型检测的功能。一般在使用没有注释的第三方代码时，或者变量真的需要 `any` 类型，才使用。

- `unknown`

    任何类型的变量和值都可以赋值给 `unknown`；`unknown` 类型的变量只能赋值给 `unknown` 或者 `any` 类型的变量。不可以访问任何属性和方法；如果需要，必须进行运行时类型判断。

    ```ts
    j.toString(); // error

    if (typeof j === 'number') {
        j.toFixed(2); // ok
    } else if (typeof j === 'string') {
        j.slice(1); // ok
    }
    ```

- `object`

    非 primitive type 的值和变量（当然，包括 `any` 类型）可以赋值给 `object` 类型的变量，其他类型不可以。只能访问 `toString` 等通用的属性。

- `never`

    当一个函数不会回时，比如报错、程序退出、无限循环，那么它的返回值类型就是 `never`。

    `never` 类型的变量可以赋值给任意类型的变量；只有 `never` 类型的变量才能赋值给 `never` 类型的变量。

    > 可以这么理解，你 *不可能* 把一个其他类型的变量或值赋值给 `never`（*不可能*）类型的变量；当你要把一个 `never` 类型的变量赋值给其他类型的变量时，因为你 *不可能* 取到这个值，因此赋值会被中断，`ts`也就不报错了。

    ```ts
    let nn: never;
    nn = 1; // error
    nn = b; // error
    nn = i; // error
    nn = l; // okay
    ```

## 类型断言 (Type Assertion)
在 `ts` 无法判断类型的情况时，如果我们知道某个变量具体类型是什么，可以使用断言告知 `ts` 这一信息。

```ts
let b: unknown = 10;
b.toFixed(1); // error
(b as number).toFixed(2); // okay

let c = b as string;
c.slice(); // okay; runtime error
(b as string).length; // okay
(<string>b).length; // okay
```

## 联合类型 (Union)
一般情况下，不能将其他类型的变量和值赋值给另一个变量；但时很多时候我们需要支持给一个变量赋值多种类型的变量和值，此时我们需要联合类型。

```ts
let sn: string | number;
let nb: number | boolean;
let nn: number | null;

sn = '1'; // okay
sn = null; // error
nb = '1'; // error
nn = null; // okay
nn = undefined; //error
```

## 数组 (Array) 与元组 (Tupple)
```ts
let numberArr: number[] = [];
let stringArr: string[] = [];

numberArr.push(1); // okay
stringArr.push('2'); // okay
numberArr.push('3'); //error
stringArr[4] = '4'; //okay
numberArr.push[5]; // error

let xyTupple: [number, number] = [0, 0];
xyTupple[0] = 1;
xyTupple[1] = '1'; //error
xyTupple[2] = 0; //error
```

> 数组类型还可以使用 `Array<T>` 来表示，比如 `let numberArr: Array<number>;`

- 一个数组同时支持 `string` 和 `number` 元素，该怎么标注呢？

    ```ts
    let array1: string | number[];
    // or
    let array2: string[] | number[];
    ```

    <br><br><br><br><br><br><br>
    正确写法

    ```ts
    let array3: (string | number)[];
    // or
    let array4: Array<string | number>;
    ```

## 类型别名 (Alias)
可以使用类型别名来简化类型标注，同时提供更有意义的名字。

```ts
type StringOrNumber = string | number;
type ArrayOfStringOrNumber = (string | number)[];

let x: StringOrNumber;
x = '0';
x = 1;

let arr: ArrayOfStringOrNumber = [];
arr.push(1);

type UserId = StringOrNumber;
```

## 函数
- 给以下代码中的函数参数添加类型标注

    假设 `add` 函数接收两个 `number` 类型的参数，`myAdd` 函数接收两个 `string` 类型的参数

    ```ts
    function add(x, y) {
        return x + y;
    }

    let myAdd = function (x, y) {
        return x.slice(0, 1) + y.slice(1);
    };
    ```

    <br><br><br><br><br><br><br>

    ```ts
    function add(x: number, y: number) {
        return x + y;
    }

    let myAdd = function (x: string, y: string) {
        return x.slice(0, 1) + y.slice(1);
    };
    ```

    > IDE 里把指针分别移动到两个名称上查看类型格式的区别。Why?

### 如何给函数添加类型标注
- 函数

    ```ts
    function foo(param1: string, param2: number): boolean {
        if (param1.length >= param2) {
            return true; // 返回值（true）需要能赋值给声明的返回类型（boolean）
        }
        // if 条件不成立时，函数返回 undefined，因为 undefined 不能赋值给 boolean，此时 ts 报错
    }
    ```

- 函数变量

    ```ts
    let bar: (x: string, y: number) => boolean = function (x, y) {
        // ts 自动推断 x, y 的类型
        return x.length > y;
    }

    function notEmpty(s: string) {
        return s.length > 0;
    }

    bar = notEmpty; // okay，因为调用 bar 时，会传入一个 string 类型和一个 number 类型的参数，notEmpty 只需要第一个，多余的不会影响

    function sumToZero(n: number, m: number) {
        return n + m === 0;
    }

    bar = sumToZero; // error
    ```

- 可选参数和默认参数

    ```ts
    function inc(x: number, amount = 0) {
        return x + amount;
    }

    function sub(x: number, y?: number) {
        if (typeof y !== 'undefined') {
            return x - y;
        }
        return x;
    }

    function mul(x: number, y: number | undefined) {
        if (typeof y === 'number') {
            return x * y;
        }
        return x;
    }

    let fn: (a: number, b?: number) => number;
    fn = inc; // okay
    fn = sub; // okay
    fn = mul; // okay

    inc(10); // okay
    sub(10); // okay
    mul(10); // error
    ```

- Rest 参数

    ```ts
    function pickLarger(baseline: number, ...arr: number[]) {
        return arr.filter((v) => v > baseline);
    }

    let bigThanFive: (...arr: number[]) => number[];
    bigThanFive = pickLarger; // okay，但调用时候第一个数字必须是 5
    bigThanFive = pickLarger.bind(null, 5); // okay

    function pickLonger(len: number, ...arr: string[]) {
        return arr.filter((s) => s.length > len);
    }

    let longerThanTwo: (...arr: string[]) => string[];
    longerThanTwo = pickLonger; // error
    longerThanTwo = pickLonger.bind(null, 2); // okay
    ```


## 非空断言 (Non-null assertion)
一个变量被标记为可空的，在某些情况下我们知道不会为空，可以使用非空断言(`x!`)来告知 `ts` 这一信息。

```ts
let nullableString: string | null | undefined;

function checkNotEmpty(s: unknown): boolean {
    return typeof s === 'string' && s.length > 0;
}

if (checkNotEmpty(nullableString)) {
    console.log(nullableString!.slice(0, -1));
}

function foo(s?: string) {
    if (checkNotEmpty(s)) {
        console.log(s!.length);
    }
}
```

## 字面量类型 (Literal Types)
在很多时候，某个变量或某个参数能获取的值的范围是固定的，此时可以直接用这些值的联合来作为类型。

```ts
let weekday: 'mon' | 'tue' | 'wed' | 'thu' | 'fri';
let weekend: 'sat' | 'sun';

weekday = 'mon'; // okay
weekday = 'Mon'; // error

weekend = 'sun'; // okay
weekend = weekday; // error

function planForWeekend(day: 'sat' | 'sun') {
    // ...
}

planForWeekend(weekday); // error

function onlyOdd(n: 1 | 3 | 5 | 7 | 9) {
    // ...
}

onlyOdd(2); // error

onlyOdd(Math.random()); //error
```

> 练习：使用类型别名简化上面的类型标注

> 不要把数字字面量的联合（`let x: 1 | 2 | 3`）与数字按位或的操作（`let x = 1 | 2 | 3`）搞混了。 

## 枚举 (Enum)
我们经常会遇到需要使用不同的整数来区分状态编码或者类似的场景，但是直接使用数字不便于代码阅读，需要注释来区分不同的值代表什么意思。

```ts
function dealWithStatus(status: number) {
    switch (status) {
        case 100: // 状态a
            // ...
            break;
        case 101: // 状态b
            // ...
            break;
        default:
            // ...
            break;
    }
}
```

常用的解决方法有

```ts
// 1. 为每个状态写一个 const 常量

/** 状态a */
const statusA = 100;
/** 状态b */
const statusB = 101;

// 2. 使用 const 对象

const statuses = {
    /** 状态a */
    A: 100,
    /** 状态b */
    B: 101,
};
```

但是这些方法不能很好的为 `status` 参数来标注类型。可以使用 `enum` 来解决这个问题。

### numberic enums

```ts
enum WorkStatus {
    READY = 1000,
    DOING,
    DONE,
    ABORT = -1,
};

function handleWorkStatus(status: WorkStatus) {
    switch (status) {
        case WorkStatus.READY:
            // ...
            break;
        case WorkStatus.DOING:
            // ...
            break;
        default:
            // ...
            break;
    }
}
```

### string enums
除了数字类型的枚举，还可以有字符串类型的枚举。

```ts
enum ProductOptionCode {
    BIRTHDAY = 'srv_gen_enum_code_bd',
    PHONE = 'srv_gen_enum_code_ph',
};
```

## 函数重载 (Overload)
假设需要写一个函数 `funny`，允许传入一个 `string`、`number` 或者 `boolean` 类型的参数；要求

- 如果传入的是个 `string` 类型的参数, 返回它的长度，即返回值类型为 `number`；
- 如果传入的是个 `number` 类型的参数，返回它是否是偶数，即返回类型为 `boolean`；
- 如果传入的是个 `boolean` 类型的参数，返回它的字符串表示 `"true"` 或者 `"false"`，即返回类型是 `string`。

如何为 `funny` 编写类型标注，使 `ts` 能够知道 返回类型 和参数类型的对应信息呢？

```ts
// 声明
function funny(s: string): number;
function funny(n: number): boolean;
function funny(b: boolean): string;

// 实现
function funny(x: string | number | boolean) {
    if (typeof x === 'string') {
        return x.length;
    } else if (typeof x === 'number') {
        return x % 2 === 0;
    } else {
        return JSON.stringify(x);
    }
}

let y = funny(funny(funny(true)));
```

---

# Chapter 2

## Interface

### 标注对象的类型 - 对象的形状

```ts
let point: { x: number; y: number };

point = {
    x: 1,
    y: 2,
}

function printPoint(p: { x: number; y: number; }) {
    console.log(`point is (${p.x}, ${p.y})`);
}

printPoint(point);
```

> 鸭子类型 （Duck Typing）
>
> 如果一只动物走起来像鸭子、游泳起来像鸭子、叫起来也像鸭子,那么这只动物就可以被称为鸭子。

`ts` 的一个基本原则是，类型检测侧重于对象用于的形状；如果形状符合要求，就能通过检测。

```ts
let rect = {
    x: 10,
    y: 100,
    width: 100,
    height: 50,
};

printPoint(rect); // okay

function printWidth(p: { x: number; y: number; }) {
    console.log(`width is (${p.width})`); // error: Property 'width' does not exist on type '{ x: number; y: number; }'.
}

printWidth(rect);
```

> 我们可以使用类型别名来提起上述对象的类型

```ts
type PointObject = { x: number; y: number };

let point: PointObject;

function printPoint(p: PointObject) {
    console.log(`point is (${p.x}, ${p.y})`);
}
```

### 使用 `interface` 为对象的形状命名

```ts
interface Point {
    x: number;
    y: number;
}

function printPoint(p: Point) {
    console.log(`point is (${p.x}, ${p.y})`);
}

let rect = {
    x: 10,
    y: 100,
    width: 100,
    height: 50,
};

printPoint(rect); // okay

interface Vector {
    x: number;
    y: number;
}

interface Triangle {
    p1: Point;
    p2: Point;
    p3: Point;

    area(): number;
    offset(v: Vector): Triangle;
}

function useTriangle(triangle: Triangle) {
    console.log('area is', triangle.area());
    const nt = triangle.offset(triangle.p1);
    console.log('nt area is', nt.area());
}
```

### 方法重载

```ts
interface Vue {
    $nextTick(callback: () => void, context?: any[]): void;
    $nextTick(): Promise<void>
}
```

### 可选属性

```ts
interface VNode {
    tag?: string;
    text?: string;
    children?: VNode[];
    isComment: boolean;
}

function getAllText(node: VNode): string {
    return node.text + node.children.map(getAllText).join(''); // error: Object is possibly 'undefined'.
}
```

### 只读属性

```ts
interface Point {
    readonly x: number;
    readonly y: number;
}

let p1: Point = { x: 10, y: 20 };
p1.x = 30; // error: Cannot assign to 'x' because it is a read-only property.

if (p1.x = 10) { // error: Cannot assign to 'x' because it is a read-only property.
    // ...
}
```

- 只读数组 `ReadonlyArray<T>`

    ```ts
    let a: number[] = [1, 2, 3, 4];
    let ro: ReadonlyArray<number>;

    ro = a; // okay

    a.push(5); // okay
    ro.push(6); // error
    ro.length = 10; // error
    a = ro; // error;
    ```

### 多余属性检查

```ts
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    return {
        color: config.color ?? 'red',
        area: config.width ?? 20,
    };
}

let mySquare = createSquare({
    colour: 'green', // error: Argument of type '{ colour: string; width: number; }' is not assignable to parameter of type 'SquareConfig'. Object literal may only specify known properties, but 'colour' does not exist in type 'SquareConfig'. Did you mean to write 'color'?
    width: 100,
});

let obj = {
    colour: 'yellow',
    width: 200,
};
createSquare(obj); // okay
```

### 函数类型
查看如下代码

```ts
let f1: (x: number, y: number) => number;
let f2: (x: number, y: number) => number;
let f3: (x: number, y: number) => number;
```

如何提取上面相同的类型标注？

```ts
// 别名
type NumberOp = (x: number, y: number) => number;

// 类型
interface NumberFunc {
    (x: number, y: number): number;
}

let f4: NumberOp = Math.pow; // okay
let f5: NumberFunc = Math.min; // okay
```

### 可索引类型 (Indexable Type)

```ts
interface StringToString {
    [index: string]: string;
}

let ss: StringToString = {};
ss['mon'] = '星期一';
ss['sun'] = '星期日';

interface ReadOnlyStringToString {
    readonly [index: string]: string;
}

let rss: ReadOnlyStringToString = ss;
rss['tue'] = '星期二'; // error

interface MyStringArray {
    [index: number]: string;
    length: number;
    push(x: string): void;
}

let ms: MyStringArray = ['a', 'b']; // okay
ms[2] = 'c'; // okay
ms.join(','); // error
```

> 实战：标注接口返回类型。http://yapi.wxb.com.cn/project/75/interface/api/5067

### 接口继承

```ts
interface Shape {
    color: string;
}

interface Round {
    radius: number;
}

interface Square extends Shape {
    sideLength: number;
}

interface Circle extends Shape, Round {
}
```

### 混合类型 (Hybrid Type)
考察 `jQuery` 的使用

- 可以当作函数来执行: `$('#input')`
- 可以访问属性和方法: `$.ready`, `$.noConflict()`

如何编写一个简单的类型来满足上面的场景呢？

```ts
interface SimpleJquery {
    (selector: string): any;
    ready: Then;
    noConflict(): void;
}

interface Then {
    then(callback: () => void): void;
}

function useJquery($: SimpleJquery) {
    $.ready.then(function () {
        $.noConflict();
        $('input').val('hello world');
    });
}
```

## Class

```ts
class Animal {
    public name: string;
    readonly id: number;
    private _zoo?: Zoo;

    constructor(theName: string, readonly kind: string) {
        this.name = theName;
        this.id = Date.now() + Math.random();
    }

    get zoo(): Zoo | undefined {
        return this._zoo;
    }

    set zoo(newZoo) {
        if (this._zoo && newZoo !== this._zoo) {
            this._zoo.removeAnimal(this);
        }
        this._zoo = newZoo;
    }

    speak() {
        console.log(`${this.name}(${this.id}) 说：`);
    }

    protected sleep() {
        console.log(`${this.name}(${this.id}) 睡了`);
    }
}

class Cat extends Animal {
    static Kind = 'Cat';

    static isCat(a: Animal) {
        return a instanceof Cat;
    }

    constructor(name: string) {
        super(name, Cat.Kind);
    }

    speak() {
        super.speak();
        console.log('喵~');
    }

    climb() {
        console.log('爬');
    }

    protected sleep() {
        super.sleep();
        console.log('白天睡觉');
    }
}

class Dog extends Animal {
    static Kind = 'Dog';

    constructor(name: string) {
        super(name, Dog.Kind);
    }

    static isDog(a: Animal) {
        return a instanceof Dog;
    }

    speak() {
        super.speak();
        console.log('汪~');
    }
}

class Zoo {
    private animals: Animal[] = [];

    constructor(public readonly name: string, public readonly address: string) {
    }

    addAnimal(animal: Animal) {
        this.animals.push(animal);
    }

    removeAnimal(animal: Animal) {
        const i = this.animals.indexOf(animal);
        if (i >= 0) {
            this.animals.splice(i, 1);
        }
    }

    get allCats() {
        return this.animals.filter(Cat.isCat) as Cat[];
    }

    get allDogs() {
        return this.animals.filter(Dog.isDog) as Dog[];
    }
}

const zoo = new Zoo('ideacome', '西溪湿地');
zoo.address = '西湖边'; // error

const tom = new Cat('tom');
const goofy = new Dog('goofy');

zoo.addAnimal(tom);
tom.speak();

tom.zoo = undefined;

zoo.allCats.forEach((cat) => {
    cat.climb();
});

zoo.addAnimal(goofy);

goofy.Kind; // error
```

### 接口实现

```ts
interface Flyable {
    readonly wings: number;
    fly(): void;
}

interface Swimmable {
    swim(): void;
}

class Plane implements Flyable {
    wings = 2;
    fly() {
        console.log('收起小桌板，调直座椅靠背...');
    }
}

class Duck implements Flyable, Swimmable {
    wings = 2;
    fly() {
        console.log('哗哗哗');
    }
    swim() {
        console.log('嘎嘎嘎');
    }
}
```

### 抽象类

```ts
abstract class Widget {
    constructor(public x: number, public y: number) { }

    move(dx: number, dy: number) {
        this.x += dx;
        this.y += dy;
    }

    abstract draw(): void;
}

class Line extends Widget {
    constructor(x: number, y: number, public tx: number, public ty: number) {
        super(x, y);
    }

    draw() {
        console.log('draw line');
    }
}

class Circle extends Widget {
    constructor(x: number, y: number, public radius: number) {
        super(x, y);
    }

    draw() {
        console.log('draw circle');
    }
}

let w: Widget;
w = new Line(0, 0, 1, 2);
w = new Circle(1, 1, 5);
w = new Widget(1, 2); // error
```

### `class` = `instance interface` + `constructor function`

ES5 下，创建一个类通常是这么做的

```js
var MyClass = (function() {
    function MyClass(x) {
        this.x = x;
    }

    MyClass.prototype.sayHi = function () {
        console.log('hi', this.x);
    }

    MyClass.logTime = function() {
        console.log('time');
    }

    return MyClass;
})();

var c = new MyClass(1);
MyClass.logTime();
c.sayHi();
```

如果给 `MyClass` 写类型标注，会是这样:

```ts
interface MyClass {
    x: number;
    sayHi(): void;
}

interface MyClassConstructor {
    new (x: number): MyClass;
    logTime(): void;
}

let MyClass: MyClassConstructor;
```

可以将 `class` 当作 `interface` 使用

```ts
class Point {
    x: number = 0;
    y: number = 0;
}

interface Point3d extends Point {
    z: number;
}

let point3d: Point3d = { x: 1, y: 2, z: 3 };
```

## 索引 (Index)

### 索引访问 (Indexed Access)

```ts
interface SomeDeepObject {
    name: string;
    id: number;
    summary: {
        a: string;
        b: number;
        c: {
            p: boolean;
            q: boolean;
        };
    };
    listByType: {
        [type: string]: {
            itemName: string;
            x: number;
            y: number;
        }[];
    };
}

let someObject: SomeDeepObject;

let summary: SomeDeepObject['summary'];

type SummaryType = SomeDeepObject['summary'];

let listItem: SomeDeepObject['listByType'][''][0];

type ListItemType = typeof listItem;
```

### 索引查询 (Index type query)

```ts
let o = {} as SomeDeepObject;

function saveProperty(o: SomeDeepObject, key: string) {
    // ...
}

saveProperty(o, 'sumary');  // okay
```

如何限制 `key` 只能是 `SomeDeepObject` 的属性名称呢?

```ts
function saveProperty(o: SomeDeepObject, key: keyof SomeDeepObject) {
    // ...
}

saveProperty(o, 'sumary');  // error
```

### 两者结合

```ts
interface SomeObject {
    a: number;
    b: string;
    c: boolean;
    d: string[];
}

function getProperty(o: SomeObject, p: keyof SomeObject): SomeObject[keyof SomeObject] {
    return o[p];
}

let so: SomeObject = {
    a: 1,
    b: '2',
    c: false,
    d: ['4','5','6'],
};

let x = getProperty(so, 'e'); // error

let keys: Array<keyof SomeObject> = ['a', 'b', 'c'];
keys.push('d');
keys.push('f'); // error

let values: Array<SomeObject[keyof SomeObject]> = [];
values.push(getProperty(so, 'c'));
values.push([]);
values.push('1');
values.push(false);
values.push([1]); // error

// 目前 getProperty 的函数类型标注无法让下列代码通过 ts 检测，但其实可以使用更高级的写法实现

let a: number = getProperty(so, 'a'); // error
let d: string[] = getProperty(so, 'd'); // error
```

## 类型推断 (Type Inference)

### 最佳共同类型

```ts
let x = [0, 1, null]; // x: (number | null)[]


class Parent {
    a = 1;
}
class Child1 extends Parent {
    b = 2;
}
class Child2 extends Parent {
    b = 3;
}

let c = [new Child1(), new Child2()]; // c: (Child1 | Child2)[]
let d = [new Child1(), new Child2(), new Parent()]; // d: Parent[]

let f = function() {
    if (Math.random() > 0.5) {
        return new Parent();
    } else {
        return new Child1();
    }
} // f: () => Parent
```

### 上下文类型

```ts
window.addEventListener('mousedown', (event) => { // event: MouseEvent
    console.log('mouse down', event.x);
    console.log(event.src); // error
});
```

## `this`

### `this` parameter
下面的代码有什么问题？

```ts
class Logger {
    constructor(readonly tag: string) {}

    log(evt: Event) {
        console.log(this.tag, evt);
    }
}

class UIElement {
    onclickListeners: Array<(e: Event) => void> = [];

    addClickEventListener(onclick: (e: Event) => void) {
        this.onclickListeners.push(onclick);
    }

    triggerClick() {
        this.onclickListeners.forEach((onclick) => {
            onclick(new Event('click'));
        });
    }
}

const el = new UIElement();

const logger = new Logger('page one');

el.addClickEventListener(logger.log);

el.triggerClick();
```

查看下面的例子：

```ts
const img = document.createElement('img');

function a() {
    console.log(this.width, this.height); // error
}
img.addEventListener('load', a);

img.addEventListener('load', function () {
    console.log(this.width, this.height);
});
```

添加 `this` 的类型：

```ts
const img = document.createElement('img');

function a(this: HTMLImageElement) {
    console.log(this.width, this.height); // okay
}
img.addEventListener('load', a);

a(); //error
a.call(img); // okay
```

```ts
class Logger {
    constructor(readonly tag: string) {}

    log(this: Logger, evt: Event) {
        console.log(this.tag, evt);
    }
}

type OnClickCallback = (this: UIElement, e: Event) => void;

class UIElement {
    onclickListeners: OnClickCallback[] = [];

    addClickEventListener(onclick: OnClickCallback) {
        this.onclickListeners.push(onclick);
    }

    triggerClick() {
        this.onclickListeners.forEach((onclick) => {
            onclick(new Event('click')); // error
        });
    }
}

const el = new UIElement();

const logger = new Logger('page one');

el.addClickEventListener(logger.log); // error

el.triggerClick();
```
