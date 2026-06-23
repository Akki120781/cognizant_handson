package com.cognizant.handson.dsa.forecast;

public class FinancialForecastingDemo {
    public static void main(String[] args) {
        FinancialForecaster forecaster = new FinancialForecaster();

        double presentValue = 10000.00;
        double annualGrowthRate = 0.08;
        int years = 5;

        double futureValue = forecaster.calculateFutureValue(presentValue, annualGrowthRate, years);
        double memoizedFutureValue = forecaster.calculateFutureValueMemoized(presentValue, annualGrowthRate, years);

        System.out.printf("Recursive future value: %.2f%n", futureValue);
        System.out.printf("Memoized future value: %.2f%n", memoizedFutureValue);
    }
}

