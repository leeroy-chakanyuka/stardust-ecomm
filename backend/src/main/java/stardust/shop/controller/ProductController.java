package stardust.shop.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import stardust.shop.model.Product;
import stardust.shop.service.ProductService;

import java.util.List;
@RequiredArgsConstructor
@RestController()
public class ProductController {

    @Autowired
    private final ProductService productService;

    @GetMapping("/getAll")
    public ResponseEntity<List<Product>> getAll(){
        return ResponseEntity.ok(productService.getAll());
    }

    @PostMapping("/add")
    public ResponseEntity addProduct(
            @RequestBody Product product
    ){
        return ResponseEntity.ok(productService.addProduct(product));
    }
}
