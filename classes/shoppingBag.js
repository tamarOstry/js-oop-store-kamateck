window.addEventListener('load', (event) => {
    myCart();
});

function myCart() {
    let cart = JSON.parse(sessionStorage.getItem('user')).shopping_bag;
    if (cart)
        for (let i = 0; i < cart.length; i++) {
             drowProductFromCart(cart[i][0], cart[i][1]);
         }
}

function drowProductFromCart(product,quantity) {
    const elmnt = document.getElementById("temp-row");
    const cln = elmnt.content.cloneNode(true);
    const url = "../Images/" + product.imageUrl.toString();
    cln.querySelector(".image").style.backgroundImage = "url(" + url + ")";
    cln.querySelector(".quatityProda").innerText = quantity;
    cln.querySelector(".itemName").innerText = product.name;
    cln.querySelector(".price").innerText = product.price + '$';
    cln.getElementById("deleteProduct").addEventListener("click", () => deleteProdFromCart(product._id));
    document.querySelector("tbody").appendChild(cln);
    document.getElementById("itemCount").innerHTML = JSON.parse(sessionStorage.getItem('countOfCart'));
    document.getElementById("totalAmount").innerHTML = parseInt(document.getElementById("totalAmount").innerText) + (product.price*quantity);
}

function placeOrder(){
   window.location.href="./payment.html";
}