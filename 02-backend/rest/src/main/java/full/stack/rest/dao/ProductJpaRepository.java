package full.stack.rest.dao;

import full.stack.rest.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:4200")
public interface ProductJpaRepository extends JpaRepository<Product, Long> {
}
