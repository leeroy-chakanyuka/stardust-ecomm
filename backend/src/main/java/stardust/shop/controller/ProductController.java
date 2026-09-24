package stardust.shop.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import stardust.shop.dto.CategoryDto;
import stardust.shop.dto.ProductDto;
import stardust.shop.model.Product;
import stardust.shop.service.ProductService;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@RestController()
@RequestMapping("api/products")
public class ProductController {

    @Autowired
    private final ProductService productService;

    @GetMapping("/get/all")
    public ResponseEntity<List<ProductDto>> getAll(@RequestParam(required = false, defaultValue = "1") int pageNo, @RequestParam(required = false, defaultValue = "25") int pageSize){
        return ResponseEntity.ok(productService.getAll(PageRequest.of(pageNo, pageSize)));
    }

    @PostMapping("/add")
    public ResponseEntity<ProductDto> addProduct(@RequestBody ProductDto product){
        return ResponseEntity.ok(productService.create(product));
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<ProductDto> getCategoryById(@PathVariable("id") UUID id){
        return ResponseEntity.ok(productService.getById(id));
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<ProductDto> updateCategory(@RequestBody ProductDto productDto, @PathVariable("id") UUID uuid){
        return ResponseEntity.ok(productService.update(productDto, uuid));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable("id") UUID uuid){
        productService.delete(uuid);
        return ResponseEntity.noContent().build();
    }

}
