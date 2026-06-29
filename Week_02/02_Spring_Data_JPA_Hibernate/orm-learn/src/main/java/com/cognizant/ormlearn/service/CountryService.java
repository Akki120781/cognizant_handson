package com.cognizant.ormlearn.service;

import com.cognizant.ormlearn.model.Country;
import com.cognizant.ormlearn.repository.CountryRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CountryService {
    private final CountryRepository countryRepository;

    public CountryService(CountryRepository countryRepository) {
        this.countryRepository = countryRepository;
    }

    public List<Country> getAllCountries() {
        return countryRepository.findAll();
    }

    public Country findCountryByCode(String code) {
        return countryRepository.findById(code.toUpperCase())
                .orElseThrow(() -> new IllegalArgumentException("Country code not found: " + code));
    }

    public Country addCountry(Country country) {
        return countryRepository.save(country);
    }

    @Transactional
    public Country updateCountry(String code, String name) {
        Country country = findCountryByCode(code);
        country.setName(name);
        return country;
    }

    public void deleteCountry(String code) {
        countryRepository.deleteById(code.toUpperCase());
    }
}
