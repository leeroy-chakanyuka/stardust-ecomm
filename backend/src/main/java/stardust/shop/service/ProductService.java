package stardust.shop.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import stardust.shop.dto.ProductDto;
import stardust.shop.dto.ProductVariantDto;
import stardust.shop.model.Product;
import stardust.shop.model.ProductVariant;
import stardust.shop.repository.CategoryRepository;
import stardust.shop.repository.CategoryTypeRepository;
import stardust.shop.repository.ProductRepository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductService implements iProductService {
    /* will come back to see how these evolve with our needs and dtos */

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final CategoryTypeRepository categoryTypeRepository;

    public Product mapToProductEntity(ProductDto dto) {
        Product product = Product.builder()
                .name(dto.name())
                .description(dto.description())
                .price(dto.price())
                .brand(dto.brand())
                .isNewArrival(dto.isNewArrival())
                .discount(dto.discount())
                .thumbnail(dto.thumbnail())
                .images(dto.images())
                .rating(dto.rating())
                .gender(dto.gender())
                .category(categoryRepository.findById(dto.categoryID()).orElseThrow())
                .type(categoryTypeRepository.findById(dto.categoryTypeID()).orElseThrow())
                .build();

        return product;
    }

    public ProductDto mapToProductDto(Product product) {
        return new ProductDto(
                product.getUuid(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getBrand(),
                product.isNewArrival(),
                product.getCategory().getUuid(),
                product.getType().getUuid(),
                product.getDiscount(),
                product.getThumbnail(),
                product.getImages(),
                product.getRating(),
                product.getGender(),
                product.getProductVariants().stream()
                        .map(this::mapToProductVariantDto)
                        .toList()
        );
    }

    public ProductVariantDto mapToProductVariantDto(ProductVariant variant) {
        return new ProductVariantDto(
                variant.getUuid(),
                variant.getColor(),
                variant.getSize(),
                variant.getStockQuantity()
        );
    }

    @Override
    public List<ProductDto> getAll() {
        List<Product> products = productRepository.findAll();
        return products.stream().map(this::mapToProductDto).toList();
    }

    @Override
    public ProductDto getById(UUID uuid) {
        Product prod = productRepository.findById(uuid).orElseThrow();
        return mapToProductDto(prod);
    }

    @Override
    public ProductDto create(ProductDto productDto) {
        Product prod = mapToProductEntity(productDto);
        return mapToProductDto( productRepository.save(prod));
    }

    @Override
    public ProductDto update(ProductDto productDto, UUID uuid) {
        Product prod = productRepository.findById(uuid).orElseThrow();
        return mapToProductDto( productRepository.save(prod));

    }

    @Override
    public void delete(UUID uuid) {
        Product prod = productRepository.findById(uuid).orElseThrow();
        productRepository.delete(prod);
    }
}
