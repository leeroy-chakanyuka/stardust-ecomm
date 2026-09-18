package stardust.shop.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import stardust.shop.model.Product;
import stardust.shop.repository.ProductRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService implements iProductService {
    /* will come back to see how these evolve with our needs and dtos */

    @Autowired
    private final ProductRepository productRepository;

    @Override
    public Product addProduct(Product prod) {
        return productRepository.save(prod);
    }

    @Override
    public List<Product> getAll() {
        return productRepository.findAll();
    }
}
