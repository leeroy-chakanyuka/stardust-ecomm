package stardust.shop.dto;

import stardust.shop.enums.Size;

import java.util.UUID;

public record ProductVariantDto (
        UUID uuid, String color, Size size, Integer stockQuantity
){
}
