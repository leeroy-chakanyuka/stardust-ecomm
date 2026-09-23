package stardust.shop.service;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcOperations;
import org.springframework.stereotype.Service;
import stardust.shop.dto.CategoryDto;
import stardust.shop.dto.CategorytTypeDto;
import stardust.shop.model.Category;
import stardust.shop.model.CategoryType;
import stardust.shop.repository.CategoryRepository;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class CategoryService {

    private final NamedParameterJdbcOperations namedParameterJdbcOperations;
    private CategoryRepository categoryRepository;

    public Category getCategory(UUID uuid) {
        return categoryRepository.findById(uuid).orElse(null);
    }

    public Category mapToCategoryEntity(CategoryDto categoryDto){
        Category out = Category.builder()
                .name(categoryDto.name())
                .path(categoryDto.path())
                .code(categoryDto.code())
                .description(categoryDto.description())
                /* this list first has to be converted*/
                .categoryTypes(mapToCategoryTypesEntity(categoryDto.categoryTypes()))
                .build();

        return out;
    }

    public CategoryDto mapToCategoryDto(Category category){
        CategoryDto out =
                new CategoryDto(category.getName(), category.getCode(),
                        category.getPath(), category.getDescription(), mapToCategoryTypeDto(category.getCategoryTypes()));
        return out;
    }

    /** loop over the current Object array then convert each DTO to an entity*/
    public List<CategoryType> mapToCategoryTypesEntity(List<CategorytTypeDto> categorytTypeDtos) {
        List<CategoryType> categoryTypes =
                categorytTypeDtos.stream()
                        .map(categorytTypeDto -> {
                            return CategoryType.builder().name(categorytTypeDto.name()).build();
                        })
                        .toList();

        return categoryTypes;
    }

    public List<CategorytTypeDto> mapToCategoryTypeDto (List<CategoryType> catTypes){

         List<CategorytTypeDto> CategoryDto = catTypes.stream()
                 .map(CategoryType -> {
                     return new CategorytTypeDto(CategoryType.getUuid(), CategoryType.getName());
                 }).toList();

         return CategoryDto;

    }


    public Category createCategory(CategoryDto categoryDto){
        Category cat = mapToCategoryEntity(categoryDto);
        return categoryRepository.save(cat);
    }
}
