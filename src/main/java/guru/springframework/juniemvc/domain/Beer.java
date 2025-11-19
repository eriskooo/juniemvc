package guru.springframework.juniemvc.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;

/**
 * Beer JPA entity.
 *
 * abv stands for "alcohol by volume" and represents the percentage of alcohol
 * contained in the beer (0–100%).
 */
@Entity
@Table(name = "beer")
public class Beer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    @NotBlank
    private String description;

    /**
     * Alcohol by volume, in percent. Example: 5.5 represents 5.5% ABV.
     */
    @Column(name = "abv", precision = 5, scale = 2, nullable = false)
    @NotNull
    @DecimalMin(value = "0.0")
    @DecimalMax(value = "100.0")
    private BigDecimal abv;

    public Beer() {
    }

    public Beer(String description, BigDecimal abv) {
        this.description = description;
        this.abv = abv;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getAbv() {
        return abv;
    }

    public void setAbv(BigDecimal abv) {
        this.abv = abv;
    }
}
