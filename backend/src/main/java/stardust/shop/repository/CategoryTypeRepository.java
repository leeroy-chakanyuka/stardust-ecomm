package stardust.shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import stardust.shop.model.CategoryType;

import java.util.UUID;

@Repository
public interface CategoryTypeRepository extends JpaRepository<CategoryType, UUID> {
}
