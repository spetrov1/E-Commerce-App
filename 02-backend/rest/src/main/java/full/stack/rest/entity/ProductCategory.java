package full.stack.rest.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "product_category")
@Getter
@Setter
// TODO why using @Getter and @Setter instead of @Data ?
// I suggest because ot set<Product> field ...
public class ProductCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    Long id;

    @Column(name = "category_name")
    String name;

    @OneToMany(mappedBy = "category")
    Set<Product> products;
}
