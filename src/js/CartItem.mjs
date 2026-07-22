export default class CartItem {
  constructor(id, name, price, quantity) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }
  toJson() {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      quantity: this.quantity,
    };
  }
}
