package guru.springframework.juniemvc.repositories;

import guru.springframework.juniemvc.domain.Beer;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.TestPropertySource;

import java.math.BigDecimal;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.ANY)
@TestPropertySource(properties = {
        "spring.flyway.enabled=false",
        "spring.jpa.hibernate.ddl-auto=create-drop"
})
class BeerRepositoryTest {

    @Autowired
    BeerRepository beerRepository;

    @Test
    @DisplayName("save and find by description using H2")
    void saveAndFindByDescription() {
        Beer ipa = new Beer("Citrusy West Coast IPA", new BigDecimal("6.5"));
        Beer stout = new Beer("Rich chocolate stout", new BigDecimal("8.0"));

        beerRepository.save(ipa);
        beerRepository.save(stout);

        List<Beer> result = beerRepository.findByDescriptionContainingIgnoreCase("stout");

        assertThat(result).hasSize(1);
        assertThat(result.get(0).getDescription()).containsIgnoringCase("stout");
        assertThat(result.get(0).getAbv()).isEqualByComparingTo("8.0");
    }
}
