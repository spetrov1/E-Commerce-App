package full.stack.rest.dao;


import full.stack.rest.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

// @CrossOrigin(origins = "http://e-app-frontend:80")
@CrossOrigin
public interface CountryRepository extends JpaRepository<Country, Integer> {
}
