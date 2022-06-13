class Payment{
    #date;
    #sum;
    #description;
    #status;
    #typePayment
    #user;

    constructor(date, sum, description,typePayment, status){
        this.#date = date;
        this.#sum = sum;
        this.#description = description;
        this.#status = status;
        this.#typePayment = typePayment
        this.#user=user;
    }

    set date(date){this.#date=date;}
    get date(){return this.#date;}

    set sum(sum){this.#sum=sum;}
    get sum(){return this.#sum;}

    set description(description){this.#description=description;}
    get description(){return this.#description;}

    set status(status){this.#status=status;}
    get status(){return this.#status;}

    set typePayment(typePayment){this.#typePayment=typePayment;}
    get typePayment(){return this.#typePayment;}

    set user(user){this.#user=user;}
    get user(){return this.#user;}
}




class CreditCard extends Payment{
    #number;
    #LastFourDigits;
    #code;
    #password;
    #payments;

    constructor(date, sum, description,status,typePayment,user,
                number,lastFourDigits, code, password,payments)
    {
        super(date, sum, description,status, typePayment,user )
        this.#number = number;
        this.#LastFourDigits = lastFourDigits;
        this.#code = code;
        this.#password = password;
        this.#payments = payments;
    }

    set number(number){this.#number=number;}
    get number(){return this.#number;}

    set LastFourDigits(LastFourDigits){this.#LastFourDigits=LastFourDigits;}
    get LastFourDigits(){return this.#LastFourDigits;}

    set code(code){this.#code=code;}
    get code(){return this.#code;}

    set password(password){this.#password=password;}
    get password(){return this.#password;}

    set payments(payments){this.#payments=payments;}
    get payments(){return this.#payments;}
}




class ClearingCompany extends Payment{
    #id;

    constructor(date, sum, description,status,typePayment,user,
                id)
    {
        super(date, sum, description,status, typePayment,user )
        this.#id=id;
    }

    set id(id){this.#id=id;}
    get id(){return this.#id;}

}