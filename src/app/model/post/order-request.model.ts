import {OrderItemRequest} from "./order-item-request.model";

export class OrderRequest {
  orderBy: string;
  email: string;
  phone: string;
  address: string;
  totalPrice: number;
  items: Array<OrderItemRequest>;


  constructor(orderBy: string, email: string, phone: string,
              address: string, totalPrice: number,
              items: Array<OrderItemRequest>) {
    this.orderBy = orderBy;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.totalPrice = totalPrice;
    this.items = items;
  }
}
