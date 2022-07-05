function delay(n) {
	return new Promise((res,rej)=> {
		setTimeout(()=> {
			res(n)
		},n * 1000)		
	})
}
let task = [1,2,3]
class MyPromise{
  cbs = []
  value
  reason
  status = 'pendding'
  static resolve(target) {
    const type = typeof target
    if(target instanceof Promise) {
      return target
    }
    else if( type === 'object' && target !== null) {
      if(target.then) {
        return new MyPromise(resolve => {
          resolve(target)
        }).then(target.then)
      }else {
        return new MyPromise(resolve => {
          resolve(target)
        })
      }
    }else {
      return new MyPromise(resolve => {
        resolve(target)
      })
    }
  }
	constructor(callback) {
		if(typeof callback !== 'function'){
      throw new TypeError(callback + 'is not function')
    }
    callback(this.resolve.bind(this),this.reject.bind(this))
	}
  resolve(val) {
    this.value = val
    this.status = 'resolved'
    setTimeout(() => {    
      this.cbs.forEach(cb => {
        cb(val)
      })
    }, 0);
  }
  reject(reason) {
    this.reason = reason
    this.status = 'rejected'
  }
  /**
   * 将 cb 添加到 cbs 中
   * 返回一个 promise 
   * @param cb 
   * @returns MyPromise
   */
  then(cb) {
    return new MyPromise((resolve,reject)=> {
      try{
        let r = cb()
        resolve(r)
      }catch (error) {
        reject(error)
      }
    })
  }
}

let p = new MyPromise((resolve)=> {
  resolve(1)
})
let p1 = p.then(res=> {
  console.log('res',res)
})
console.log('log 1')