import { Component, OnInit } from '@angular/core';
import { CartService, CartStatus } from './cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  cartStatus: CartStatus = {itemsPrice: 0, itemsQuantity: 0};

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cartStatusSubject.subscribe(
      (newCartStatus: CartStatus) => {
        this.cartStatus.itemsPrice = newCartStatus.itemsPrice;
        this.cartStatus.itemsQuantity = newCartStatus.itemsQuantity;
      }
    )
  }

}
