package com.hakim.library.controller;

import com.hakim.library.domain.DTO.JsonResponse;
import com.hakim.library.domain.FamilyBook;
import com.hakim.library.service.FamilyBookService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Pattern;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/family_book")
@Validated
public class FamilyBookController {

    @Autowired
    private FamilyBookService familyBookService;


    @Operation(summary = "Get a all family books")
    @ApiResponse(
            responseCode = "200",
            description = "Found the family books",
            content = {@Content(mediaType = "application/json", schema = @Schema(implementation = JsonResponse.class))}
    )
    @GetMapping("/getAll")
    public JsonResponse getAll() {
        List<FamilyBook> result = familyBookService.getAll();
        return JsonResponse.builder().data(result)
                .status(JsonResponse.STATUS.SUCCESS)
                .build();
    }


    @Operation(summary = "Get a family book by its id")
    @ApiResponse(
            responseCode = "200",
            description = "Found the family book",
            content = {@Content(mediaType = "application/json", schema = @Schema(implementation = JsonResponse.class))}
    )
    @GetMapping("/get/{id}")
    public JsonResponse get(@PathVariable Long id) throws Exception {
        FamilyBook result = familyBookService.getOne(id);
        return JsonResponse.builder().data(result)
                .status(JsonResponse.STATUS.SUCCESS)
                .build();
    }


    @Operation(summary = "Add a family book")
    @ApiResponse(
            responseCode = "200",
            description = "Book added",
            content = {@Content(mediaType = "application/json", schema = @Schema(implementation = JsonResponse.class))}
    )
    @PostMapping("/add")
    public JsonResponse add(@Valid @RequestParam @Pattern(regexp = "^([a-zA-ZÀ-ÿ0-9]+[a-zA-ZÀ-ÿ0-9 \\-']*){1,255}$",
            message = "Family book name is invalid") String name) throws Exception {
        FamilyBook result = familyBookService.add(name);
        return JsonResponse.builder().data(result)
                .status(JsonResponse.STATUS.SUCCESS)
                .build();
    }


    @Operation(summary = "Update a family book by its id")
    @ApiResponse(
            responseCode = "200",
            description = "Family book updated",
            content = {@Content(mediaType = "application/json", schema = @Schema(implementation = JsonResponse.class))}
    )
    @PutMapping("/update/{id}")
    public JsonResponse update(@PathVariable Long id,
                               @Pattern(regexp = "^([a-zA-ZÀ-ÿ0-9]+[a-zA-ZÀ-ÿ0-9 \\-']*){1,255}$",
                                       message = "Family book name is invalid")
                               @RequestParam() String name)
            throws Exception {
        FamilyBook result = familyBookService.update(id, name);
        return JsonResponse.builder().data(result)
                .status(JsonResponse.STATUS.SUCCESS)
                .build();
    }


    @Operation(summary = "Delete a family book by its id")
    @ApiResponse(
            responseCode = "200",
            description = "Family book deleted",
            content = {@Content(mediaType = "application/json", schema = @Schema(implementation = JsonResponse.class))}
    )
    @DeleteMapping("/delete/{id}")
    public JsonResponse delete(@PathVariable Long id) throws Exception {
        familyBookService.delete(id);
        return JsonResponse.builder()
                .status(JsonResponse.STATUS.SUCCESS)
                .build();
    }
}
