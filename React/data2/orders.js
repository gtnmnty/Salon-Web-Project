export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order){
  orders.unshift(order);
  savetoStorage();
}

function savetoStorage(){
  localStorage.setItem('orders', JSON.stringify(orders));
}