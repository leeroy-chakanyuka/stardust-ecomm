package stardust.shop.dto;

import stardust.shop.enums.Gender;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public record ProductDto (UUID uuid, String name, String description,
                          BigDecimal price, String brand, boolean isNewArrival,
                          UUID categoryID, UUID categoryTypeID, Integer discount, String thumbnail,
                          List<String> images, double rating, Gender gender, List<ProductVariantDto> variants) {
}
