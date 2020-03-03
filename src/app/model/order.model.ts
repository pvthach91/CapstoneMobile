import {OrderItem} from "./order-item.model";

export class Order {
  id: number;
  orderId: string;
  date: string;
  orderBy: string;
  email: string;
  phone: string;
  address: string;
  totalPrice: number;
  status: string;
  items: Array<OrderItem>;


  constructor(id: number, orderId: string, date: string, orderBy: string, email: string, phone: string, address: string, totalPrice: number, status: string, items: Array<OrderItem>) {
    this.id = id;
    this.orderId = orderId;
    this.date = date;
    this.orderBy = orderBy;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.totalPrice = totalPrice;
    this.status = status;
    this.items = items;
  }
}
