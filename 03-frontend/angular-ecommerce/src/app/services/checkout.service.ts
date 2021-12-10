import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../common/purchase';

export interface CheckoutResponse {
  orderTrackingNumber: string;
}

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  readonly purchaseUrl = "http://localhost:8080/api/checkout/purchase";

  constructor(private httpClient: HttpClient) { }

  placeOrder(purchase: Purchase) {
    return this.httpClient.post<CheckoutResponse>(this.purchaseUrl, purchase);
  }
}
