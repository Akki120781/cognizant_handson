SET SERVEROUTPUT ON;

CREATE OR REPLACE PROCEDURE ProcessMonthlyInterest AS
BEGIN
    UPDATE Accounts
    SET Balance = Balance * 1.01,
        LastModified = SYSDATE
    WHERE UPPER(AccountType) = 'SAVINGS';

    DBMS_OUTPUT.PUT_LINE(SQL%ROWCOUNT || ' savings accounts updated with monthly interest.');
    COMMIT;
END;
/

CREATE OR REPLACE PROCEDURE UpdateEmployeeBonus(
    p_department IN Employees.Department%TYPE,
    p_bonus_percentage IN NUMBER
) AS
BEGIN
    UPDATE Employees
    SET Salary = Salary + (Salary * p_bonus_percentage / 100)
    WHERE UPPER(Department) = UPPER(p_department);

    DBMS_OUTPUT.PUT_LINE(SQL%ROWCOUNT || ' employee salaries updated for department ' || p_department || '.');
    COMMIT;
END;
/

CREATE OR REPLACE PROCEDURE TransferFunds(
    p_source_account_id IN Accounts.AccountID%TYPE,
    p_destination_account_id IN Accounts.AccountID%TYPE,
    p_amount IN NUMBER
) AS
    v_source_balance Accounts.Balance%TYPE;
BEGIN
    IF p_amount <= 0 THEN
        RAISE_APPLICATION_ERROR(-20001, 'Transfer amount must be greater than zero.');
    END IF;

    SELECT Balance
    INTO v_source_balance
    FROM Accounts
    WHERE AccountID = p_source_account_id
    FOR UPDATE;

    IF v_source_balance < p_amount THEN
        RAISE_APPLICATION_ERROR(-20002, 'Insufficient balance in source account.');
    END IF;

    UPDATE Accounts
    SET Balance = Balance - p_amount,
        LastModified = SYSDATE
    WHERE AccountID = p_source_account_id;

    UPDATE Accounts
    SET Balance = Balance + p_amount,
        LastModified = SYSDATE
    WHERE AccountID = p_destination_account_id;

    INSERT INTO Transactions (TransactionID, AccountID, TransactionDate, Amount, TransactionType)
    VALUES (TransactionSeq.NEXTVAL, p_source_account_id, SYSDATE, p_amount, 'WITHDRAW');

    INSERT INTO Transactions (TransactionID, AccountID, TransactionDate, Amount, TransactionType)
    VALUES (TransactionSeq.NEXTVAL, p_destination_account_id, SYSDATE, p_amount, 'DEPOSIT');

    COMMIT;
    DBMS_OUTPUT.PUT_LINE('Transferred ' || p_amount || ' from account '
        || p_source_account_id || ' to account ' || p_destination_account_id || '.');
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        ROLLBACK;
        RAISE_APPLICATION_ERROR(-20003, 'Source account does not exist.');
    WHEN OTHERS THEN
        ROLLBACK;
        RAISE;
END;
/

BEGIN
    ProcessMonthlyInterest;
    UpdateEmployeeBonus('Banking', 10);
    TransferFunds(101, 102, 1000);
END;
/

