package com.cognizant.handson.designpatterns.factory;

import java.util.List;

public class FactoryMethodPatternDemo {
    public static void main(String[] args) {
        List<DocumentFactory> factories = List.of(
                new WordDocumentFactory(),
                new PdfDocumentFactory(),
                new ExcelDocumentFactory()
        );

        for (DocumentFactory factory : factories) {
            factory.previewDocument();
        }
    }
}

