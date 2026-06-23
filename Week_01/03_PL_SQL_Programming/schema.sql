CREATE TABLE Customers (
    CustomerID NUMBER PRIMARY KEY,
    Name VARCHAR2(100),
    DOB DATE,
    Balance NUMBER(12, 2),
    IsVIP CHAR(1) DEFAULT 'N' CHECK (IsVIP IN ('Y', 'N')),
    LastModified DATE
);

CREATE TABLE Accounts (
    AccountID NUMBER PRIMARY KEY,
    CustomerID NUMBER,
    AccountType VARCHAR2(20),
    Balance NUMBER(12, 2),
    LastModified DATE,
    CONSTRAINT fk_accounts_customer
        FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);

CREATE TABLE Transactions (
    TransactionID NUMBER PRIMARY KEY,
    AccountID NUMBER,
    TransactionDate DATE,
    Amount NUMBER(12, 2),
    TransactionType VARCHAR2(10),
    CONSTRAINT fk_transactions_account
        FOREIGN KEY (AccountID) REFERENCES Accounts(AccountID)
);

CREATE TABLE Loans (
    LoanID NUMBER PRIMARY KEY,
    CustomerID NUMBER,
    LoanAmount NUMBER(12, 2),
    InterestRate NUMBER(5, 2),
    StartDate DATE,
    EndDate DATE,
    CONSTRAINT fk_loans_customer
        FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);

CREATE TABLE Employees (
    EmployeeID NUMBER PRIMARY KEY,
    Name VARCHAR2(100),
    Position VARCHAR2(50),
    Salary NUMBER(12, 2),
    Department VARCHAR2(50),
    HireDate DATE
);

CREATE SEQUENCE TransactionSeq START WITH 1001 INCREMENT BY 1;

