import {Dish} from "./dish.model";

export class OrderItem {
  dish: Dish;
  quantity: number;

  constructor(dish: Dish, quantity: number) {
    this.dish = dish;
    this.quantity = quantity;
  }
}
