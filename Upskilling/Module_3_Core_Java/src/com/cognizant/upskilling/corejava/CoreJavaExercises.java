package com.cognizant.upskilling.corejava;

import java.io.BufferedReader;
import java.io.IOException;
import java.lang.reflect.Method;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Duration;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class CoreJavaExercises {
    public static void main(String[] args) throws Exception {
        helloWorld();
        simpleCalculator();
        evenOrOddChecker(42);
        leapYearChecker(2024);
        multiplicationTable(5);
        dataTypeDemonstration();
        typeCastingExample();
        operatorPrecedence();
        gradeCalculator(86);
        numberGuessingGameDemo(42, List.of(30, 50, 42));
        factorialCalculator(5);
        methodOverloading();
        recursiveFibonacciDemo(8);
        arraySumAndAverage(new int[] { 10, 20, 30, 40 });
        stringReversal("Cognizant");
        palindromeChecker("Never odd or even");
        classAndObjectCreation();
        inheritanceExample();
        interfaceImplementation();
        tryCatchExample(10, 0);
        customExceptionDemo(16);
        fileWritingAndReading();
        arrayListExample();
        hashMapExample();
        threadCreation();
        lambdaExpressions();
        streamApi();
        recordsDemo();
        patternMatchingForSwitch();
        reflectionDemo();
        virtualThreadsDemo();
        executorServiceAndCallable();
        bytecodeInspectionNote();
        decompileNote();
        httpClientNote();
    }

    static void helloWorld() {
        System.out.println("1. Hello, World!");
    }

    static void simpleCalculator() {
        double first = 20;
        double second = 4;
        System.out.println("2. Addition: " + (first + second));
        System.out.println("2. Subtraction: " + (first - second));
        System.out.println("2. Multiplication: " + (first * second));
        System.out.println("2. Division: " + (first / second));
    }

    static void evenOrOddChecker(int number) {
        System.out.println("3. " + number + (number % 2 == 0 ? " is even" : " is odd"));
    }

    static void leapYearChecker(int year) {
        boolean leapYear = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
        System.out.println("4. " + year + (leapYear ? " is a leap year" : " is not a leap year"));
    }

    static void multiplicationTable(int number) {
        System.out.println("5. Multiplication table for " + number);
        for (int index = 1; index <= 10; index++) {
            System.out.println(number + " x " + index + " = " + (number * index));
        }
    }

    static void dataTypeDemonstration() {
        int age = 21;
        float percentage = 87.5f;
        double accountBalance = 15000.75;
        char grade = 'A';
        boolean active = true;
        System.out.println("6. Data types: " + age + ", " + percentage + ", " + accountBalance + ", " + grade + ", " + active);
    }

    static void typeCastingExample() {
        double price = 99.95;
        int roundedPrice = (int) price;
        int quantity = 7;
        double preciseQuantity = quantity;
        System.out.println("7. double to int: " + roundedPrice + ", int to double: " + preciseQuantity);
    }

    static void operatorPrecedence() {
        int result = 10 + 5 * 2;
        int groupedResult = (10 + 5) * 2;
        System.out.println("8. Multiplication first: " + result + ", grouped expression: " + groupedResult);
    }

    static void gradeCalculator(int marks) {
        char grade;
        if (marks >= 90) {
            grade = 'A';
        } else if (marks >= 80) {
            grade = 'B';
        } else if (marks >= 70) {
            grade = 'C';
        } else if (marks >= 60) {
            grade = 'D';
        } else {
            grade = 'F';
        }
        System.out.println("9. Grade: " + grade);
    }

    static void numberGuessingGameDemo(int target, List<Integer> guesses) {
        System.out.println("10. Number guessing game");
        for (int guess : guesses) {
            if (guess == target) {
                System.out.println("Correct guess: " + guess);
                return;
            }
            System.out.println(guess < target ? "Too low" : "Too high");
        }
    }

    static void factorialCalculator(int number) {
        long factorial = 1;
        for (int index = 2; index <= number; index++) {
            factorial *= index;
        }
        System.out.println("11. Factorial: " + factorial);
    }

    static void methodOverloading() {
        System.out.println("12. add(int,int): " + add(2, 3));
        System.out.println("12. add(double,double): " + add(2.5, 3.5));
        System.out.println("12. add(int,int,int): " + add(1, 2, 3));
    }

    static int add(int first, int second) {
        return first + second;
    }

    static double add(double first, double second) {
        return first + second;
    }

    static int add(int first, int second, int third) {
        return first + second + third;
    }

    static void recursiveFibonacciDemo(int number) {
        System.out.println("13. Fibonacci(" + number + "): " + fibonacci(number));
    }

    static int fibonacci(int number) {
        if (number <= 1) {
            return number;
        }
        return fibonacci(number - 1) + fibonacci(number - 2);
    }

    static void arraySumAndAverage(int[] numbers) {
        int sum = Arrays.stream(numbers).sum();
        double average = numbers.length == 0 ? 0 : (double) sum / numbers.length;
        System.out.println("14. Sum: " + sum + ", Average: " + average);
    }

    static void stringReversal(String input) {
        System.out.println("15. Reversed string: " + new StringBuilder(input).reverse());
    }

    static void palindromeChecker(String input) {
        String cleaned = input.replaceAll("[^A-Za-z0-9]", "").toLowerCase();
        boolean palindrome = cleaned.contentEquals(new StringBuilder(cleaned).reverse());
        System.out.println("16. Palindrome: " + palindrome);
    }

    static void classAndObjectCreation() {
        Car car = new Car("Honda", "City", 2024);
        System.out.println("17. " + car.displayDetails());
    }

    static void inheritanceExample() {
        Animal animal = new Animal();
        Animal dog = new Dog();
        System.out.println("18. Animal sound: " + animal.makeSound());
        System.out.println("18. Dog sound: " + dog.makeSound());
    }

    static void interfaceImplementation() {
        List<Playable> instruments = List.of(new Guitar(), new Piano());
        for (Playable instrument : instruments) {
            System.out.println("19. " + instrument.play());
        }
    }

    static void tryCatchExample(int dividend, int divisor) {
        try {
            System.out.println("20. Division result: " + (dividend / divisor));
        } catch (ArithmeticException exception) {
            System.out.println("20. Cannot divide by zero.");
        }
    }

    static void customExceptionDemo(int age) {
        try {
            validateAge(age);
            System.out.println("21. Age is valid.");
        } catch (InvalidAgeException exception) {
            System.out.println("21. " + exception.getMessage());
        }
    }

    static void validateAge(int age) throws InvalidAgeException {
        if (age < 18) {
            throw new InvalidAgeException("Age must be at least 18.");
        }
    }

    static void fileWritingAndReading() throws IOException {
        Path output = Path.of("output.txt");
        Files.writeString(output, "Core Java file writing example");
        try (BufferedReader reader = Files.newBufferedReader(output)) {
            System.out.println("22-23. File content: " + reader.readLine());
        }
        Files.deleteIfExists(output);
    }

    static void arrayListExample() {
        ArrayList<String> students = new ArrayList<>();
        students.add("Asha");
        students.add("Ravi");
        students.add("Meera");
        System.out.println("24. Students: " + students);
    }

    static void hashMapExample() {
        Map<Integer, String> studentMap = new HashMap<>();
        studentMap.put(101, "Asha");
        studentMap.put(102, "Ravi");
        System.out.println("25. Student 102: " + studentMap.get(102));
    }

    static void threadCreation() throws InterruptedException {
        Thread first = new Thread(new MessageTask("First thread"));
        Thread second = new Thread(new MessageTask("Second thread"));
        first.start();
        second.start();
        first.join();
        second.join();
    }

    static void lambdaExpressions() {
        List<String> names = new ArrayList<>(List.of("Meera", "Asha", "Ravi"));
        Collections.sort(names, (first, second) -> first.compareToIgnoreCase(second));
        System.out.println("27. Sorted names: " + names);
    }

    static void streamApi() {
        List<Integer> evenNumbers = List.of(1, 2, 3, 4, 5, 6).stream()
                .filter(number -> number % 2 == 0)
                .toList();
        System.out.println("28. Even numbers: " + evenNumbers);
    }

    static void recordsDemo() {
        List<Person> people = List.of(new Person("Asha", 22), new Person("Ravi", 17), new Person("Meera", 31));
        List<Person> adults = people.stream().filter(person -> person.age() >= 18).toList();
        System.out.println("29. Adults: " + adults);
    }

    static void patternMatchingForSwitch() {
        System.out.println("30. " + describeObject(42));
        System.out.println("30. " + describeObject("Java"));
        System.out.println("30. " + describeObject(10.5));
    }

    static String describeObject(Object input) {
        return switch (input) {
            case Integer value -> "Integer value: " + value;
            case String value -> "String value: " + value;
            case Double value -> "Double value: " + value;
            case null -> "Null value";
            default -> "Other type: " + input.getClass().getSimpleName();
        };
    }

    static void reflectionDemo() throws ReflectiveOperationException {
        Class<?> carClass = Class.forName("com.cognizant.upskilling.corejava.CoreJavaExercises$Car");
        Object car = carClass.getDeclaredConstructor(String.class, String.class, int.class)
                .newInstance("Toyota", "Camry", 2023);
        Method method = carClass.getDeclaredMethod("displayDetails");
        System.out.println("39. Reflection result: " + method.invoke(car));
    }

    static void virtualThreadsDemo() throws InterruptedException {
        List<Thread> virtualThreads = new ArrayList<>();
        for (int index = 1; index <= 100; index++) {
            int taskNumber = index;
            virtualThreads.add(Thread.startVirtualThread(() -> {
                if (taskNumber <= 3) {
                    System.out.println("40. Virtual thread " + taskNumber);
                }
            }));
        }
        for (Thread thread : virtualThreads) {
            thread.join();
        }
        System.out.println("40. Started 100 virtual threads for demonstration.");
    }

    static void executorServiceAndCallable() throws InterruptedException, ExecutionException {
        ExecutorService executorService = Executors.newFixedThreadPool(2);
        try {
            List<Callable<String>> tasks = List.of(
                    () -> "Task A result",
                    () -> "Task B result"
            );
            List<Future<String>> futures = executorService.invokeAll(tasks);
            for (Future<String> future : futures) {
                System.out.println("41. " + future.get());
            }
        } finally {
            executorService.shutdown();
        }
    }

    static void bytecodeInspectionNote() {
        System.out.println("37. Compile this class and run: javap -c com.cognizant.upskilling.corejava.CoreJavaExercises");
    }

    static void decompileNote() {
        System.out.println("38. Compile a class, open the .class file in JD-GUI or CFR, and compare the decompiled source.");
    }

    static void httpClientNote() {
        HttpClient client = HttpClient.newBuilder().connectTimeout(Duration.ofSeconds(5)).build();
        HttpRequest request = HttpRequest.newBuilder(URI.create("https://api.github.com")).GET().build();
        System.out.println("36. HTTP request prepared with client: " + client + ", request: " + request.uri());
    }

    record Person(String name, int age) {
    }

    static class Car {
        private final String make;
        private final String model;
        private final int year;

        Car(String make, String model, int year) {
            this.make = make;
            this.model = model;
            this.year = year;
        }

        String displayDetails() {
            return year + " " + make + " " + model;
        }
    }

    static class Animal {
        String makeSound() {
            return "Generic animal sound";
        }
    }

    static class Dog extends Animal {
        @Override
        String makeSound() {
            return "Bark";
        }
    }

    interface Playable {
        String play();
    }

    static class Guitar implements Playable {
        @Override
        public String play() {
            return "Guitar is playing";
        }
    }

    static class Piano implements Playable {
        @Override
        public String play() {
            return "Piano is playing";
        }
    }

    static class InvalidAgeException extends Exception {
        InvalidAgeException(String message) {
            super(message);
        }
    }

    static class MessageTask implements Runnable {
        private final String message;

        MessageTask(String message) {
            this.message = message;
        }

        @Override
        public void run() {
            for (int count = 1; count <= 2; count++) {
                System.out.println("26. " + message + " - " + count);
            }
        }
    }
}
