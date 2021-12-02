package full.stack.rest.dao;

import full.stack.rest.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "productCategories", path = "product-categories")
public interface ProductCategoryJpaRepository extends JpaRepository<ProductCategory, Long> {
}
