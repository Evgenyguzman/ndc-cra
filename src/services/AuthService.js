export class AuthService{
  
  // must be singletone

  constructor(){
    this.user = getUser()
  }

  isHasToken(){
    return (this.user.token) ? true : false
  }

  getUser(){
    return localStorage.getItem('user') || {}
  }

  getToken(){
    return this.user.token
  }

  setUser(user){
    localStorage.setItem('user', user)
  }

}