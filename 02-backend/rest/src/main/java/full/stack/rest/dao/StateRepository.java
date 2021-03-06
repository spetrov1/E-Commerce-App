package full.stack.rest.dao;

import full.stack.rest.entity.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

// @CrossOrigin(origins = "http://e-app-frontend:80")
@CrossOrigin
@RepositoryRestResource(path="states")
public interface StateRepository extends JpaRepository<State, Integer> {

    List<State> findByCountryCode(@Param("code") String code);
}
