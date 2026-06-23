package com.cognizant.handson.dsa.search;

import java.util.Arrays;
import java.util.Optional;

public class ProductSearch {
    public Optional<Product> linearSearch(Product[] products, int productId) {
        for (Product product : products) {
            if (product.getProductId() == productId) {
                return Optional.of(product);
            }
        }
        return Optional.empty();
    }

    public Optional<Product> binarySearch(Product[] sortedProducts, int productId) {
        int left = 0;
        int right = sortedProducts.length - 1;

        while (left <= right) {
            int middle = left + (right - left) / 2;
            int middleId = sortedProducts[middle].getProductId();

            if (middleId == productId) {
                return Optional.of(sortedProducts[middle]);
            }
            if (middleId < productId) {
                left = middle + 1;
            } else {
                right = middle - 1;
            }
        }

        return Optional.empty();
    }

    public Product[] sortedByProductId(Product[] products) {
        Product[] sortedProducts = Arrays.copyOf(products, products.length);
        Arrays.sort(sortedProducts);
        return sortedProducts;
    }
}

