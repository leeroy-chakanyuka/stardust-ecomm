package stardust.shop.dto;

import java.util.List;
import java.util.UUID;
/* as this gets bigger, what we need to do is add a thumbnail to be uploaded for the categories*/
public record CategoryDto(UUID uuid, String name, String code, String path, String description, List<CategorytTypeDto> categoryTypes) {
}
