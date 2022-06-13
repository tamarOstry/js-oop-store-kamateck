  class Product{
    #id;
    #name;
    #category;
    #price;
    #unitsInStock;
    #imageUrl;

    constructor(id,name,category,price,unitsInStock,imageUrl){
      this.#id=id;
      this.#name=name;
      this.#category=category;
      this.#price=price;
      this.#unitsInStock=unitsInStock;
      this.#imageUrl=imageUrl;
    }  

    set id(id){this.#id=id;}
    get id(){return this.#id;}

    set name(name){this.#name=name;}
    get name(){return this.#name;}

    set category(category){this.#category=category;}
    get name(){return this.#category;}

    set price(price){this.#price=price;}
    get price(){return this.#price;}

    set unitsInStock(unitsInStock){this.#unitsInStock=unitsInStock;}
    get unitsInStock(){return this.#unitsInStock;}

    set imageUrl(imageUrl){this.#imageUrl=imageUrl;}
    get imageUrl(){return this.#imageUrl;}

    updatePrice(price){
      this.#price=price    
    }
}


