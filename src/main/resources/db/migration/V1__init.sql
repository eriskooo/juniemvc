-- Flyway baseline migration: create beer table
-- Aligns with JPA entity guru.springframework.juniemvc.domain.Beer

CREATE TABLE IF NOT EXISTS beer (
    id BIGSERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    abv NUMERIC(5,2) NOT NULL,
    name VARCHAR(100),
    style VARCHAR(50),
    ibu INTEGER,
    brewery VARCHAR(120),
    volume_ml INTEGER,
    -- Optional data integrity checks
    CONSTRAINT ck_beer_abv_range CHECK (abv >= 0.00 AND abv <= 100.00),
    CONSTRAINT ck_beer_ibu_range CHECK (ibu IS NULL OR (ibu >= 0 AND ibu <= 120)),
    CONSTRAINT ck_beer_volume_positive CHECK (volume_ml IS NULL OR volume_ml >= 1)
);
