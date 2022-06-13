let idies=0;
let c = 0;
let searchBym=[];
if (sessionStorage.getItem('countOfCart')==null)
    sessionStorage.setItem('countOfCart', 0);

const categories=[{name:"car",id:1},{name:"motor_cicle",id:2},{name:"bus",id:3}];
const searches=[{name:"name",id:100},{name:"category",id:101},{name:"price",id:102},{name:"outOfStock",id:103}];

class Store{
    #products;
    #manager;
    #users;
    constructor(){
        this.#products=[
            {id:++idies,name:"toyota",category:"car",price:100,unitsInStock:20,imageUrl:"1.jpg"},
            {id:++idies,name:"subaro",category:"car",price:200,unitsInStock:3,imageUrl:"11.jpg"},
            {id:++idies,name:"eged",category:"bus",price:300,unitsInStock:15,imageUrl:"3.jpg"},
            {id:++idies,name:"tostos",category:"motor_cicle",price:300,unitsInStock:40,imageUrl:"2.jpg"},
            {id:++idies,name:"nisan",category:"car",price:300,unitsInStock:70,imageUrl:"111.jpg"},
            {id:++idies,name:"high",category:"bus",price:300,unitsInStock:2,imageUrl:"33.jpg"},
        ];
        this.#manager={name:"tamar_ostry",email:"tamar@gmail.com",password:"1234"};
        this.#users=[
            {name:"eli",email:"a@gmail.com",password:"1477",shopping_bag:[]},
            {name:"rachel",email:"r@gmail.com",password:"8523",shopping_bag:[]},
            {name:"rut",email:"rut@gmail.com",password:"2888",shopping_bag:[]}
        ]
        // this.#manager=new Manager("avraam","tamar@gmail.com","1234");
    }

    login(){
        const passwordManager=document.getElementById('password-manager').value;
        if(passwordManager){
            if(passwordManager==this.#manager.password){
                sessionStorage.setItem('manager',true);
                window.location.href="./home.html";
            }
            else{
                alert("you dont manager!!")
            }
        }
        else{
          const email=document.getElementById('email-input-in-manager-login').value;
          const password=document.getElementById('password-input-in-manager-login').value; 
          let user;
          for(let i=0;i<this.#users.length;i++){
             if(this.#users[i].email==email && this.#users[i].password==password){
                 user=this.#users[i];
                 break;
             }
          }
          if(user){
            sessionStorage.setItem('user',JSON.stringify(user));
            window.location.href="./home.html";
          }
          else
            alert("your detail is incorrect")
        }      
    }

    getProducts(){
        this.#products.forEach(p => this.drowProduct(p));
    }

    drowProduct(p) {
        let url = "../images/";
        let elmnt = document.getElementById("temp-card");
        let cln = elmnt.content.cloneNode(true);
        cln.querySelector('.card').id=p.id;
        cln.querySelector("img").src = url + p.imageUrl;
        cln.querySelector(".price").innerText = p.price+'$';
        cln.querySelector(".nameProduct").innerText = p.name;
        cln.querySelector(".inStock").innerText = p.unitsInStock;
        cln.querySelector("button").addEventListener("click",()=>this.addToCart(p));
        if(sessionStorage.getItem('manager')=="true"){
            cln.querySelector(".edit").style.display="block";
            cln.querySelector(".delete").style.display="block";
            cln.getElementById("addToStock").style.display="block";
            cln.getElementById("removeFromStock").style.display="block";
            cln.querySelector(".delete").addEventListener("click",()=>this.deleteProduct(p.id))
            cln.querySelector(".edit").addEventListener("click",()=>this.editProduct(p));
            cln.getElementById("addToStock").addEventListener("click",()=>this.addToStock(p.id))
            // {
            //     cln.getElementById("buton-ok-add").style.display="block";
            //     cln.getElementById("input-amout-toAdd").style.display="block";
            //     cln.getElementById("buton-ok-add").addEventListener("click",()=>this.addToStock())
            // })
            cln.getElementById("removeFromStock").addEventListener("click",()=>this.removeFromStock(p.id))
            // {
            //     cln.getElementById("buton-ok-remove").style.display="block"
            //     cln.getElementById("input-amout-toRemove").style.display="block"
            //     cln.getElementById("buton-ok-remove").addEventListener("click",()=>this.removeFromStock())
            // })      
            cln.querySelector("button").style.display="none";
        }
        document.getElementById("PoductList").appendChild(cln);
        c = parseInt(document.getElementById("counter").innerText);
        if (c > 0) {
            c++;
            document.getElementById("counter").innerHTML =c;}
        else
            document.getElementById("counter").innerHTML = 1;
    }

    addProduct(){
        let elmnt = document.getElementById("temp-card-edit");
        let cln = elmnt.content.cloneNode(true);
        cln.querySelector(".id").innerHTML = ++idies;
        cln.querySelector(".saveEdit").addEventListener('click', ()=>{
            const name=document.querySelector('.nameProduct-edit').value;
            const category=document.querySelector('.category-edit').value;
            const price=document.querySelector('.price-edit').value;
            const unitsInStock=document.querySelector('.unitsInStock-edit').value;
            const product=new Product(idies,name, category, price, unitsInStock,"222.jpg")
            this.#products.push(product);
            document.querySelector('body').removeChild(document.getElementById("edit-add-product"));
            const d = document.createElement('div');
            d.setAttribute("id", "edit-add-product");
            document.querySelector('body').appendChild(d);
            this.drowProduct(product);
            })
        document.getElementById("edit-add-product").appendChild(cln);
      }

    editProduct(product){
        let elmnt = document.getElementById("temp-card-edit");
        let cln = elmnt.content.cloneNode(true);
        cln.querySelector(".price-edit").value = product.price;
        cln.querySelector(".nameProduct-edit").value = product.name;
        cln.querySelector(".unitsInStock-edit").value = product.unitsInStock;
        cln.querySelector(".category-edit").value = product.category;
        cln.querySelector(".id").innerHTML = product.id;
        cln.querySelector(".saveEdit").addEventListener('click', ()=>{
            const name=document.querySelector('.nameProduct-edit').value;
            const category=document.querySelector('.category-edit').value;
            const price=document.querySelector('.price-edit').value;
            const unitsInStock=document.querySelector('.unitsInStock-edit').value;
            this.#products.forEach(p=>{
                if(p.id==product.id){
                    p.name=name;
                    p.category=category;
                    p.price=price;
                    p.unitsInStock=unitsInStock;   
                }
            });
            document.getElementById("PoductList").innerHTML = "";
            this.#products.forEach(p=>this.drowProduct(p));
            // document.getElementById('PoductList').removeChild(document.getElementById(p.id));
            // const p=new Product(name, category, price, unitsInStock);
            // this.drowProduct(p);
            })
        document.getElementById("edit-add-product").appendChild(cln);
    }

    deleteProduct(id){
        this.#products=this.#products.filter(p=>p.id!=id);
        document.getElementById("PoductList").innerHTML = "";
        this.#products.forEach(p=>this.drowProduct(p));
        // document.getElementById('PoductList').removeChild(document.getElementById(id));
    }

    removeFromStock(id){
        this.#products.forEach(p=>p.id==id?p.unitsInStock--:null);
        document.getElementById("PoductList").innerHTML = "";
        this.#products.forEach(p=>this.drowProduct(p));    }

    addToStock(id){
        this.#products.forEach(p=>p.id==id?p.unitsInStock++:null);
        document.getElementById("PoductList").innerHTML = "";
        this.#products.forEach(p=>this.drowProduct(p));
    }

    drowSearch(){
        searches.forEach(s=>{
            let elmnt = document.getElementById("Search");
            let cln = elmnt.content.cloneNode(true);
            cln.querySelector(".label-search").innerText = s.name;
            cln.querySelector(".input-search").id = s.id;
            cln.querySelector(".input-search").value = s.name;
            cln.querySelector(".label-search").for = s.id;
            cln.querySelector('.input-search').addEventListener("change", () => {
                if(document.getElementById(s.id).checked==true) {
                    document.querySelector('.SearchButton').style.display="block";
                    searchBym.push(document.getElementById(s.id).value);
                    switch (searchBym[searchBym.length-1]) {
                        case "name":
                            document.querySelector('.SearchByName').style.display="block";
                            break;
                        case "price":
                            document.querySelector('.fromPrice').style.display="block";
                            document.querySelector('.toPrice').style.display="block";
                            break;
                        case "category":
                            document.getElementById('filters').style.display="block";
                            break;
                    }
                }
                else{

                }
            }); 
            document.getElementById('SearchBox').appendChild(cln);
       })
    }

    search(){
        let name,fromPrice,toPrice,unitsInStock;
        searchBym.forEach(s=>{
            switch (s) {
                case 'name':
                    name=document.querySelector('.SearchByName').value;
                    break;
                case 'price':
                    fromPrice=document.querySelector('.fromPrice').value;
                    toPrice=document.querySelector('.toPrice').value;
                    break;
                case 'outOfStock':
                    unitsInStock=true
                    break;
            }
        })
        this.searchProducts(name,fromPrice,toPrice,unitsInStock);
    }

    searchProducts
    (name=undefined,fromPrice=undefined,toPrice=undefined,unitsInStock=undefined)
    {
        let newProducts =[];
        if(name!=undefined){
            if(newProducts.length>0)
              newProducts=newProducts.filter(p=>p.price>=fromPrice && p.price<=toPrice?p:null);
            else{
                for (let i = 0; i < this.#products.length; i++) {
                    if(this.#products[i].name==name)
                        newProducts.push(this.#products[i]);           
                }
            }
        }
        if(fromPrice!=undefined && toPrice!=undefined){
            if(newProducts.length>0)
              newProducts=newProducts.filter(p=>p.price>=fromPrice && p.price<=toPrice?p:null);
            else{
                for (let i = 0; i < this.#products.length; i++) {
                    if(this.#products[i].price>=fromPrice && this.#products[i].price<=toPrice)
                       newProducts.push(this.#products[i]);           
                  }
            }
              newProducts=this.#products.filter(p=>p.price>=fromPrice && p.price<=toPrice?p:null);
        }
        if(unitsInStock!=undefined){
            if(newProducts.length>0)
              newProducts=newProducts.filter(p=>p.unitsInStock<=4?p:null);
            else{
                for (let i = 0; i < this.#products.length; i++) {
                    if(this.#products[i].unitsInStock<=30)
                       newProducts.push(this.#products[i]);           
                  }
            }
        }
        document.getElementById("PoductList").innerHTML = "";
        newProducts.forEach(p=>this.drowProduct(p));
    }

    addToCart(product) {
        let bool = false;
        let cart = [];
        let user = JSON.parse(sessionStorage.getItem('user'));
        let shopping_bag = user.shopping_bag;
        let countOfCart=sessionStorage.getItem('countOfCart');
        countOfCart++;
        sessionStorage.setItem("countOfCart", JSON.stringify(countOfCart));
        if (shopping_bag.length>0) {
            cart = shopping_bag;
            for (let i = 0; i < cart.length; i++)
            {
                if (cart[i][0].id == product.id)
                {
                    bool = true;
                    cart[i][1]++;
                }
            }
            if (bool == false)
            {
                let py = [];
                py.push(product);
                py.push(1);
                cart.push(py);
            }
        }
        else
        {
            let p = [];
            p.push(product);
            p.push(1);
            cart.push(p);
        }
        document.getElementById("ItemsCountText").innerHTML = countOfCart;
        user.shopping_bag=cart;
        sessionStorage.setItem('user', JSON.stringify(user));
    }

    getCategory(){
        categories.forEach(c=>this.drowCategory(c));
    }

    drowCategory(category){
        let elmnt = document.getElementById("temp-category");
        let cln = elmnt.content.cloneNode(true);
        cln.querySelector(".OptionName").innerText = category.name;
        cln.querySelector(".opt").id = category.id;
        cln.querySelector(".lbl").for = category.id;
        cln.querySelector('.opt').addEventListener("change", () => {this.checkCheckedCategory(category.id)}); 
        document.getElementById('filters').appendChild(cln);
    }

    checkCheckedCategory(categoryId) {
        c = 0;
        document.getElementById("PoductList").innerHTML = "";
        let tmpCategories = sessionStorage.getItem('categories');
        if (document.getElementById(categoryId).checked == true) {
            if (tmpCategories) {
                categories = JSON.parse(tmpCategories)
                categories.push(categoryId);
                sessionStorage.setItem('categories', JSON.stringify(categories));
                categories.forEach(c => this.getProductByCategory(c));
            }
            else {
                let categories = [];
                categories.push(categoryId);
                sessionStorage.setItem('categories', JSON.stringify(categories));
                this.getProductByCategory(categoryId);
            }
        }
        else {
                categories = JSON.parse(tmpCategories)
                categories = categories.filter(c => c != categoryId);
                sessionStorage.setItem('categories', JSON.stringify(categories));
                if (categories.length > 0) {
                    categories.forEach(categoryId => this.getProductByCategory(categoryId));
                }
                else
                {
                    document.getElementById("counter").innerHTML=0;
                    this.getProducts(); 
                }    
        }
    }
    
    getProductByCategory(id) {
        let categoryName=null;
        for (const category of categories){
            if(category.id==id){
                categoryName=category.name;
                break;
            }
        }
        const productsThisCategory=this.#products.filter(p=>p.category==categoryName?p:null);
        document.getElementById("counter").innerHTML = c;
        productsThisCategory.forEach(p => this.drowProduct(p));
    }

    changesToManager(){
        if(sessionStorage.getItem('manager')=="true"){
            document.querySelector(".addProduct").style.display="block";
        }
    }
}

const store1=new Store();
function addProduct(){
    store1.addProduct();
}
function findProductToEdit(){
    store1.findProductToEdit();
}
function editProduct(){
    store1.editProduct();
}
function deleteProduct(){
    store1.deleteProduct();
}
function removeFromStock(){
    store1.removeFromStock();
}
function addToStock(){
    store1.addToStock();
}
function drowSearch(){
    store1.drowSearch();
}
function login(){
    store1.login();
}
function getProducts(){
    store1.getProducts();
}
function getCategory(){
    store1.getCategory();
}
function editProduct(){
    store1.editProduct();
}
function changesToManager(){
    store1.changesToManager();
}
function search(){
    store1.search();
}