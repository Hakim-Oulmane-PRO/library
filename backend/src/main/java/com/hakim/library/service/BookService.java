package com.hakim.library.service;

import com.hakim.library.domain.Book;
import com.hakim.library.domain.DTO.BookDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;


public interface BookService {
    Page<Book> getAll(Pageable pageable);

    List<Book> getAll();

    Book getOne(Long id) throws Exception;

    Book add(BookDTO book) throws Exception;

    Book update(Long id, BookDTO book) throws Exception;

    void delete(Long id) throws Exception;

    void exportAll(HttpServletResponse response) throws IOException;
}
