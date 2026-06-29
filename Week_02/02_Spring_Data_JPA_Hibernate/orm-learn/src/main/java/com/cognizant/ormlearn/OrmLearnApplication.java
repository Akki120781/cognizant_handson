package com.cognizant.ormlearn;

import com.cognizant.ormlearn.model.Country;
import com.cognizant.ormlearn.service.CountryService;
import java.util.List;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class OrmLearnApplication {
    public static void main(String[] args) {
        SpringApplication.run(OrmLearnApplication.class, args);
    }

    @Bean
    CommandLineRunner runCountryExamples(CountryService countryService) {
        return args -> {
            List<Country> countries = countryService.getAllCountries();
            System.out.println("Countries: " + countries);
            System.out.println("Find IN: " + countryService.findCountryByCode("in"));

            Country country = new Country("SG", "Singapore");
            countryService.addCountry(country);
            countryService.updateCountry("SG", "Republic of Singapore");
            System.out.println("After add/update SG: " + countryService.findCountryByCode("sg"));
        };
    }
}
