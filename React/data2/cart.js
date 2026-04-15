export let cart;

loadfromStorage();

export function loadfromStorage(){
    cart = JSON.parse(localStorage.getItem('cart'));
 
    if(!cart){
        cart =  [{
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            deliveryOptionId: '1'
        }, {
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryOptionId: '2'
        }];
    }
 }


function savetoStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

 export function addtoCart(productId){
  let matchItem;

    cart.forEach((cartItem) => {
        if(productId === cartItem.productId){
            matchItem = cartItem;
        }
    });
            
    if(matchItem){
        matchItem.quantity += 1;
    }
    else{
        cart.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: '1'
    });
    }

    savetoStorage();
}

export function removeFromCart(productId){
    const newCart = [];

    cart.forEach((cartItem) => {
        if(cartItem.productId != productId){
            newCart.push(cartItem);
        }
    });

    cart = newCart;
    savetoStorage();
}

// Loop through the cart and find the product
// Update the deliveryOptionId of the product
export function updateDeliveryOption(prodId, deliveryOptionId){
    let matchItem;

    cart.forEach((cartItem) => {
        if(prodId === cartItem.productId){
            matchItem = cartItem;
        }
    });

    matchItem.deliveryOptionId = deliveryOptionId;
    savetoStorage();
}

export function loadCart(fun){ // Callback. A function to run in the future.
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
      console.log(xhr.response);
      fun();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}



/*
 Modules: contains a var inside a fuile.
 1st Step is to create file. 2nd, don't load the file with <script>
Any variab;es we create inside the file, will be contained insdie the file


    Get a variable out of a File
    1. Add type="module" attribute
    2. Export
    3. Import

    
Benefits:
    Avoid coflicts
    Doesn't care about order

 
Other syntax of Import
    import * as cartModule from '../data/cart.js';
    cartModule.cart
    cartModule.addtoCart('id');

MVC: Model-View-Controller
    Update the data
    Regenerate all the HTML

    Model - Saves and manages the data
    View - takes the data and displays it on the page
    Controller - runs some code when we interact with the page
*/