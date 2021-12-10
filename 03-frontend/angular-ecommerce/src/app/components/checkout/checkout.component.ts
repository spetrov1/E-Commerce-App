import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'src/app/common/address';
import { Country } from 'src/app/common/country';
import { Customer } from 'src/app/common/customer';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Purchase } from 'src/app/common/purchase';
import { State } from 'src/app/common/state';
import { CheckoutResponse, CheckoutService } from 'src/app/services/checkout.service';
import { FormService } from 'src/app/services/form.service';
import { CartService, CartStatus } from '../cart-status/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutForm!: FormGroup;
  totalQuantity: number = 0;
  totalPrice: number = 0;

  creditCardMonths: number[] = [];
  creditCardYears: number[] = [];

  countries: Country[] = [];
  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  get firstName() { return this.checkoutForm.get('customer.firstName');}
  get lastName() { return this.checkoutForm.get('customer.lastName');}
  get email() { return this.checkoutForm.get('customer.email');}

  get shippingAddressCountry() { return this.checkoutForm.get('shippingAddress.country');}
  get shippingAddressStreet() { return this.checkoutForm.get('shippingAddress.street'); }
  get shippingAddressCity() { return this.checkoutForm.get('shippingAddress.city'); }
  get shippingAddressState() { return this.checkoutForm.get('shippingAddress.state'); }
  get shippingAddressZipCode() { return this.checkoutForm.get('shippingAddress.zipCode'); }

  get billingAddressCountry() { return this.checkoutForm.get('billingAddress.country');}
  get billingAddressStreet() { return this.checkoutForm.get('billingAddress.street'); }
  get billingAddressCity() { return this.checkoutForm.get('billingAddress.city'); }
  get billingAddressState() { return this.checkoutForm.get('billingAddress.state'); }
  get billingAddressZipCode() { return this.checkoutForm.get('billingAddress.zipCode'); }


  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private formService: FormService,
    private checkoutService: CheckoutService,
    private router: Router) { }

  ngOnInit(): void {
    this.connectCodeToForm();

    this.cartService.cartStatusSubject.subscribe(
      (status: CartStatus) => {
        this.totalQuantity = status.itemsQuantity;
        this.totalPrice = status.itemsPrice;
      }
    )

    // const status = this.cartService.processCartStatus();
    // this.totalQuantity = status.itemsQuantity;
    // this.totalPrice = status.itemsPrice;

    this.populateCreditCardYears();
    this.populateCreditCardMonths(new Date().getMonth());

    this.formService.getAllCountries().subscribe(
      (countries: Country[]) => this.countries = countries
    )
  }

  populateStates(formGroupName: string) {
    const country: Country = this.checkoutForm.get(formGroupName)!.value.country;
    this.formService.getAllStatesByCountryCode(country.code).subscribe(
      (states: State[]) => {
        if (formGroupName === "shippingAddress") {
          this.shippingAddressStates = states;
        } else {
          this.billingAddressStates = states;
        }
      }
    )
  }

  populateCreditCardYears() {
    this.formService.getYears().subscribe(
      (years: number[]) => this.creditCardYears = years
    )
  }

  populateCreditCardMonths(startMonth: number) {
    this.formService.getMonths(startMonth).subscribe(
      (months: number[]) => this.creditCardMonths = months
    )
  }

  handleCreditCardDropdownsPopulation() {
    const creditCardFormGroup = this.checkoutForm.get('creditCard');
    const selectedYear = +creditCardFormGroup?.value.expirationYear;
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    if (selectedYear === currentYear) {
      this.populateCreditCardMonths(currentMonth);
    } else {
      const januaryMonth = 1;
      this.populateCreditCardMonths(januaryMonth);
    }
  }

  // checkbox to copy inputed ShoppingAddress to BillingAddress 
  handleCheckboxChangedValue(eventTarget: EventTarget) {
    const isChecked = (<HTMLInputElement>eventTarget).checked;
    if (isChecked) {
      const temp = this.checkoutForm.get('shippingAddress');
      this.checkoutForm.get('billingAddress')?.setValue(temp?.value);
      
      this.billingAddressStates = this.shippingAddressStates;
    }
  }

  // Custom Validator

  // Option 1:
  // notOnlyWhitespaces(): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     if (control.value.trim().length === 0) {
  //       return { "notOnlyWhitespaces": true};
  //     }
  //     return null;
  //   }
  // }

  // Custom Validator
  // Option 2: More Readable
  notOnlyWhitespaces(control: AbstractControl): ValidationErrors | null {
    if (control.value.trim().length === 0) {
      return { notOnlyWhitespaces: true};
    }
    return null;
  }

  private connectCodeToForm() {
    this.checkoutForm = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, this.notOnlyWhitespaces]),
        lastName: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email])
      }),
      shippingAddress: this.formBuilder.group({
        country: new FormControl('', Validators.required),
        street: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        state: new FormControl('', Validators.required),
        zipCode: new FormControl('', Validators.required)
      }),
      billingAddress: this.formBuilder.group({
        country: new FormControl('', Validators.required),
        street: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        state: new FormControl('', Validators.required),
        zipCode: new FormControl('', Validators.required)
      }),
      creditCard: this.formBuilder.group({
        type: new FormControl('', Validators.required),
        name: new FormControl('', [Validators.required, this.notOnlyWhitespaces]),
        number: new FormControl('', [Validators.required, Validators.pattern("[0-9]{16}"), this.notOnlyWhitespaces]),
        securityCode: new FormControl('', [Validators.required, Validators.pattern("[0-9]{3}"), this.notOnlyWhitespaces]),
        expirationMonth: new FormControl('', Validators.required),
        expirationYear: new FormControl('', Validators.required)
      })
    });
  }

  get creditCardType() { return this.checkoutForm.get('creditCard.type'); }
  get creditCardName() { return this.checkoutForm.get('creditCard.name'); }
  get creditCardNumber() { return this.checkoutForm.get('creditCard.number'); }
  get creditCardSecurityCode() { return this.checkoutForm.get('creditCard.securityCode'); }
  get creditCardExpirationMonth() { return this.checkoutForm.get('creditCard.expirationMonth'); }
  get creditCardExpirationYear() { return this.checkoutForm.get('creditCard.expirationYear'); }

  onSubmit() {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
    }
    else {
      const purchase = new Purchase();

      // customer
      // const customer: Customer = JSON.parse(JSON.stringify(this.checkoutForm.get('customer')!.value));
      const customer: Customer = this.checkoutForm.get('customer')!.value;

      // shipping address
      const shippingAddress: Address = this.checkoutForm.get('shippingAddress')!.value;
      shippingAddress.country = JSON.parse(JSON.stringify(shippingAddress.country)).name;
      shippingAddress.state = JSON.parse(JSON.stringify(shippingAddress.state)).name;

      // billing address
      const billingAddress: Address = this.checkoutForm.get('billingAddress')!.value;
      billingAddress.country = JSON.parse(JSON.stringify(billingAddress.country)).name;
      billingAddress.state = JSON.parse(JSON.stringify(billingAddress.state)).name;

      // order
      const order = new Order();
      const currStatus = this.cartService.cartStatusSubject.getValue();
      order.totalPrice = currStatus.itemsPrice;
      order.totalQuantity = currStatus.itemsQuantity;

      // order items
      const cartItems = this.cartService.cartItems;
      const orderItems: OrderItem[] = cartItems.map(cartItem => new OrderItem(cartItem));

      purchase.customer = customer;
      purchase.shippingAddress = shippingAddress;
      purchase.billingAddress = billingAddress;
      purchase.order = order;
      purchase.orderItems = orderItems;

      this.checkoutService.placeOrder(purchase).subscribe(
        this.onPlaceOrderSuccess.bind(this),
        this.onPlaceOrderFail
      );
    }
    
  }

  onPlaceOrderSuccess(successData: CheckoutResponse) {
    alert(`Order created with tracking number: ${successData.orderTrackingNumber}`);
    this.cartService.cartStatusSubject.next({
      itemsPrice: 0,
      itemsQuantity: 0
    });
    this.router.navigateByUrl("/products");
  }

  onPlaceOrderFail(error: HttpErrorResponse) {
    alert("Error occurred");
  }

}
