package com.cognizant.handson.designpatterns.singleton;

public class SingletonPatternDemo {
    public static void main(String[] args) {
        Logger firstLogger = Logger.getInstance();
        Logger secondLogger = Logger.getInstance();

        firstLogger.log("First logger is ready.");
        secondLogger.log("Second logger is using the same instance.");

        System.out.println("Same logger instance: " + (firstLogger == secondLogger));
    }
}

