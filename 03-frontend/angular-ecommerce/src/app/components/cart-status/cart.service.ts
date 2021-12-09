import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { CartItem } from "src/app/common/cart-item";

export interface CartStatus {
    itemsQuantity: number;
    itemsPrice: number;
}

@Injectable({providedIn: 'root'})
export class CartService {
    cartItems: CartItem[] = [];

    // subject is emitting event when a status is being changed
    cartStatusSubject = new BehaviorSubject<CartStatus>({itemsQuantity: 0, itemsPrice: 0});

    addItem(item: CartItem) {
        const itemAlreadyAdded = this.cartItems.find(currItem => currItem.id === item.id);

        if (itemAlreadyAdded) {
            itemAlreadyAdded.quantity += 1;
        } else {
            this.cartItems.push(item);
        }

        this.emitNewStatus();
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

    removeById(itemId: number) {
        this.cartItems = this.cartItems.filter(elem => elem.id !== itemId);
    }

    emitNewStatus() {
        const status: CartStatus = this.processCartStatus();
        this.cartStatusSubject.next(status);
    }
    

}