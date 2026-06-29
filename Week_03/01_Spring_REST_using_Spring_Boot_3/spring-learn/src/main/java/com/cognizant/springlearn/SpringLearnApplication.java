package com.cognizant.springlearn;

import com.cognizant.springlearn.model.Country;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

@SpringBootApplication
public class SpringLearnApplication {
    private static final Logger LOGGER = LoggerFactory.getLogger(SpringLearnApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(SpringLearnApplication.class, args);
        displayDate();
        displayCountry();
        displayCountries();
    }

    static void displayDate() {
        try (ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("date-format.xml")) {
            SimpleDateFormat dateFormat = context.getBean("dateFormat", SimpleDateFormat.class);
            LOGGER.debug("Formatted date: {}", dateFormat.format(new Date()));
        }
    }

    static void displayCountry() {
        try (ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("country.xml")) {
            Country country = context.getBean("country", Country.class);
            Country anotherCountry = context.getBean("country", Country.class);
            LOGGER.debug("Country: {}", country);
            LOGGER.debug("Same singleton bean: {}", country == anotherCountry);
        }
    }

    @SuppressWarnings("unchecked")
    static void displayCountries() {
        ApplicationContext context = new ClassPathXmlApplicationContext("country.xml");
        List<Country> countries = context.getBean("countryList", List.class);
        LOGGER.debug("Countries: {}", countries);
        ((ClassPathXmlApplicationContext) context).close();
    }
}
