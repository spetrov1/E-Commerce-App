import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { CartItem } from "src/app/common/cart-item";

export interface CartStatus {
    itemsQuantity: number;
    itemsPrice: number;
}

@Injectable({providedIn: 'root'})
export class CartService {
    cartItems: CartItem[] = [];

    cartStatusSubject = new Subject<CartStatus>();

    // TODO pass either Product or CartItem
    addItem(item: CartItem) {
        const itemAlreadyAdded = this.cartItems.find(currItem => currItem.id === item.id);

        if (itemAlreadyAdded) {
            itemAlreadyAdded.quantity += 1;
        } else {
            this.cartItems.push(item);
        }

        const status: CartStatus = this.processCartStatus();
        this.cartStatusSubject.next(status);
    }

    processCartStatus() {
        let status: CartStatus = {
            itemsPrice: 0,
            itemsQuantity: 0
        };
        for (const item of this.cartItems) {
            status.itemsPrice += item.unitPrice * item.quantity;
            status.itemsQuantity += item.quantity;
        }

        return status;
    }
    

}