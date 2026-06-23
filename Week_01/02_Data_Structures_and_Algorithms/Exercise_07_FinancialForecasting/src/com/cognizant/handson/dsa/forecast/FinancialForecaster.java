package com.cognizant.handson.dsa.forecast;

import java.util.HashMap;
import java.util.Map;

public class FinancialForecaster {
    public double calculateFutureValue(double presentValue, double annualGrowthRate, int years) {
        if (years < 0) {
            throw new IllegalArgumentException("Years cannot be negative.");
        }
        if (years == 0) {
            return presentValue;
        }
        return calculateFutureValue(presentValue, annualGrowthRate, years - 1) * (1 + annualGrowthRate);
    }

    public double calculateFutureValueMemoized(double presentValue, double annualGrowthRate, int years) {
        return calculateFutureValueMemoized(presentValue, annualGrowthRate, years, new HashMap<>());
    }

    private double calculateFutureValueMemoized(
            double presentValue,
            double annualGrowthRate,
            int years,
            Map<Integer, Double> cache
    ) {
        if (years < 0) {
            throw new IllegalArgumentException("Years cannot be negative.");
        }
        if (years == 0) {
            return presentValue;
        }
        if (cache.containsKey(years)) {
            return cache.get(years);
        }

        double futureValue = calculateFutureValueMemoized(presentValue, annualGrowthRate, years - 1, cache)
                * (1 + annualGrowthRate);
        cache.put(years, futureValue);
        return futureValue;
    }
}

