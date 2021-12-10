package full.stack.rest.controller;

import full.stack.rest.dto.Purchase;
import full.stack.rest.dto.PurchaseResponse;
import full.stack.rest.service.CheckoutService;
import full.stack.rest.service.CheckoutServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    CheckoutService checkoutService;

    @Autowired
    CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    @PostMapping("/purchase")
    PurchaseResponse placeOrder(@RequestBody Purchase purchase) {
        return checkoutService.placeOrder(purchase);
    }
}
