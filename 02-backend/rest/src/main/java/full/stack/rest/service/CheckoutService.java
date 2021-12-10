package full.stack.rest.service;

import full.stack.rest.dto.Purchase;
import full.stack.rest.dto.PurchaseResponse;

public interface CheckoutService {

    public PurchaseResponse placeOrder(Purchase purchase);

}
