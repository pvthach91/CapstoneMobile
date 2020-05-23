import { Component, OnInit } from '@angular/core';
import {OrderItem} from "../../model/order-item.model";
import {CartStorageService} from "../../services/cart-storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertController} from "@ionic/angular";
import {configuration} from "../../model/configuration.model";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  configuration = configuration;
  shoppingCart: Array<OrderItem>;
  totalPrice: number;

  constructor(private cartStorage: CartStorageService,
              private router: Router,
              private route: ActivatedRoute,
              public alertController: AlertController) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.updateCart();
      });
  }

  updateCart() {
    this.shoppingCart = this.cartStorage.getShoppingCart();
    this.totalPrice = 0;
    this.shoppingCart.forEach((cartItem, index) => {
      let rowPrice = cartItem.quantity*cartItem.product.promotionPrice;
      this.totalPrice += rowPrice;
    });
  }

  increaseQuantity(cartItem: OrderItem): void {
    this.cartStorage.addItem(cartItem.product, 1);
    this.updateCart();
  }

  decreaseQuantity(cartItem: OrderItem): void {
    console.log(cartItem.quantity);
    if (cartItem.quantity > 1) {
      this.cartStorage.addItem(cartItem.product, - 1);
      this.updateCart();
    }
  }

  removeItem(dishId: number): void {
    this.cartStorage.removeItem(dishId);
    this.updateCart();
  }

  checkout() {
    this.router.navigateByUrl('/checkout');
  }

}
