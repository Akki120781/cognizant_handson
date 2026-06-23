package com.cognizant.handson.designpatterns.factory;

public abstract class DocumentFactory {
    public abstract Document createDocument();

    public void previewDocument() {
        Document document = createDocument();
        System.out.println("Created document type: " + document.getType());
        document.open();
    }
}

