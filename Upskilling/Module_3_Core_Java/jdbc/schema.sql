CREATE TABLE students (
    student_id INT PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);

CREATE TABLE accounts (
    account_id INT PRIMARY KEY,
    account_holder VARCHAR(100) NOT NULL,
    balance DECIMAL(12, 2) NOT NULL
);

INSERT INTO students (student_id, student_name, email) VALUES
(1, 'Asha', 'asha@example.com'),
(2, 'Ravi', 'ravi@example.com');

INSERT INTO accounts (account_id, account_holder, balance) VALUES
(101, 'Asha', 5000.00),
(102, 'Ravi', 3000.00);
