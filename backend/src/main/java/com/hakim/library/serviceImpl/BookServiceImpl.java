package com.hakim.library.serviceImpl;

import com.hakim.library.domain.Book;
import com.hakim.library.domain.DTO.BookDTO;
import com.hakim.library.domain.FamilyBook;
import com.hakim.library.repository.BookRepository;
import com.hakim.library.service.BookService;
import com.hakim.library.service.FamilyBookService;
import com.hakim.library.service.FileGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;


@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private FamilyBookService familyBookService;

    @Autowired
    private BookRepository bookRepository;

    @Override
    public Page<Book> getAll(Pageable pageable) {
        return bookRepository.findAll(pageable);
    }

    @Override
    public List<Book> getAll() {
        return bookRepository.findAll();
    }

    @Override
    public Book getOne(Long id) throws Exception {
        return bookRepository.findById(id)
                .orElseThrow(() -> new Exception(String.format("Book %d not found", id)));
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Book add(BookDTO book) throws Exception {
        FamilyBook familyBook = familyBookService.getOne(book.getFamilyBook());

        Book createdBook = new Book();
        createdBook.setAuthor(book.getAuthor());
        createdBook.setName(book.getName());
        createdBook.setCreated(new Date());
        createdBook.setFamilyBook(familyBook);
        return bookRepository.save(createdBook);
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Book update(Long id, BookDTO book) throws Exception {
        Book updatedBook = getOne(id);
        FamilyBook familyBook = familyBookService.getOne(book.getFamilyBook());

        updatedBook.setAuthor(book.getAuthor());
        updatedBook.setName(book.getName());
        updatedBook.setFamilyBook(familyBook);
        return bookRepository.save(updatedBook);
    }

    @Override
    public void delete(Long id) throws Exception {
        Book book = getOne(id);
        bookRepository.delete(book);
    }

    @Override
    public void exportAll(HttpServletResponse response) throws IOException {
        response.setContentType("application/octet-stream");
        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
        String currentDateTime = dateFormatter.format(new Date());

        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=books_" + currentDateTime + ".xlsx";
        response.setHeader(headerKey, headerValue);

        List<Book> bookList = getAll();
        FileGenerator generator = new ExcelGenerator(bookList);
        generator.generateFile(response);
    }
}
