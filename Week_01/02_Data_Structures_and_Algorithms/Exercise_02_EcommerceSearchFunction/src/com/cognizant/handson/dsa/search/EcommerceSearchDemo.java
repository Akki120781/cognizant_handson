package com.cognizant.handson.dsa.search;

public class EcommerceSearchDemo {
    public static void main(String[] args) {
        Product[] products = {
                new Product(105, "Wireless Mouse", "Electronics"),
                new Product(101, "Notebook", "Stationery"),
                new Product(109, "Running Shoes", "Fashion"),
                new Product(103, "Water Bottle", "Kitchen")
        };

        ProductSearch productSearch = new ProductSearch();
        Product[] sortedProducts = productSearch.sortedByProductId(products);

        System.out.println("Linear search result:");
        System.out.println(productSearch.linearSearch(products, 109).orElseThrow());

        System.out.println("Binary search result:");
        System.out.println(productSearch.binarySearch(sortedProducts, 109).orElseThrow());
    }
}

