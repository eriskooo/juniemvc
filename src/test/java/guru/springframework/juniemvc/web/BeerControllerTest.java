package guru.springframework.juniemvc.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import guru.springframework.juniemvc.domain.Beer;
import guru.springframework.juniemvc.services.BeerService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = BeerController.class)
class BeerControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @MockBean
    BeerService beerService;

    @Test
    @DisplayName("list returns all beers when q not provided")
    void listAll() throws Exception {
        when(beerService.listAll()).thenReturn(List.of(
                new Beer("IPA", new BigDecimal("6.0")),
                new Beer("Stout", new BigDecimal("8.0"))
        ));

        mockMvc.perform(get("/api/beers"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].description", is("IPA")));
    }

    @Test
    @DisplayName("list with q delegates to search")
    void search() throws Exception {
        when(beerService.search("stout")).thenReturn(List.of(new Beer("Stout", new BigDecimal("8.0"))));
        mockMvc.perform(get("/api/beers").param("q", "stout"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].description", containsStringIgnoringCase("stout")));
    }

    @Test
    @DisplayName("get by id returns 200 when found")
    void getById() throws Exception {
        Beer b = new Beer("Pils", new BigDecimal("5.0"));
        b.setId(10L);
        when(beerService.getById(10L)).thenReturn(b);

        mockMvc.perform(get("/api/beers/10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(10)))
                .andExpect(jsonPath("$.description", is("Pils")));
    }

    @Test
    @DisplayName("get by id returns 404 when missing")
    void getByIdNotFound() throws Exception {
        when(beerService.getById(999L)).thenThrow(new NotFoundException("Beer not found: 999"));
        mockMvc.perform(get("/api/beers/999"))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("create returns 201 and Location header")
    void create() throws Exception {
        Beer toCreate = new Beer("Lager", new BigDecimal("4.7"));
        Beer saved = new Beer("Lager", new BigDecimal("4.7"));
        saved.setId(3L);
        when(beerService.create(any(Beer.class))).thenReturn(saved);

        mockMvc.perform(post("/api/beers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(toCreate)))
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", "/api/beers/3"))
                .andExpect(jsonPath("$.id", is(3)));
    }

    @Test
    @DisplayName("create with invalid payload returns 400")
    void createInvalid() throws Exception {
        // invalid: blank description and abv out of range
        String json = "{\"description\":\"\",\"abv\":-1}";
        mockMvc.perform(post("/api/beers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("update returns updated entity")
    void update() throws Exception {
        Beer update = new Beer("Updated", new BigDecimal("6.2"));
        Beer updated = new Beer("Updated", new BigDecimal("6.2"));
        updated.setId(7L);
        when(beerService.update(eq(7L), any(Beer.class))).thenReturn(updated);

        mockMvc.perform(put("/api/beers/7")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(update)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(7)))
                .andExpect(jsonPath("$.description", is("Updated")));
    }

    @Test
    @DisplayName("delete returns 204 and delegates to service")
    void deleteOk() throws Exception {
        mockMvc.perform(delete("/api/beers/5"))
                .andExpect(status().isNoContent());
        Mockito.verify(beerService).delete(5L);
    }
}
