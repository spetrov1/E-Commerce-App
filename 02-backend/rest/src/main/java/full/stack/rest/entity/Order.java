package full.stack.rest.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "orders")
@Getter
@Setter
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    Long id;

    @Column(name = "order_tracking_number")
    String orderTrackingNumber;

    @Column(name = "total_price")
    BigDecimal totalPrice;

    @Column(name = "total_quantity")
    int totalQuantity;

    @OneToOne(cascade = CascadeType.ALL) // TODO try to change to @ManyToOne
    @JoinColumn(name = "billing_address_id", referencedColumnName = "id") // TODO not sure if we need referencedColumnName
    Address billingAddress;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    Customer customer;

    @OneToOne(cascade = CascadeType.ALL) // TODO try to change to @ManyToOne
    @JoinColumn(name = "shipping_address_id", referencedColumnName = "id") // TODO not sure if we need referencedColumnName
    Address shippingAddress;

    @Column(name = "status")
    String status;

    @Column(name = "date_created")
    @CreationTimestamp
    Date dateCreated;

    @Column(name = "last_updated")
    @UpdateTimestamp
    Date lastUpdated;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    Set<OrderItem> orderItems;

    public void add(OrderItem item) {
        if (orderItems == null) {
            orderItems = new HashSet<>();
        }
        orderItems.add(item);
        item.setOrder(this);
    }
}
