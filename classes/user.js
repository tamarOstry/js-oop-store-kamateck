class User{
    #name;
    #email;
    #password;
    #shopping_bag;
    constructor(name, email, password, shopping_bag){
        this.#name = name;
        this.#email = email;
        this.#password = password;
        this.#shopping_bag = shopping_bag;
    }

    set name(name){this.#name=name;}
    get name(){return this.#name;}

    set email(email){this.#email=email;}
    get email(){return this.#email;}

    set password(password){this.#password=password;}
    get password(){return this.#password;}

    set shopping_bag(shopping_bag){this.#shopping_bag=shopping_bag;}
    get shopping_bag(){return this.#shopping_bag;}
}