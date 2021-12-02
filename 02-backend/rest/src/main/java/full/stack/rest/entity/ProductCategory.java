package full.stack.rest.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "product_category")
// TODO add @Data instead @Getter and @Setter
@Getter
@Setter
public class ProductCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    Long id;

    @Column(name = "category_name")
    String categoryName;

    @OneToMany(mappedBy = "category")
    Set<Product> products;
}
