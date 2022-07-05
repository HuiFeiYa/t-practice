function identity<Type>(arg: Type): Type {
  if(typeof arg === 'string' || Array.isArray(arg)){
    console.log(arg.length)
  }
  return arg;
}

function ReturnString1(arg:string): string {
  return arg
}
const ReturnString2 = (arg:string):string => arg
let myIdentity: <Type>(arg: Type) => Type;



let v = ReturnString1('2') 
let r1: typeof v = ''
let r : typeof ReturnString1('2') 