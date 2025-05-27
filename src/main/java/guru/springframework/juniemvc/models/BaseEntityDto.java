package guru.springframework.juniemvc.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

/**
 * Base DTO class with common fields for all DTOs
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class BaseEntityDto {
    private Integer id;
    private Integer version;
    private LocalDateTime createdDate;
    private LocalDateTime updateDate;
}
