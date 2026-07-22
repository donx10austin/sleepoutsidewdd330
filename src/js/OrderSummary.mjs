function parseExpirationDate(expiration) {
  const expirationDate = new Date(expiration);
  const expMonth = expirationDate.getUTCMonth() + 1;
  const expYear = expirationDate.getUTCFullYear().toString().slice(-2);
  return `${expMonth}/${expYear}`;
}

export default class OrderSummary {
  constructor(
    orderDate,
    fname,
    lname,
    street,
    city,
    state,
    zip,
    cardNumber,
    expiration,
    code,
    orderTotal,
    shipping,
    tax,
  ) {
    this.orderDate = orderDate;
    this.fname = fname;
    this.lname = lname;
    this.street = street;
    this.city = city;
    this.state = state;
    this.zip = zip;
    this.cardNumber = cardNumber;
    this.expiration = parseExpirationDate(expiration);
    this.code = code;
    this.items = [];
    this.orderTotal = orderTotal;
    this.shipping = shipping;
    this.tax = tax;
  }
  setItems(cartItems) {
    this.items = cartItems;
  }
  toJson() {
    return {
      orderDate: this.orderDate,
      fname: this.fname,
      lname: this.lname,
      street: this.street,
      city: this.city,
      state: this.state,
      zip: this.zip,
      cardNumber: this.cardNumber,
      expiration: this.expiration,
      code: this.code,
      items: this.items,
      orderTotal: this.orderTotal,
      shipping: this.shipping,
      tax: this.tax,
    };
  }
}
