package com.cognizant.handson.designpatterns.factory;

public class ExcelDocument implements Document {
    @Override
    public String getType() {
        return "Excel";
    }

    @Override
    public void open() {
        System.out.println("Opening an Excel document.");
    }
}

