package com.cognizant.upskilling.corejava.network;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

public class TcpChatClient {
    public static void main(String[] args) throws IOException {
        try (Socket socket = new Socket("localhost", 5050);
             BufferedReader reader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
             PrintWriter writer = new PrintWriter(socket.getOutputStream(), true)) {
            System.out.println(reader.readLine());
            writer.println("Hello from client");
            System.out.println(reader.readLine());
        }
    }
}
