package stardust.shop.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import stardust.shop.dto.CategoryDto;
import stardust.shop.model.Category;
import stardust.shop.service.CategoryService;

import java.util.UUID;

@Controller
@RequiredArgsConstructor
@RequestMapping("api/category")
public class CategoryController {

    private CategoryService categoryService;

    @GetMapping("/get/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable("id") UUID id){
        return ResponseEntity.ok(categoryService.getCategory(id));
    }
}
