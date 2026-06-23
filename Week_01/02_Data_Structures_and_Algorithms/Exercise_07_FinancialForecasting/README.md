# Exercise 7: Financial Forecasting

This exercise predicts future value using recursion.

Formula:

```text
futureValue = presentValue * (1 + growthRate)^years
```

The naive recursive method has O(n) time complexity and O(n) call stack usage. The optimized memoized method stores already calculated values so repeated calls avoid duplicate computation.

