package guru.springframework.juniemvc.services.impl;

import guru.springframework.juniemvc.domain.Beer;
import guru.springframework.juniemvc.repositories.BeerRepository;
import guru.springframework.juniemvc.services.BeerService;
import guru.springframework.juniemvc.web.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BeerServiceImpl implements BeerService {

    private final BeerRepository beerRepository;

    @Override
    public List<Beer> listAll() {
        return beerRepository.findAll();
    }

    @Override
    public Beer getById(Long id) {
        return beerRepository.findById(id).orElseThrow(() -> new NotFoundException("Beer not found: " + id));
    }

    @Override
    public List<Beer> search(String q) {
        if (q == null || q.isBlank()) {
            return listAll();
        }
        return beerRepository.findByDescriptionContainingIgnoreCase(q);
    }

    @Override
    public Beer create(Beer beer) {
        beer.setId(null);
        return beerRepository.save(beer);
    }

    @Override
    public Beer update(Long id, Beer beer) {
        Beer existing = beerRepository.findById(id).orElseThrow(() -> new NotFoundException("Beer not found: " + id));
        existing.setDescription(beer.getDescription());
        existing.setAbv(beer.getAbv());
        // copy newly added optional fields
        existing.setName(beer.getName());
        existing.setStyle(beer.getStyle());
        existing.setIbu(beer.getIbu());
        existing.setBrewery(beer.getBrewery());
        existing.setVolumeMl(beer.getVolumeMl());
        return beerRepository.save(existing);
    }

    @Override
    public void delete(Long id) {
        if (!beerRepository.existsById(id)) {
            throw new NotFoundException("Beer not found: " + id);
        }
        beerRepository.deleteById(id);
    }
}
