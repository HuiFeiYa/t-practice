function fn(x: string): boolean;
// Return type isn't right
function fn(x: number): boolean;

function fn(x:string|number) {
  return Boolean(x)
}
function len(s: string): number;
function len(arr: any[]): number;
function len(x: any) {
  return x.length;
}

let v = Math.random() > 0.5 ? "hello" : [0]
len(v);

function f2(a: unknown) {
  if(typeof a === 'object' && a !== null  ) {
    if('b' in a ) {
      a.b
    }
  }
}
