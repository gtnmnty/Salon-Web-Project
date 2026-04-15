// this. gives us the obejct that contains the method/function
// 

import { addtoCart } from "./cart.js";

// Use Pascal case for Objects
function Cart(localStorageKey){
    const cart = {
    cartItems: undefined,

    // Convert/Move function into object or method
    loadfromStorage(){    // 
    cart.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
 
    if(!this.cartItems){
        this.cartItems =  [{
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            deliveryOptionId: '1'
        }, {
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryOptionId: '2'
        }];
    }

    },

    savetoStorage(){
        localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },

    addtoCart(productId){
    let matchItem;

        this.cartItems.forEach((cartItem) => {
            if(productId === cartItem.productId){
                matchItem = cartItem;
            }
        });
                
        if(matchItem){
            matchItem.quantity += 1;
        }
        else{
            this.cartItems.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId: '1'
        });
        }

        this.savetoStorage(); // To access the method inside the object.
    },

    removeFromCart(productId){
    const newCart = [];

    this.cartItems.forEach((cartItem) => {
        if(cartItem.productId != productId){
            newCart.push(cartItem);
        }
    });

    this.cartItems = newCart;
    this.savetoStorage();
    },

    // Loop through the cart and find the product
    // Update the deliveryOptionId of the product
    updateDeliveryOption(prodId, deliveryOptionId){
        let matchItem;

        this.cartItems.forEach((cartItem) => {
            if(prodId === cartItem.productId){
                matchItem = cartItem;
            }
        });

        matchItem.deliveryOptionId = deliveryOptionId;
        this.savetoStorage();
    }
    };
    return cart;
}
const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');    // New instance of Cart Object

cart.loadfromStorage();
cart.addtoCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');

console.log(cart);
console.log(businessCart);
