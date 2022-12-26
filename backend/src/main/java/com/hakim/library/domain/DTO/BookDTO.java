package com.hakim.library.domain.DTO;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
public class BookDTO implements Serializable {

    @NotEmpty(message = "Name must be not empty")
    @NotNull(message = "Name must be not null")
    @NotBlank(message = "Name must be not blank")
    private String name;

    private String author;

    @NotNull(message = "Family book must be not null")
    private Long familyBook;
}
