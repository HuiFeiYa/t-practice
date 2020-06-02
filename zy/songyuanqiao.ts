// 1
type FunctionForm = (param1:any,param2:any)=>void

interface ObjectForm {
  handler:FunctionForm,
  deep?:boolean,
  immediate?:boolean
}
type ArrayForm = (string | FunctionForm | ObjectForm)[]
interface Watch {
  [key:string]: string | FunctionForm | ObjectForm | ArrayForm
} 

// 2

class Father {
  static wife = 'Wife'
  readonly secret:string[]
  protected assets:number = 0
  constructor(secret:string[],assets:number) {
    this.secret = secret
    this.assets = assets
  }
  public skill(list:string[]) {
    list.forEach(item=>{
      console.log('是时候展现真正的技术了' + item)
    })
  }
  private store(list:number[]) {
    let total:number = 0
    total = list.reduce((acc,cur)=>{
      return acc + cur
    },0)
    console.log('金库总额',total)
  }
  protected money(base:number,year:number) {
    let total:number = 0
    total = Math.pow(1.2,year) * base
    this.assets = total
    console.log('很多钱',total)
  }
}
class Child extends Father {
  static grade:string
  constructor(readonly secret:string[]) {
    super(['1','2'],1000)
  }
  public skill(list:string[]) {
    console.log('学')
    super.skill(list)
  }
  private game(list:string[]) {
    list.forEach(item=>{
      console.log('good game' + item)
    })
  }
  protected pay(){
    this.money(3000,5)
    console.log('零花钱',this.assets)
  }
}