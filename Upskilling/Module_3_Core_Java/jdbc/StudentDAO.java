package com.cognizant.upskilling.corejava.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class StudentDAO {
    private final Connection connection;

    public StudentDAO(Connection connection) {
        this.connection = connection;
    }

    public void printStudents() throws SQLException {
        try (Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery("SELECT student_id, student_name, email FROM students")) {
            while (resultSet.next()) {
                System.out.println(resultSet.getInt("student_id") + " "
                        + resultSet.getString("student_name") + " "
                        + resultSet.getString("email"));
            }
        }
    }

    public void insertStudent(int id, String name, String email) throws SQLException {
        String sql = "INSERT INTO students (student_id, student_name, email) VALUES (?, ?, ?)";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, id);
            statement.setString(2, name);
            statement.setString(3, email);
            statement.executeUpdate();
        }
    }

    public void updateStudentEmail(int id, String email) throws SQLException {
        String sql = "UPDATE students SET email = ? WHERE student_id = ?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, email);
            statement.setInt(2, id);
            statement.executeUpdate();
        }
    }
}
