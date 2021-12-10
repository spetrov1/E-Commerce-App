package full.stack.rest.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "order_item")
@Getter
@Setter
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    Long id;

    @Column(name = "image_url")
    String imageUrl;

    @Column(name = "quantity")
    int quantity;

    @Column(name = "unit_price")
    BigDecimal unitPrice;

    @ManyToOne
    @JoinColumn(name = "order_id")  // TODO not sure if we need to add referencedColumnName
    Order order;

    // TODO try following (my) solution
    // @OneToOne
    // @JoinColumn(name = "product_id")  // TODO not sure if we need to add referencedColumnName
    // Product product;

    @Column(name = "product_id")
    Long productId;
}
