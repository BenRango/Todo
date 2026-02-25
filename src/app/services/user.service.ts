import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    username : string 
    email: string
    token : string    
    password : string 
    id : number = 0
    constructor()
    {
        this.username = ""
        this.password = ""
        this.token = ""
        this.email = ""

    }
    setEmail(email : string)
    {
        this.email = email
    }
    setUsername(username : string)
    {
        this.username = username
    }
    setPassword(pass:string)
    {
        this.password= pass
    }
    setToken(token : string)
    {
        this.token = token
        return this
    }
    setId(id : number)
    {
        this.id = id
    }
    getId():number
    {
        return this.id
    }
    getToken():string
    {
        return this.token
    }
    getEmail()
    {
        return this.email;
    }
    getPassword()
    {
        return this.password;
    }
}
