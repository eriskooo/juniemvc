-- Seed data: insert a handful of world‑known beers
-- This migration relies on the table created in V1__init.sql

INSERT INTO beer (description, abv, name, style, ibu, brewery, volume_ml)
VALUES (
    'Iconic Irish dry stout with creamy head and roasted malt character',
    4.20,
    'Guinness Draught',
    'Stout',
    45,
    'Guinness',
    440
);

INSERT INTO beer (description, abv, name, style, ibu, brewery, volume_ml)
VALUES (
    'Crisp pale lager with light malt and subtle bitterness',
    5.00,
    'Heineken',
    'Pale Lager',
    19,
    'Heineken N.V.',
    330
);

INSERT INTO beer (description, abv, name, style, ibu, brewery, volume_ml)
VALUES (
    'American adjunct lager; light body and mild hop profile',
    5.00,
    'Budweiser',
    'American Lager',
    12,
    'Anheuser-Busch',
    355
);

INSERT INTO beer (description, abv, name, style, ibu, brewery, volume_ml)
VALUES (
    'Belgian pilsner with balanced bitterness and floral hop aroma',
    5.20,
    'Stella Artois',
    'Pilsner',
    24,
    'AB InBev (Leuven)',
    330
);

INSERT INTO beer (description, abv, name, style, ibu, brewery, volume_ml)
VALUES (
    'Mexican pale lager; light, refreshing, often served with lime',
    4.60,
    'Corona Extra',
    'Pale Lager',
    18,
    'Grupo Modelo',
    355
);
