export default class OrderResponse {
  constructor(data) {
    this.message = data.message;
    this.orderId = data.orderId;
  }
}
