interface SomeObject {
  a: number;
  b: string;
  c: boolean;
  d: string[];
}

// 获取类型中所有的key
function getProperty<T,U extends keyof T>(o: T, p:U) : T[U]{
  return o[p]
}

let so: SomeObject = {
  a: 1,
  b: '2',
  c: false,
  d: ['4','5','6'],
};

let a: number = getProperty(so, 'a'); // error
let d: string[] = getProperty(so, 'd'); // error


type P1<T> = {
  // 获取值中的key
  [P in keyof T] ?: T[P]
}
export {}