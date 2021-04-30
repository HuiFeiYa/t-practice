

export interface User {
  name: string
  age?: number
  isMale: boolean
}
const getUserName = (user: User) => {
  let age = user.age
  if(age){
    age > 2
  }else{
    console.log('未提供 age')
  }
}
getUserName({name:'dd',isMale:false})