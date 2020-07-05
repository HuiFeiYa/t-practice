interface A {
  x?: number;
  y: string;
  z?: boolean;
}

interface B {
  x: number;
  y?: string;
  z: boolean;
}

type xzFromA = Required<(Omit<A,'y'>)>

type zFromA = Partial<(Pick<A,'y'>)>

type LikeB = xzFromA & zFromA

let foo:LikeB = {
  x:1,
  z:false
}
export {}