package com.hakim.library.controller;

import com.hakim.library.domain.Book;
import com.hakim.library.domain.DTO.BookDTO;
import com.hakim.library.domain.DTO.JsonResponse;
import com.hakim.library.service.BookService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springdoc.api.annotations.ParameterObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;

@CrossOrigin
@RestController
@RequestMapping("/book")
public class BookController {

    @Autowired
    private BookService bookService;


    @Operation(summary = "Get a all books")
    @ApiResponse(
            responseCode = "200",
            description = "Found the books",
            content = {@Content(mediaType = "application/json", schema = @Schema(implementation = JsonResponse.class))}
    )
    @GetMapping("/getAll")
    public JsonResponse getAll(@ParameterObject Pageable pageable) {
        Page<Book> result = bookService.getAll(pageable);
        return JsonResponse.builder().data(result)
                .status(JsonResponse.STATUS.SUCCESS)
                .build();
    }


    @Operation(summary = "Get a book by its id")
    @ApiResponse(
            responseCode = "200",
            description = "Found the book",
            content = {@Content(mediaType = "application/json", schema = @Schema(implementation = JsonResponse.class))}
    )
    @GetMapping("/get/{id}")
    public JsonResponse get(@PathVariable Long id) throws Exception {
        Book result = bookService.getOne(id);
        return JsonResponse.builder().data(result)
                .status(JsonResponse.STATUS.SUCCESS)
                .build();
    }


    @Operation(summary = "Add a book")
    @ApiResponse(
            responseCode = "200",
            description = "Book added",
            content = {@Content(mediaType = "application/json", schema = @Schema(implementation = JsonResponse.class))}
    )
    @PostMapping("/add")
    public JsonResponse add(@Valid @RequestBody BookDTO book) throws Exception {
        Book result = bookService.add(book);
        return JsonResponse.builder().data(result)
                .status(JsonResponse.STATUS.SUCCESS)
                .build();
    }


    @Operation(summary = "Update a book by its id")
    @ApiResponse(
            responseCode = "200",
            description = "Book updated",
            content = {@Content(mediaType = "application/json", schema = @Schema(implementation = JsonResponse.class))}
    )
    @PutMapping("/update/{id}")
    public JsonResponse update(@PathVariable Long id, @Valid @RequestBody BookDTO book) throws Exception {
        Book result = bookService.update(id, book);
        return JsonResponse.builder().data(result)
                .status(JsonResponse.STATUS.SUCCESS)
                .build();
    }


    @Operation(summary = "Delete a book by its id")
    @ApiResponse(
            responseCode = "200",
            description = "Book deleted",
            content = {@Content(mediaType = "application/json", schema = @Schema(implementation = JsonResponse.class))}
    )
    @DeleteMapping("/delete/{id}")
    public JsonResponse delete(@PathVariable Long id) throws Exception {
        bookService.delete(id);
        return JsonResponse.builder()
                .status(JsonResponse.STATUS.SUCCESS)
                .build();
    }


    @Operation(summary = "Export all books to Excel file")
    @ApiResponse(
            responseCode = "200",
            description = "Books exported",
            content = {@Content(mediaType = "application/octet-stream")}
    )
    @GetMapping("/exportAll")
    public void exportIntoExcelFile(HttpServletResponse response) throws IOException {
        bookService.exportAll(response);
    }
}
