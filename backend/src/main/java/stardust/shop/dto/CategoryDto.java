package stardust.shop.dto;

import java.util.List;

public record CategoryDto(String name, String code, String path, String description, List<CategorytTypeDto> categoryTypes) {
}
