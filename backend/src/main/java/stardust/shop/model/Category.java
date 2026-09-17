package stardust.shop.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.UUID;

@Entity
@Data
@RequiredArgsConstructor
@AllArgsConstructor
@Builder

/** category is the wider net an item falls into e.g. tees, jeans, dresses */
public class Category {

    @Id
    @GeneratedValue
    private UUID uuid;

    @Column(nullable = false)
    private String name;

    /** e.g. TEES. */
    private String code;

    /** url path e.g. /shop/tees. */
    private String path;

    private String description;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CategoryType> categoryTypes;
}
