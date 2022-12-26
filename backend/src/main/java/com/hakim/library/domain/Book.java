package com.hakim.library.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Book implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String author;

    @CreatedDate
    @Temporal(TemporalType.DATE)
    private Date created;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(
            name = "family_book_id",
            referencedColumnName = "id",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_book_family_book"))
    private FamilyBook familyBook;

    public Book(String name, String author, FamilyBook familyBook) {
        this.name = name;
        this.author = author;
        this.familyBook = familyBook;
        this.created = new Date();
    }
}
