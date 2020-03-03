export class OrderItemRequest {
  dishId: number;
  quantity: number;

  constructor(dishId: number, quantity: number) {
    this.dishId = dishId;
    this.quantity = quantity;
  }
}
