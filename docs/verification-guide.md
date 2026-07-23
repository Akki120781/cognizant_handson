# Verification Guide

This guide lists repeatable checks for the hands-on folders.

## Prerequisites

- Git
- Java 17+
- Maven
- Node.js 24+ or an Angular 20 compatible Node.js version
- pnpm

## Full Local Verification

From the repository root:

```powershell
.\scripts\verify-hands-on.ps1
```

Useful options:

```powershell
.\scripts\verify-hands-on.ps1 -SkipFrontendInstall
.\scripts\verify-hands-on.ps1 -SkipAngularTests
```

## Frontend Projects

```powershell
cd Week_04\react-fundamentals
pnpm install
pnpm build
```

```powershell
cd Week_05\react-advanced
pnpm install
pnpm build
```

```powershell
cd Week_07\angular-hands-on
pnpm install
pnpm build
pnpm test
```

To run the Angular portal locally:

```powershell
cd Week_07\angular-hands-on
pnpm run api
pnpm start
```

Application URL: `http://127.0.0.1:4200/`

Mock API URL: `http://localhost:3000/`

## Maven Projects

Each Maven folder can be checked from its own directory:

```powershell
mvn test
```

The root verification script discovers `pom.xml` files and runs this command for each Maven project.
