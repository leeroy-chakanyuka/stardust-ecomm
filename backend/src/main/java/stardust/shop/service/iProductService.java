package stardust.shop.service;

import stardust.shop.model.Product;

import java.util.List;
import java.util.UUID;

public interface iProductService extends iService<Product, UUID>{

    public Product addProduct(Product prod);
    public List<Product> getAll();
}
