import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService, CartStatus } from '../cart-status/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  itemsQuantity: number = 0;
  itemsPrice: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.cartItems;
    
    this.cartService.cartStatusSubject.subscribe(
      (status: CartStatus) => {
        this.itemsPrice = status.itemsPrice;
        this.itemsQuantity = status.itemsQuantity;
        this.cartItems = this.cartService.cartItems;
      }
    );

    this.cartService.emitNewStatus();

  }

  onIncrement(item: CartItem) {
    this.cartService.addItem(item);
  }

  onDecrement(item: CartItem) {
    if(item.quantity === 1) {
      this.onRemove(item);
    } else {
      item.quantity -= 1;
      this.cartService.emitNewStatus();
    }
  }

  onRemove(item: CartItem) {
    this.cartService.removeById(item.id);
    this.cartService.emitNewStatus();
  }

}
