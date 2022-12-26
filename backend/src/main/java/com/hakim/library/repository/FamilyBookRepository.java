package com.hakim.library.repository;

import com.hakim.library.domain.FamilyBook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FamilyBookRepository extends JpaRepository<FamilyBook, Long> {
}
