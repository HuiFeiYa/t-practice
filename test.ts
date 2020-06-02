// null 和 undefined 不可以赋值给其他类型的变量
let a = '1'
a = undefined


// unknown 任何类型的变量和值都可以赋值给 unknown；unknown 类型的变量只能赋值给 unknown 或者 any 类型的变量
// 对 unknow 类型对参数进行操作时候需要进行判断

let j: unknown
j.toString()

if(typeof j === 'string'){
  j.toString()
}else if(typeof j === 'number'){
  j.toFixed(1)
}


// 断言: 在 ts 无法判断类型的情况时，如果我们知道某个变量具体类型是什么，可以使用断言告知 ts 这一信息

function getData(value:unknown){
  return value
}

let result = getData(1)
// 告诉 ts 我知道它对类型是 number
let c = result as number
c.toFixed(2)


//  非空断言：一个变量被标记为可空的，在某些情况下我们知道不会为空，可以使用非空断言(`x!`)来告知 `ts` 这一信息。
// 格式 xxx! 表示 xxx 变量非空

function checkNotEmpty(s: unknown): boolean {
  return typeof s === 'string' && s.length > 0;
}

function coo(s?:string){
  // checkNotEmpty 判断出 s 是一个字符串，并且非空
  if(checkNotEmpty(s)) {
    console.log(s!.length)
  }
}
coo()

// 联合类型 一般情况下，不能将其他类型的变量和值赋值给另一个变量；但时很多时候我们需要支持给一个变量赋值多种类型的变量和值，此时我们需要联合类型。



let title: string | number
title = 'aaa'
title = '111'



// 字面量类型，在很多时候，某个变量或某个参数能获取的值的范围是固定的，此时可以直接用这些值的联合来作为类型。


function planForWeekend(day: 'sat' | 'sun') {
  // ...
}

// 数组


// 支持 number 类型子项的数组
let numberArr: number[]

numberArr = [1,23,3]

numberArr = [1,'addd']
numberArr.push(22)
numberArr.push('111')


// 支持子项为 string 或 number 
let arrStringOrNumber: (string | number) []

arrStringOrNumber = [1,2,'222']


// 子项要么都是 number 或者都是 string
let arr2StringOrNumber: string[] | number[]

arr2StringOrNumber = [1,2,3]
arr2StringOrNumber = ['1111','222']




// 类型别名

type ArrayOfStringOrNumber  = (string | number)[]

let arr: ArrayOfStringOrNumber

arr = [1,2]



// 函数

function foo(x:number,y:number):boolean{
  return x - y > 0
}

// 设置 rest 数组的类型
function big(...rest:number[]) {
  return rest.filter(item=>item>4)
}


// enum 枚举属于值，如果给一个对象设置标注为枚举，也就是说这个对象只能去取枚举对象中的值

/** 状态a */
const statusA = 100;
/** 状态b */
const statusB = 101;


const statuses = {
  /** 状态a */
  A: 100,
  /** 状态b */
  B: 101,
};

enum WorkStatus {
  // 自动递增
  READY = 1000,
  DOING
}
function handleWorkStatus(status:WorkStatus) {
  switch (status) {
    case WorkStatus.DOING:
      
      break;
  
    case WorkStatus.READY:
      break;
  }
}

// never 常用


// 抛出异常的函数永远不会有返回值
function error(message: string): never {
  throw new Error(message);
}

// 空数组，而且永远是空的
const empty: never[] = []


// 元组 表示一个已知元素数量和类型的数组

let x: [string, number];
x = ['hello', 10]; // OK
x = [10, 'hello']; // Error
x = ['sdfsdf','dsfsdf']

x.push(2222)



// 接口

// 直接描述函数类型
interface Say {
  (words:string) : string
}


interface User {
  age?:number
  name:string
  readonly isMale:boolean
  say:(words:string) => string
  hello(num:number):boolean
}

// 传入
interface Config {
  width?: number;
  [propName: string]: any;
}




// 泛型在函数名称后面声明泛型变量 <T>,它用于 【捕获开发者传入的参数类型] ，然后我们可以使用 T做参数类型和返回类型了。
// 用于标注函数,类，接口 设计泛型的关键目的是在成员之间提供有意义的约束

function getArrayLength <T>(arg:T[]){
  console.log('-', arg.length)
  return arg
}



// 索引类型 keyof T 把传入对象的属性类型取出生成一个联合类型
function getValue<T extends object, U extends keyof T>(obj: T, key: U) {
  return obj[key] 
}


const obj = {
  name:'dd',
  age:1
}
getValue(obj,'name')

// 多类型约束

interface First {
  doSomething():number
}
interface Second {
  doElse():string
}

class Demo <T extends First & Second> {
  private generic!: T
  use() {
    this.generic.doSomething()
    this.generic.doElse()
  }
}


// 装饰器 当装饰器作为修饰类的时候，会把构造器传递进去，然后在构造函数的原型上添加值
// 给类添加装饰器
function addAge(constructor: Function) {
  console.log('constructor',constructor)
  constructor.prototype.age = 18
}

@addAge
class Person {
  name: string;
  age!: number;
  constructor() {
    this.name = 'xiaomuzhu'
  }
}

let person = new Person()
console.log(person.age)



// 给类中的方法添加装饰器 装饰器中的方法会接受三个参数 当前类、被装饰的函数名、是否可读写遍历
/**
 * 
 *  class Person1 {
      constructor() {
          this.name = 'xiaomuzhu';
      }
      say() {
          return 'instance method';
      }
      static run() {
          return 'static method';
      }
    }
    prop run
    desc {"writable":true,"enumerable":false,"configurable":true}
 * 
 * 
 */



// is 关键词把参数类型缩小 如通过 test is string 来将 test 的类型缩小为 string

function isString(test: any): test is string{
  return typeof test === 'string';
}

function example(foo: number | string){
  if(isString(foo)){
      console.log('it is a string' + foo);
      console.log(foo.length); // string function
  }
}
example('hello world');


const car2 = {}