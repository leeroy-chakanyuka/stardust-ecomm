package stardust.shop.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import stardust.shop.dto.ProductDto;
import stardust.shop.dto.ProductVariantDto;
import stardust.shop.model.Category;
import stardust.shop.model.CategoryType;
import stardust.shop.model.Product;
import stardust.shop.model.ProductVariant;
import stardust.shop.repository.CategoryRepository;
import stardust.shop.repository.CategoryTypeRepository;
import stardust.shop.repository.ProductRepository;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductService implements iProductService {

    /* will come back to see how these evolve with our needs and dtos */

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final CategoryTypeRepository categoryTypeRepository;
    private final MediaUrlResolver mediaUrlResolver;

    public Product mapToProductEntity(ProductDto dto) {
        Product product = Product.builder()
            .legacyId(dto.legacyId())
            .name(dto.name())
            .description(dto.description())
            .price(dto.price())
            .brand(dto.brand())
            .isNewArrival(dto.isNewArrival())
            .discount(dto.discount())
            .thumbnail(mediaUrlResolver.toReference(dto.thumbnail()))
            .images(imageReferences(dto.images()))
            .rating(dto.rating())
            .gender(dto.gender())
            .sizes(copyOrEmpty(dto.sizes()))
            .colors(copyOrEmpty(dto.colors()))
            .build();

        setClassification(product, dto);

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
            product.getLegacyId(),
            product.getName(),
            product.getDescription(),
            product.getPrice(),
            product.getBrand(),
            product.isNewArrival(),
            categoryUuid,
            categoryTypeUuid,
            product.getDiscount(),
            mediaUrlResolver.toUrl(product.getThumbnail()),
            product.getImages().stream().map(mediaUrlResolver::toUrl).toList(),
            product.getRating(),
            product.getGender(),
            new ArrayList<>(product.getSizes()),
            product
                .getProductVariants()
                .stream()
                .map(this::mapToProductVariantDto)
                .toList(),
            new ArrayList<>(product.getColors())
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
        List<Product> products = productRepository
            .findAll(pageable)
            .getContent();
        return products.stream().map(this::mapToProductDto).toList();
    }

    @Override
    public ProductDto getById(UUID uuid) {
        Product prod = productRepository
            .findById(uuid)
            .orElseThrow(() ->
                new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Product not found"
                )
            );
        return mapToProductDto(prod);
    }

    @Override
    @Transactional
    public ProductDto create(ProductDto productDto) {
        Product prod = mapToProductEntity(productDto);
        return mapToProductDto(productRepository.save(prod));
    }

    @Override
    @Transactional
    public ProductDto update(ProductDto dto, UUID uuid) {
        Product product = productRepository.findById(uuid).orElseThrow();

        setClassification(product, dto);

        product.setName(dto.name());
        product.setDescription(dto.description());
        product.setPrice(dto.price());
        product.setBrand(dto.brand());
        product.setNewArrival(dto.isNewArrival());
        product.setLegacyId(dto.legacyId());
        product.setDiscount(dto.discount());
        product.setThumbnail(mediaUrlResolver.toReference(dto.thumbnail()));
        product.setImages(imageReferences(dto.images()));
        product.setRating(dto.rating());
        product.setGender(dto.gender());
        product.setSizes(copyOrEmpty(dto.sizes()));
        product.setColors(copyOrEmpty(dto.colors()));

        return mapToProductDto(productRepository.save(product));
    }

    @Override
    @Transactional
    public void delete(UUID uuid) {
        Product prod = productRepository.findById(uuid).orElseThrow();
        productRepository.delete(prod);
    }

    @Override
    public ProductDto getByLegacyId(Integer legacyId) {
        Product product = productRepository
            .findByLegacyId(legacyId)
            .orElseThrow(() ->
                new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Product not found"
                )
            );
        return mapToProductDto(product);
    }

    private List<String> imageReferences(List<String> images) {
        return new ArrayList<>(
            copyOrEmpty(images)
                .stream()
                .map(mediaUrlResolver::toReference)
                .toList()
        );
    }

    private static <T> List<T> copyOrEmpty(List<T> values) {
        return values == null ? new ArrayList<>() : new ArrayList<>(values);
    }

    /**
     * we take the cat_id and cat_tpye_id (from the dto) and see if it belongs to this entity
     */
    private void setClassification(Product product, ProductDto dto) {
        /* if we dont find a category with the given id, set to null */
        Category category =
            dto.categoryID() == null
                ? null
                : categoryRepository
                      .findById(dto.categoryID())
                      .orElseThrow(() ->
                          new ResponseStatusException(
                              HttpStatus.NOT_FOUND,
                              "Category not found"
                          )
                      );

        CategoryType type =
            dto.categoryTypeID() == null
                ? null
                : categoryTypeRepository
                      .findById(dto.categoryTypeID())
                      .orElseThrow(() ->
                          new ResponseStatusException(
                              HttpStatus.NOT_FOUND,
                              "Category type not found"
                          )
                      );

                      /* check to see if relationship between cat and cat_type mismatch  */
        if (
            type != null &&
            (category == null ||
                !type.getCategory().getUuid().equals(category.getUuid()))
        ) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Category type does not belong to the selected category"
            );
        }
        product.setCategory(category);
        product.setType(type);
    }
}
