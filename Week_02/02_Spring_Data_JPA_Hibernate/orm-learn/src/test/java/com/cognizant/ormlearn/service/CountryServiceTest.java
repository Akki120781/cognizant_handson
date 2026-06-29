package com.cognizant.ormlearn.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import com.cognizant.ormlearn.model.Country;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
class CountryServiceTest {
    @Autowired
    private CountryService countryService;

    @Test
    void findCountryByCodeIgnoresCase() {
        Country country = countryService.findCountryByCode("in");

        assertNotNull(country);
        assertEquals("India", country.getName());
    }

    @Test
    void addAndUpdateCountry() {
        Country country = countryService.addCountry(new Country("FR", "France"));
        Country updated = countryService.updateCountry(country.getCode(), "French Republic");

        assertEquals("French Republic", updated.getName());
    }
}
