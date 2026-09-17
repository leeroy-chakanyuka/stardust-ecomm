package stardust.shop.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

/** Category type is the specific bucket an item falls into e.g. jeans, shirts, shoes. */
@Entity
@Table(name = "category_types")
@Data
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class CategoryType {

    @Id
    @GeneratedValue
    private UUID uuid;

    @Column(nullable = false)
    private String name;

    @ManyToOne(optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
}
