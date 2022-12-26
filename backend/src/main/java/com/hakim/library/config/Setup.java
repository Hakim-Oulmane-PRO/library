package com.hakim.library.config;

import com.hakim.library.domain.Book;
import com.hakim.library.domain.FamilyBook;
import com.hakim.library.repository.BookRepository;
import com.hakim.library.repository.FamilyBookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Component
public class Setup {

    @Autowired
    BookRepository bookRepository;

    @Autowired
    FamilyBookRepository familyBookRepository;

    @Transactional(rollbackFor = Exception.class)
    public void init() {
        List<FamilyBook> familyBooks = Arrays.asList(
                new FamilyBook("Roman"),
                new FamilyBook("Journal"),
                new FamilyBook("Apologue"),
                new FamilyBook("Chronique"),
                new FamilyBook("Autobiographie"),
                new FamilyBook("Biographie"),
                new FamilyBook("Légende"),
                new FamilyBook("Mythe"),
                new FamilyBook("Conte"),
                new FamilyBook("Nouvelle")
        );
        familyBooks = familyBookRepository.saveAllAndFlush(familyBooks);

        List<Book> books = Arrays.asList(
                new Book("The Adventures of Roderick RandomThe Adventures of Roderick Random", "Tobias Smollett", familyBooks.get(0)),
                new Book("A Heart So WhiteA Heart So White", "Javier Marías", familyBooks.get(0)),
                new Book("A Dream of Red Mansions", "Cao Xueqin", familyBooks.get(1)),
                new Book("Educated: A Memoir", "Tara Westover", familyBooks.get(1)),
                new Book("Under the Whispering Door", "TJ Klune", familyBooks.get(1)),
                new Book("The Vampire Diaries: The Return: Nightfall", "L. J. Smith", familyBooks.get(1)),
                new Book("The Nightingale", "Kristin Hannah", familyBooks.get(2)),
                new Book("The Argonauts", "Maggie Nelson", familyBooks.get(2)),
                new Book("Lost Children Archive", "Valeria Luiselli", familyBooks.get(4)),
                new Book("Second Chance Summer", "Morgan Matson", familyBooks.get(5)),
                new Book("The Wrong Side of Goodbye", "Michael Connelly", familyBooks.get(5)),
                new Book("The Girl in the Spider's Web", null, familyBooks.get(6)),
                new Book("Radical", "David Platt", familyBooks.get(0)),
                new Book("Darker: Fifty Shades Darker as Told by Christian", "E. L. James", familyBooks.get(8)),
                new Book("Shatter Me", "Tahereh Mafi", familyBooks.get(9)),
                new Book("The Strain", null, familyBooks.get(0))
        );
        bookRepository.saveAllAndFlush(books);
    }
}
