package stardust.shop.controller;

import java.util.List;
import java.util.Set;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.*;
import stardust.shop.dto.CategoryDto;
import stardust.shop.service.CategoryService;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("api/category")
public class CategoryController {

    private static final int MAX_PAGE_SIZE = 100;
    private static final Set<String> ALLOWED_SORT_FIELDS = Set.of(
        "uuid", "name", "code", "path", "description"
    );

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
        if (pageNo < 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "pageNo must be zero or greater");
        }
        if (pageSize < 1 || pageSize > MAX_PAGE_SIZE) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "pageSize must be between 1 and 100");
        }
        if (sortBy == null || !ALLOWED_SORT_FIELDS.contains(sortBy)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unsupported sortBy field");
        }
        if (sortOrder == null || (!sortOrder.equalsIgnoreCase("asc") && !sortOrder.equalsIgnoreCase("desc"))) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "sortOrder must be asc or desc");
        }

        Sort sort = sortOrder.equalsIgnoreCase("asc")
            ? Sort.by(sortBy).ascending()
            : Sort.by(sortBy).descending();
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
