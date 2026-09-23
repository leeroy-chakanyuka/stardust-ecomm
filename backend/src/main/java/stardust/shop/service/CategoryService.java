package stardust.shop.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import stardust.shop.dto.CategoryDto;
import stardust.shop.dto.CategorytTypeDto;
import stardust.shop.model.Category;
import stardust.shop.model.CategoryType;
import stardust.shop.repository.CategoryRepository;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class CategoryService {


    private final  CategoryRepository categoryRepository;

    public List<CategoryDto> getCategories(){
        List<Category> categories = categoryRepository.findAll();
        List<CategoryDto> categoryDtos = categories.stream()
                .map(category -> mapToCategoryDto(category)).toList();

        return categoryDtos;
    }

    public CategoryDto getCategory(UUID uuid) {
        return mapToCategoryDto(categoryRepository.findById(uuid).orElse(null));
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
                new CategoryDto(category.getUuid(), category.getName(), category.getCode(),
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

    public CategoryDto updateCategory(CategoryDto categoryDto, UUID uuid) {
        /* does it exist? */
        Category current = categoryRepository.findById(uuid).orElseThrow();

        /* the new one */
        Category updated = mapToCategoryEntity(categoryDto);

        /* dont forget to update refferences */
        for (CategoryType categoryType : updated.getCategoryTypes()) {
            categoryType.setCategory(updated);
        }

        return mapToCategoryDto(categoryRepository.save(updated));
    }

    public CategoryDto createCategory(CategoryDto categoryDto){
        Category cat = mapToCategoryEntity(categoryDto);

        /* this was causing an insert bug where the cat_type would not refer to the category, so we loop over
        *  cat_type objects in the payload and make sure we assign THIS entity ID to the current cat_type !*/
        for (CategoryType categoryType : cat.getCategoryTypes()) {
            categoryType.setCategory(cat);
        }

        return mapToCategoryDto(categoryRepository.save(cat));
    }

    public CategoryDto deleteCategory(UUID uuid){
        Category current = categoryRepository.findById(uuid).orElseThrow();
        categoryRepository.delete(current);
        return mapToCategoryDto(current);
    }

}
