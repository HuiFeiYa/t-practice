
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

// 1
let k: typeof x

// 2 
let abc : (typeof x.a | typeof x.b | typeof x.c)
// 3

let mn : (typeof x.d.m | typeof x.d.m )
// 4
type O = typeof x['d']['o'][0]

interface Vsrsion {
  split(param:string):void
}
interface Callback {
  (version:Vsrsion):void
}
interface Text {
  text(param:string):JqInstance
}
interface Find {
  find(param:string):Text
}
interface AppendTo {
  appendTo(param:HTMLElement):Find
}
interface AddClass {
  addClass(param:string):AppendTo
}
interface JqInstance {
  // 补充这里
  add(param:JqInstance):AddClass;
  html():string;
  html(param:string):AddClass;
  text():string;
  on(param:string,param1:(this:JqInstance,e:MouseEvent) => void):void;
  
}
interface JqStatic {
  // 补充这里
  polyfill:()=>void;
  (param:Callback|HTMLElement|string):JqInstance;
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

export {}