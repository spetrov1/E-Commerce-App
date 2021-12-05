import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CartService } from '../cart-status/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutForm!: FormGroup;
  totalQuantity: number = 0;
  totalPrice: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.checkoutForm = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        emailAddress: ['']
      }),
      shippingAddress: this.formBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        state: [''],
        zipCode: ['']
      }),
      billingAddress: this.formBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        state: [''],
        zipCode: ['']
      })
    });

    const status = this.cartService.processCartStatus();
    this.totalQuantity = status.itemsQuantity;
    this.totalPrice = status.itemsPrice;
  }

  onSubmit() {
    console.log(this.checkoutForm);
  }

}
