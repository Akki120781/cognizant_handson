SET SERVEROUTPUT ON;

BEGIN
    FOR customer_loan IN (
        SELECT l.LoanID, l.InterestRate
        FROM Loans l
        JOIN Customers c ON c.CustomerID = l.CustomerID
        WHERE TRUNC(MONTHS_BETWEEN(SYSDATE, c.DOB) / 12) > 60
    ) LOOP
        UPDATE Loans
        SET InterestRate = customer_loan.InterestRate - 1
        WHERE LoanID = customer_loan.LoanID;

        DBMS_OUTPUT.PUT_LINE('Applied 1% senior-citizen discount to loan ' || customer_loan.LoanID);
    END LOOP;

    COMMIT;
END;
/

BEGIN
    FOR customer_record IN (
        SELECT CustomerID, Name, Balance
        FROM Customers
    ) LOOP
        IF customer_record.Balance > 10000 THEN
            UPDATE Customers
            SET IsVIP = 'Y',
                LastModified = SYSDATE
            WHERE CustomerID = customer_record.CustomerID;

            DBMS_OUTPUT.PUT_LINE(customer_record.Name || ' promoted to VIP status.');
        END IF;
    END LOOP;

    COMMIT;
END;
/

BEGIN
    FOR due_loan IN (
        SELECT c.Name, l.LoanID, l.EndDate
        FROM Loans l
        JOIN Customers c ON c.CustomerID = l.CustomerID
        WHERE l.EndDate BETWEEN SYSDATE AND SYSDATE + 30
        ORDER BY l.EndDate
    ) LOOP
        DBMS_OUTPUT.PUT_LINE(
            'Reminder: Loan ' || due_loan.LoanID
            || ' for customer ' || due_loan.Name
            || ' is due on ' || TO_CHAR(due_loan.EndDate, 'DD-MON-YYYY')
        );
    END LOOP;
END;
/

