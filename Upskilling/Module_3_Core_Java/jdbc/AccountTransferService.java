package com.cognizant.upskilling.corejava.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class AccountTransferService {
    private final Connection connection;

    public AccountTransferService(Connection connection) {
        this.connection = connection;
    }

    public void transfer(int fromAccountId, int toAccountId, double amount) throws SQLException {
        String debitSql = "UPDATE accounts SET balance = balance - ? WHERE account_id = ? AND balance >= ?";
        String creditSql = "UPDATE accounts SET balance = balance + ? WHERE account_id = ?";

        try {
            connection.setAutoCommit(false);
            try (PreparedStatement debit = connection.prepareStatement(debitSql);
                 PreparedStatement credit = connection.prepareStatement(creditSql)) {
                debit.setDouble(1, amount);
                debit.setInt(2, fromAccountId);
                debit.setDouble(3, amount);
                int debitCount = debit.executeUpdate();

                if (debitCount != 1) {
                    throw new SQLException("Debit failed due to insufficient funds or missing account.");
                }

                credit.setDouble(1, amount);
                credit.setInt(2, toAccountId);
                int creditCount = credit.executeUpdate();

                if (creditCount != 1) {
                    throw new SQLException("Credit failed due to missing destination account.");
                }

                connection.commit();
            }
        } catch (SQLException exception) {
            connection.rollback();
            throw exception;
        } finally {
            connection.setAutoCommit(true);
        }
    }
}
