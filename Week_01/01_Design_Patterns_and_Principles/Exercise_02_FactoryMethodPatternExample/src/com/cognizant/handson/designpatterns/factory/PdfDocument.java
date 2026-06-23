package com.cognizant.handson.designpatterns.factory;

public class PdfDocument implements Document {
    @Override
    public String getType() {
        return "PDF";
    }

    @Override
    public void open() {
        System.out.println("Opening a PDF document.");
    }
}

