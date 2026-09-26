package stardust.shop.controller;

import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import stardust.shop.dto.CategoryDto;
import stardust.shop.model.Category;
import stardust.shop.service.CategoryService;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("api/category")
public class CategoryController {

    // TODO : MORE ERROR HANDLING AND CLEARER MESSAGES
    private final CategoryService categoryService;

    @GetMapping("/get/{id}")
    public ResponseEntity<CategoryDto> getCategoryById(
        @PathVariable("id") UUID id
    ) {
        return ResponseEntity.ok(categoryService.getById(id));
    }

    @GetMapping("/get/all")
    public ResponseEntity<List<CategoryDto>> getCategories(
        @RequestParam(required = false, defaultValue = "0") int pageNo,
        @RequestParam(required = false, defaultValue = "10") int pageSize,
        @RequestParam(required = false, defaultValue = "uuid") String sortBy,
        @RequestParam(required = false, defaultValue = "asc") String sortOrder
    ) {
        Sort sort = null;
        if (sortOrder.equalsIgnoreCase("asc")) {
            sort = Sort.by(sortBy).ascending();
        } else {
            sort = Sort.by(sortBy).descending();
        }
        return ResponseEntity.ok(
            categoryService.getAll(PageRequest.of(pageNo, pageSize, sort))
        );
    }

    @PostMapping("/add")
    public ResponseEntity<CategoryDto> addCategory(
        @RequestBody CategoryDto categoryDto
    ) {
        return ResponseEntity.ok(categoryService.create(categoryDto));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<CategoryDto> updateCategory(
        @RequestBody CategoryDto categoryDto,
        @PathVariable("id") UUID uuid
    ) {
        return ResponseEntity.ok(categoryService.update(categoryDto, uuid));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable("id") UUID uuid) {
        categoryService.delete(uuid);
        return ResponseEntity.noContent().build();
    }
}
