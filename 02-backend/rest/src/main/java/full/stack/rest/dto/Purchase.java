package full.stack.rest.dto;

import full.stack.rest.entity.Address;
import full.stack.rest.entity.Customer;
import full.stack.rest.entity.Order;
import full.stack.rest.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    Customer customer;
    Address shippingAddress;
    Address billingAddress;
    Order order;
    Set<OrderItem> orderItems;

}
