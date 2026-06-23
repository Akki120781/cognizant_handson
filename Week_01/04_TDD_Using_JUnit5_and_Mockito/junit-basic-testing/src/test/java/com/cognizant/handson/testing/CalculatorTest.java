package com.cognizant.handson.testing;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class CalculatorTest {
    private Calculator calculator;

    @BeforeEach
    void setUp() {
        calculator = new Calculator();
    }

    @AfterEach
    void tearDown() {
        calculator = null;
    }

    @Test
    void addReturnsSumUsingArrangeActAssert() {
        int firstNumber = 10;
        int secondNumber = 5;

        int result = calculator.add(firstNumber, secondNumber);

        assertEquals(15, result);
    }

    @Test
    void subtractReturnsDifferenceUsingArrangeActAssert() {
        int firstNumber = 10;
        int secondNumber = 5;

        int result = calculator.subtract(firstNumber, secondNumber);

        assertEquals(5, result);
    }
}

