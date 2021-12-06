import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { FormService } from 'src/app/services/form.service';
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

  creditCardMonths: number[] = [];
  creditCardYears: number[] = [];

  countries: Country[] = [];
  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private formService: FormService) { }

  ngOnInit(): void {
    this.connectCodeToForm();

    const status = this.cartService.processCartStatus();
    this.totalQuantity = status.itemsQuantity;
    this.totalPrice = status.itemsPrice;

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

  private connectCodeToForm() {
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
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        cardName: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      })
    });
  }

  onSubmit() {
    console.log(this.checkoutForm);
  }

}
