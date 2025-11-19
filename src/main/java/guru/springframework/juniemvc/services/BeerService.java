package guru.springframework.juniemvc.services;

import guru.springframework.juniemvc.domain.Beer;

import java.util.List;

public interface BeerService {
    List<Beer> listAll();
    Beer getById(Long id);
    List<Beer> search(String q);
    Beer create(Beer beer);
    Beer update(Long id, Beer beer);
    void delete(Long id);
}
