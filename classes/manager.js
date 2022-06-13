class Manager{
    #name;
    #email;
    #password;
    constructor(name, email, password){
        this.#name = name;
        this.#email = email;
        this.#password = password;
    }

    set name(name){this.#name=name;}
    get name(){return this.#name;}

    set email(email){this.#email=email;}
    get email(){return this.#email;}

    set password(password){this.#password=password;}
    get password(){return this.#password;}

}