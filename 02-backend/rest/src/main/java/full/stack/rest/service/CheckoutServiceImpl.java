package full.stack.rest.service;

import full.stack.rest.dao.CustomerRepository;
import full.stack.rest.dto.Purchase;
import full.stack.rest.dto.PurchaseResponse;
import full.stack.rest.entity.Customer;
import full.stack.rest.entity.Order;
import full.stack.rest.entity.OrderItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImpl implements CheckoutService {

    CustomerRepository customerRepository;

    @Autowired
    CheckoutServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {
        Order theOrder = purchase.getOrder();

        String orderTrackingNumber = this.generateOrderTrackingNumber();
        theOrder.setOrderTrackingNumber(orderTrackingNumber);

        theOrder.setBillingAddress(purchase.getBillingAddress());
        theOrder.setShippingAddress(purchase.getShippingAddress());

        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(item -> theOrder.add(item));

        Customer customer = purchase.getCustomer();
        customer.addOrder(theOrder);
        customerRepository.save(customer);

        return new PurchaseResponse(orderTrackingNumber);
    }

    private String generateOrderTrackingNumber() {
        return UUID.randomUUID().toString();
    }
}
