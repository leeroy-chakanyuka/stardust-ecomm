package stardust.shop.dto;

import stardust.shop.enums.Gender;
import stardust.shop.enums.Size;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public record ProductDto (UUID uuid, Integer legacyId, String name, String description,
                          BigDecimal price, String brand, boolean isNewArrival,
                          UUID categoryID, UUID categoryTypeID, Integer discount, String thumbnail,
                          List<String> images, Double rating, Gender gender, List<Size> sizes, List<ProductVariantDto> variants) {
}
