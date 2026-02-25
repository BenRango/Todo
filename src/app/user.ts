export class User {
    token: string=""
    email: string
    username: string
    password : string
    id : number = 0
    constructor()
    {
        this.username = ""
        this.password  = ""
        this.email = ""
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
}
