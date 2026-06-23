INSERT INTO Customers (CustomerID, Name, DOB, Balance, IsVIP, LastModified)
VALUES (1, 'Anita Sharma', DATE '1958-04-15', 15000, 'N', SYSDATE);

INSERT INTO Customers (CustomerID, Name, DOB, Balance, IsVIP, LastModified)
VALUES (2, 'Rahul Mehta', DATE '1992-08-22', 8500, 'N', SYSDATE);

INSERT INTO Customers (CustomerID, Name, DOB, Balance, IsVIP, LastModified)
VALUES (3, 'Mary Thomas', DATE '1961-01-05', 22000, 'N', SYSDATE);

INSERT INTO Accounts (AccountID, CustomerID, AccountType, Balance, LastModified)
VALUES (101, 1, 'Savings', 12000, SYSDATE);

INSERT INTO Accounts (AccountID, CustomerID, AccountType, Balance, LastModified)
VALUES (102, 2, 'Current', 7000, SYSDATE);

INSERT INTO Accounts (AccountID, CustomerID, AccountType, Balance, LastModified)
VALUES (103, 3, 'Savings', 18000, SYSDATE);

INSERT INTO Loans (LoanID, CustomerID, LoanAmount, InterestRate, StartDate, EndDate)
VALUES (201, 1, 500000, 8.50, DATE '2024-01-01', SYSDATE + 15);

INSERT INTO Loans (LoanID, CustomerID, LoanAmount, InterestRate, StartDate, EndDate)
VALUES (202, 2, 350000, 9.25, DATE '2024-03-01', SYSDATE + 45);

INSERT INTO Loans (LoanID, CustomerID, LoanAmount, InterestRate, StartDate, EndDate)
VALUES (203, 3, 250000, 8.75, DATE '2024-06-01', SYSDATE + 20);

INSERT INTO Employees (EmployeeID, Name, Position, Salary, Department, HireDate)
VALUES (301, 'Isha Rao', 'Analyst', 60000, 'Banking', DATE '2022-07-01');

INSERT INTO Employees (EmployeeID, Name, Position, Salary, Department, HireDate)
VALUES (302, 'Karan Bose', 'Manager', 90000, 'Banking', DATE '2020-02-15');

COMMIT;

