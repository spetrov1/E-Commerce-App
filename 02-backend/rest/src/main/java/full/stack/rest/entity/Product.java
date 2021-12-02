package full.stack.rest.entity;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "product")
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    Long id;

    @Column(name = "sku")
    String sku;

    @Column(name = "name")
    String name;

    @Column(name = "description")
    String description;

    @Column(name = "unit_price")
    BigDecimal unitPrice;

    @Column(name = "image_url")
    String imageUrl;

    @Column(name = "active")
    boolean active;

    @Column(name = "units_in_stock")
    int unitsInStock;

    @Column(name = "date_created")
    // TODO read about these annotation
    @CreationTimestamp
    Date dateCreated;

    @Column(name = "last_updated")
    // TODO read about these annotation
    @UpdateTimestamp
    Date lastUpdated;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    ProductCategory category;

}
