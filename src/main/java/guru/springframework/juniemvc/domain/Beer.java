package guru.springframework.juniemvc.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Beer JPA entity.
 *
 * abv stands for "alcohol by volume" and represents the percentage of alcohol
 * contained in the beer (0–100%).
 */
@Entity
@Table(name = "beer")
@Getter
@Setter
@NoArgsConstructor
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

    // --- Additional typical beer fields (optional) ---

    /**
     * Human-friendly name of the beer, e.g., "Pliny the Elder".
     */
    @Column(name = "name", length = 100)
    @Size(min = 1, max = 100)
    private String name;

    /**
     * Beer style, e.g., "IPA", "Stout", "Pilsner".
     */
    @Column(name = "style", length = 50)
    @Size(min = 1, max = 50)
    private String style;

    /**
     * International Bitterness Units, commonly 0–120.
     */
    @Column(name = "ibu")
    @Min(0)
    @Max(120)
    private Integer ibu;

    /**
     * Brewery name, e.g., "Sierra Nevada Brewing Co.".
     */
    @Column(name = "brewery", length = 120)
    @Size(min = 1, max = 120)
    private String brewery;

    /**
     * Package volume in milliliters (e.g., 330, 440, 500).
     */
    @Column(name = "volume_ml")
    @Min(1)
    private Integer volumeMl;

    public Beer(String description, BigDecimal abv) {
        this.description = description;
        this.abv = abv;
    }
}
