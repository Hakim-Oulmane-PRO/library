package com.hakim.library.serviceImpl;

import com.hakim.library.domain.FamilyBook;
import com.hakim.library.repository.FamilyBookRepository;
import com.hakim.library.service.FamilyBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class FamilyBookServiceImpl implements FamilyBookService {

    @Autowired
    FamilyBookRepository familyBookRepository;

    @Override
    public List<FamilyBook> getAll() {
        return familyBookRepository.findAll();
    }

    @Override
    public FamilyBook getOne(Long id) throws Exception {
        return familyBookRepository.findById(id)
                .orElseThrow(() -> new Exception(String.format("Family book %d not found", id)));
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public FamilyBook add(String name) throws Exception {
        FamilyBook created = new FamilyBook();
        created.setName(name);
        return familyBookRepository.save(created);
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public FamilyBook update(Long id, String name) throws Exception {
        FamilyBook updated = getOne(id);

        updated.setName(name);
        return familyBookRepository.save(updated);
    }

    @Override
    public void delete(Long id) throws Exception {
        FamilyBook familyBook = getOne(id);
        familyBookRepository.delete(familyBook);
    }
}
