# JunieMVC Developer Guidelines

## Project Overview
JunieMVC is a Spring Boot 3 / Spring Framework 6 RESTful API application for managing beer data. It follows a standard 
Spring MVC architecture with layered components.

## Tech Stack
- Java 21
- Spring Boot 3.4.5
- Spring Data JPA
- H2 Database (in-memory)
- Maven 3.9.6+
- JUnit 5 & Mockito for testing
- Lombok for reducing boilerplate
- MapStruct for object mapping
- Flyway for database migrations

## Project Structure
```
src/
├── main/
│   ├── java/guru/springframework/juniemvc/
│   │   ├── controllers/    # REST API endpoints
│   │   ├── entities/       # JPA entity classes
│   │   ├── repositories/   # Spring Data JPA repositories
│   │   ├── services/       # Business logic layer
│   │   └── JuniemvcApplication.java  # Application entry point
│   └── resources/
│       └── application.properties    # Application configuration
└── test/
    └── java/guru/springframework/juniemvc/
        ├── controllers/    # Controller tests
        ├── repositories/   # Repository tests
        └── services/       # Service tests
```

## Code Organization
- **Controllers**: Handle HTTP requests and responses
- **Services**: Implement business logic
- **Repositories**: Manage data access
- **Entities**: Define data models

## Running the Application
```bash
# Start the application
./mvnw spring-boot:run

# Build the application
./mvnw clean package
```

## Running Tests
```bash
# Run all tests
./mvnw test

# Run specific test class
./mvnw test -Dtest=BeerControllerTest

# Run specific test method
./mvnw test -Dtest=BeerControllerTest#testGetAllBeers
```

## Database
- H2 in-memory database is used by default
- Access H2 console at http://localhost:8080/h2-console when the application is running
- JDBC URL: jdbc:h2:mem:testdb (default)
- Username: sa
- Password: (empty)

## API Endpoints
- GET /api/v1/beers - Get all beers
- GET /api/v1/beers/{id} - Get beer by ID
- POST /api/v1/beers - Create a new beer
- PUT /api/v1/beers/{id} - Update a beer
- DELETE /api/v1/beers/{id} - Delete a beer

## Best Practices
1. **Code Style**:
   - Follow standard Java naming conventions
   - Use Lombok annotations to reduce boilerplate
   - Document public APIs with JavaDoc

2. **Testing**:
   - Write tests for all layers (controllers, services, repositories)
   - Use @WebMvcTest for controller tests
   - Use @DataJpaTest for repository tests
   - Use Mockito for service tests
   - Follow the Given/When/Then pattern

3. **Git Workflow**:
   - Create feature branches for new features
   - Write descriptive commit messages
   - Create pull requests for code reviews

4. **Error Handling**:
   - Use appropriate HTTP status codes
   - Return meaningful error messages
   - Handle exceptions properly

5. **Security**:
   - Validate input data
   - Sanitize output data
   - Follow the principle of least privilege