package full.stack.rest.dao;

import full.stack.rest.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

// @CrossOrigin(origins = "http://e-app-frontend:80")
@CrossOrigin
@RepositoryRestResource(collectionResourceRel = "productCategories", path = "product-categories")
public interface ProductCategoryJpaRepository extends JpaRepository<ProductCategory, Long> {
}
