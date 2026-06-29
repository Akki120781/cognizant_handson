package com.library.service;

import com.library.repository.BookRepository;
import java.util.List;

public class BookService {
    private BookRepository bookRepository;

    public BookService() {
    }

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<String> getAvailableBooks() {
        return bookRepository.findAllBooks();
    }

    public void setBookRepository(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }
}
