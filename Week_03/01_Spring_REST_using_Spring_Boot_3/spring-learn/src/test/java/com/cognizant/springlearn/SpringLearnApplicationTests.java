package com.cognizant.springlearn;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.cognizant.springlearn.controller.CountryController;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
class SpringLearnApplicationTests {
    @Autowired
    private CountryController countryController;

    @Autowired
    private MockMvc mvc;

    @Test
    void countryControllerLoads() {
        assertNotNull(countryController);
    }

    @Test
    void getCountryReturnsIndia() throws Exception {
        mvc.perform(get("/country"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value("IN"))
                .andExpect(jsonPath("$.name").value("India"));
    }

    @Test
    void getCountryReturnsNotFoundForUnknownCode() throws Exception {
        mvc.perform(get("/countries/az"))
                .andExpect(status().isNotFound())
                .andExpect(status().reason("Country not found"));
    }

    @Test
    void authenticateReturnsJwtToken() throws Exception {
        String credentials = Base64.getEncoder()
                .encodeToString("user:pwd".getBytes(StandardCharsets.UTF_8));

        mvc.perform(get("/authenticate").header("Authorization", "Basic " + credentials))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").exists());
    }
}
