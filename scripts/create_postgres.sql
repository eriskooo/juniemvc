-- PostgreSQL setup for JunieMVC application
-- This script creates a local database and (optionally) a dedicated user.
-- Default Spring Boot configuration in this project expects:
--   URL:      jdbc:postgresql://localhost:5432/juniemvc
--   USERNAME: postgres (or set to the created user below)
--   PASSWORD: postgres (or set accordingly)

-- 1) Create a dedicated application role if it doesn't exist (safe to re-run)
DO $$
BEGIN
   IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'juniemvc') THEN
      CREATE ROLE juniemvc LOGIN PASSWORD 'postgres';
   END IF;
END$$;

-- 2) Create the database if it does not exist (psql-specific approach)
-- Note: PostgreSQL does not support CREATE DATABASE IF NOT EXISTS directly.
-- The following works when executed via psql:
SELECT 'CREATE DATABASE juniemvc OWNER juniemvc'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'juniemvc')\gexec

-- 3) Optional: grant privileges if the DB already existed and is owned by another role
-- Adjust owner as needed (run as a superuser such as 'postgres'):
-- ALTER DATABASE juniemvc OWNER TO juniemvc;

-- After running this script, you can either:
--   - Keep using the default 'postgres' superuser in application.properties, or
--   - Switch to the 'juniemvc' user by setting env vars before starting the app:
--       SPRING_DATASOURCE_USERNAME=juniemvc
--       SPRING_DATASOURCE_PASSWORD=postgres
