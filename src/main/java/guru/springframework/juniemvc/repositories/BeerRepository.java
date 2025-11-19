package guru.springframework.juniemvc.repositories;

import guru.springframework.juniemvc.domain.Beer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BeerRepository extends JpaRepository<Beer, Long> {

    List<Beer> findByDescriptionContainingIgnoreCase(String text);
}
