package com.hakim.library.service;

import com.hakim.library.domain.FamilyBook;

import java.util.List;

public interface FamilyBookService {
    List<FamilyBook> getAll();

    FamilyBook getOne(Long id) throws Exception;

    FamilyBook add(String name) throws Exception;

    FamilyBook update(Long id, String name) throws Exception;

    void delete(Long id) throws Exception;
}
