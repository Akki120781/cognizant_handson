# Cognizant Digital Nurture Java FSE Hands-on

This repository contains hands-on exercise solutions for the Cognizant Digital Nurture Java FSE learning track.

## Contents

```text
Upskilling/
  Module_1_HTML5_CSS3_JavaScript/
  Module_1_Bootstrap5/
  Module_2_ANSI_SQL_Using_MySQL/
  Module_3_Core_Java/
Week_01/
  01_Design_Patterns_and_Principles/
  02_Data_Structures_and_Algorithms/
  03_PL_SQL_Programming/
  04_TDD_Using_JUnit5_and_Mockito/
  05_SLF4J_Logging/
Week_02/
  01_Spring_Core_and_Maven/
  02_Spring_Data_JPA_Hibernate/
Week_03/
  01_Spring_REST_using_Spring_Boot_3/
  02_Microservices_with_Spring_Boot_3_and_Spring_Cloud/
Week_04/
  react-fundamentals/
Week_05/
  react-advanced/
Week_06/
  01_Git_Hands_On/
Week_07/
  angular-hands-on/
```

## Running examples

Plain Java examples can be compiled with `javac` from their `src` folders.

The JUnit, Mockito, and SLF4J exercises are Maven projects and can be run with:

```bash
mvn test
mvn exec:java
```

SQL scripts are grouped by module and can be executed in the matching database environment.

Frontend projects can be run from their own folders after installing dependencies. The Angular portal also includes a mock API script backed by `db.json`.

## Verification

Use the root verification script for a local check across Maven and frontend projects:

```powershell
.\scripts\verify-hands-on.ps1
```

Additional notes are available in `docs/verification-guide.md` and `docs/project-map.md`.
