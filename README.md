# Cognizant Digital Nurture Java FSE Hands-on

This repository contains week-wise solutions for the Cognizant Digital Nurture 5.0 Java FSE deep-skilling hands-on exercises.

## Current progress

| Week | Focus area | Status |
| --- | --- | --- |
| Week 1 | Engineering Concepts and Programming Languages | Completed |
| Week 2+ | Spring, Spring Boot, Microservices, React, Git, Angular | Planned for later commits |

## Week 1 mandatory hands-on covered

| Skill | Mandatory exercise |
| --- | --- |
| Design Principles and Patterns | Exercise 1: Implementing the Singleton Pattern |
| Design Principles and Patterns | Exercise 2: Implementing the Factory Method Pattern |
| Data Structures and Algorithms | Exercise 2: E-commerce Platform Search Function |
| Data Structures and Algorithms | Exercise 7: Financial Forecasting |
| PL/SQL Programming | Exercise 1: Control Structures |
| PL/SQL Programming | Exercise 3: Stored Procedures |
| TDD using JUnit5 and Mockito | JUnit basic setup, assertions, AAA pattern, setup and teardown |
| TDD using JUnit5 and Mockito | Mockito mocking, stubbing, and interaction verification |
| SLF4J Logging Framework | Logging error messages and warning levels |

## Repository layout

```text
Week_01/
  01_Design_Patterns_and_Principles/
  02_Data_Structures_and_Algorithms/
  03_PL_SQL_Programming/
  04_TDD_Using_JUnit5_and_Mockito/
  05_SLF4J_Logging/
docs/
  commit-plan.md
```

## Running the Java examples

The plain Java exercises can be compiled with `javac` from their `src` folders. The JUnit, Mockito, and SLF4J exercises are Maven projects and can be run with:

```bash
mvn test
mvn exec:java
```

Maven is required for dependency-based exercises.

