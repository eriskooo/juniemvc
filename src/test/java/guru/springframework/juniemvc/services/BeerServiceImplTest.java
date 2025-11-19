package guru.springframework.juniemvc.services;

import guru.springframework.juniemvc.domain.Beer;
import guru.springframework.juniemvc.repositories.BeerRepository;
import guru.springframework.juniemvc.services.impl.BeerServiceImpl;
import guru.springframework.juniemvc.web.NotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;

class BeerServiceImplTest {

    BeerRepository beerRepository;
    BeerService beerService;

    @BeforeEach
    void setUp() {
        beerRepository = Mockito.mock(BeerRepository.class);
        beerService = new BeerServiceImpl(beerRepository);
    }

    @Test
    @DisplayName("listAll delegates to repository")
    void listAll() {
        when(beerRepository.findAll()).thenReturn(List.of(new Beer("IPA", new BigDecimal("6.0"))));
        List<Beer> all = beerService.listAll();
        assertThat(all).hasSize(1);
        verify(beerRepository).findAll();
    }

    @Test
    @DisplayName("getById returns entity when present")
    void getByIdFound() {
        Beer b = new Beer("Stout", new BigDecimal("8.0"));
        b.setId(5L);
        when(beerRepository.findById(5L)).thenReturn(Optional.of(b));
        Beer result = beerService.getById(5L);
        assertThat(result.getDescription()).isEqualTo("Stout");
    }

    @Test
    @DisplayName("getById throws NotFoundException when missing")
    void getByIdNotFound() {
        when(beerRepository.findById(1L)).thenReturn(Optional.empty());
        assertThatThrownBy(() -> beerService.getById(1L)).isInstanceOf(NotFoundException.class);
    }

    @Test
    @DisplayName("search blank returns listAll")
    void searchBlank() {
        when(beerRepository.findAll()).thenReturn(List.of());
        List<Beer> res = beerService.search(" ");
        assertThat(res).isEmpty();
        verify(beerRepository).findAll();
    }

    @Test
    @DisplayName("search delegates to repository method")
    void searchQuery() {
        when(beerRepository.findByDescriptionContainingIgnoreCase("stout")).thenReturn(List.of());
        beerService.search("stout");
        verify(beerRepository).findByDescriptionContainingIgnoreCase("stout");
    }

    @Test
    @DisplayName("create clears id and saves")
    void create() {
        Beer incoming = new Beer("Pils", new BigDecimal("5.0"));
        incoming.setId(123L);
        Beer saved = new Beer("Pils", new BigDecimal("5.0"));
        saved.setId(1L);
        when(beerRepository.save(any())).thenReturn(saved);
        Beer result = beerService.create(incoming);
        assertThat(result.getId()).isEqualTo(1L);
        ArgumentCaptor<Beer> captor = ArgumentCaptor.forClass(Beer.class);
        verify(beerRepository).save(captor.capture());
        assertThat(captor.getValue().getId()).isNull();
    }

    @Test
    @DisplayName("update copies fields and saves")
    void update() {
        Beer existing = new Beer("Old", new BigDecimal("4.0"));
        existing.setId(2L);
        when(beerRepository.findById(2L)).thenReturn(Optional.of(existing));
        when(beerRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        Beer update = new Beer("New", new BigDecimal("7.5"));
        Beer result = beerService.update(2L, update);
        assertThat(result.getDescription()).isEqualTo("New");
        assertThat(result.getAbv()).isEqualByComparingTo("7.5");
    }

    @Test
    @DisplayName("update missing throws NotFoundException")
    void updateMissing() {
        when(beerRepository.findById(9L)).thenReturn(Optional.empty());
        assertThatThrownBy(() -> beerService.update(9L, new Beer("x", new BigDecimal("1.0"))))
                .isInstanceOf(NotFoundException.class);
    }

    @Test
    @DisplayName("delete existing calls repository; missing throws NotFoundException")
    void deleteBehavior() {
        when(beerRepository.existsById(1L)).thenReturn(true);
        beerService.delete(1L);
        verify(beerRepository).deleteById(1L);

        when(beerRepository.existsById(2L)).thenReturn(false);
        assertThatThrownBy(() -> beerService.delete(2L)).isInstanceOf(NotFoundException.class);
    }
}
