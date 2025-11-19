package guru.springframework.juniemvc.web;

import guru.springframework.juniemvc.domain.Beer;
import guru.springframework.juniemvc.services.BeerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/beers")
@Validated
@RequiredArgsConstructor
public class BeerController {

    private final BeerService beerService;

    @GetMapping
    public List<Beer> list(@RequestParam(value = "q", required = false) String q) {
        if (q == null || q.isBlank()) {
            return beerService.listAll();
        }
        return beerService.search(q);
    }

    @GetMapping("/{id}")
    public Beer get(@PathVariable Long id) {
        return beerService.getById(id);
    }

    @PostMapping
    public ResponseEntity<Beer> create(@Valid @RequestBody Beer beer) {
        Beer saved = beerService.create(beer);
        return ResponseEntity.created(URI.create("/api/beers/" + saved.getId())).body(saved);
    }

    @PutMapping("/{id}")
    public Beer update(@PathVariable Long id, @Valid @RequestBody Beer beer) {
        return beerService.update(id, beer);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        beerService.delete(id);
    }
}
