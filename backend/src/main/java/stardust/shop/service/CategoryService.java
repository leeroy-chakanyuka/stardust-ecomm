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
public class CategoryService implements ICategoryService {

    // TODO : BETTER VALIDATION AND ERROR HANDLING
    private final  CategoryRepository categoryRepository;

    @Override
    public List<CategoryDto> getAll(){
        List<Category> categories = categoryRepository.findAll();
        List<CategoryDto> categoryDtos = categories.stream()
                .map(category -> mapToCategoryDto(category)).toList();

        return categoryDtos;
    }

    @Override
    public CategoryDto getById(UUID uuid) {
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

    @Override
    public CategoryDto update(CategoryDto categoryDto, UUID uuid) {

        /* does it exist? */
        Category current = categoryRepository.findById(uuid)
                .orElseThrow();

        /* update the existing one */
        current.setName(categoryDto.name());
        current.setCode(categoryDto.code());
        current.setPath(categoryDto.path());
        current.setDescription(categoryDto.description());

        /* replace category types */
        current.getCategoryTypes().clear();

        List<CategoryType> types =
                mapToCategoryTypesEntity(categoryDto.categoryTypes());

        /* update references */
        for (CategoryType categoryType : types) {
            categoryType.setCategory(current);
        }

        current.getCategoryTypes().addAll(types);

        return mapToCategoryDto(
                categoryRepository.save(current)
        );
    }

    @Override
    public CategoryDto create(CategoryDto categoryDto){
        Category cat = mapToCategoryEntity(categoryDto);

        /* this was causing an insert bug where the cat_type would not refer to the category, so we loop over
        *  cat_type objects in the payload and make sure we assign THIS entity ID to the current cat_type !*/
        for (CategoryType categoryType : cat.getCategoryTypes()) {
            categoryType.setCategory(cat);
        }

        return mapToCategoryDto(categoryRepository.save(cat));
    }

    @Override
    public void delete(UUID uuid){
        Category current = categoryRepository.findById(uuid).orElseThrow();
        categoryRepository.delete(current);
    }

}
