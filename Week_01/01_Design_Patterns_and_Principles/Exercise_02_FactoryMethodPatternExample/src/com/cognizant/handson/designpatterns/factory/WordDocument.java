package com.cognizant.handson.designpatterns.factory;

public class WordDocument implements Document {
    @Override
    public String getType() {
        return "Word";
    }

    @Override
    public void open() {
        System.out.println("Opening a Word document.");
    }
}

