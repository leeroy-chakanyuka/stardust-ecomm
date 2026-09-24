package stardust.shop.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import stardust.shop.dto.ProductDto;
import stardust.shop.dto.ProductVariantDto;
import stardust.shop.model.Category;
import stardust.shop.model.CategoryType;
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
                .build();

        product.setCategory( categoryRepository.findById(dto.categoryID()).orElse(null));
        product.setType(categoryTypeRepository.findById(dto.categoryTypeID()).orElse(null));

        return product;
    }

    public ProductDto mapToProductDto(Product product) {

        /* category and category type may be null*/
        UUID categoryUuid = null;
        if (product.getCategory() != null) {
            categoryUuid = product.getCategory().getUuid();
        }

        UUID categoryTypeUuid = null;
        if (product.getType() != null) {
            categoryTypeUuid = product.getType().getUuid();
        }

        return new ProductDto(
                product.getUuid(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getBrand(),
                product.isNewArrival(),
                categoryUuid,
                categoryTypeUuid,
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
    public List<ProductDto> getAll(Pageable pageable) {
        List<Product> products = productRepository.findAll(pageable).getContent();
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
    public ProductDto update(ProductDto dto, UUID uuid) {
        Product product = productRepository.findById(uuid)
                .orElseThrow();

        Category category = categoryRepository.findById(dto.categoryID())
                .orElseThrow();

        CategoryType categoryType = categoryTypeRepository.findById(dto.categoryTypeID())
                .orElseThrow();

        if (!categoryType.getCategory().getUuid().equals(category.getUuid())) {
            throw new IllegalArgumentException(
                    "Category type does not belong to the selected category"
            );
        }

        product.setName(dto.name());
        product.setDescription(dto.description());
        product.setPrice(dto.price());
        product.setBrand(dto.brand());
        product.setNewArrival(dto.isNewArrival());
        product.setDiscount(dto.discount());
        product.setThumbnail(dto.thumbnail());
        product.setImages(dto.images());
        product.setRating(dto.rating());
        product.setGender(dto.gender());

        product.setCategory(category);
        product.setType(categoryType);

        return mapToProductDto(productRepository.save(product));
    }

    @Override
    public void delete(UUID uuid) {
        Product prod = productRepository.findById(uuid).orElseThrow();
        productRepository.delete(prod);
    }
}
