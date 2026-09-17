package stardust.shop.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "products")
@RequiredArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Product {

    @GeneratedValue // keep the default
    @Id
    private UUID uuid;

    private String description;

    @Column(nullable = false, name="title")
    private String name;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(nullable = false)
    private String brand;

    private boolean isNewArrival;

    /** Discount percent e.g. 59. Null = no discount. */
    private Integer discount;

    /** Main image URL. */
    @Column(length = 1024)
    private String thumbnail;

    /** Extra gallery image URLs. */
    @ElementCollection
    @CollectionTable(name = "product_images", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "image_url", length = 1024, nullable = false)
    @Builder.Default
    private List<String> images = new ArrayList<>();

    private Double rating;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "type_id")
    private CategoryType type;

    /** Available sizes — closed taxonomy, stored as codes ("M", "UK 6", "One Size"). */
    @ElementCollection(targetClass = Size.class)
    @CollectionTable(name = "product_sizes", joinColumns = @JoinColumn(name = "product_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "size", nullable = false)
    @Builder.Default
    private List<Size> sizes = new ArrayList<>();

    /** Available colors — open set ("Green", "Mint"), display hex lives in frontend taxonomy. */
    @ElementCollection
    @CollectionTable(name = "product_colors", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "color", nullable = false)
    @Builder.Default
    private List<String> colors = new ArrayList<>();

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    private void onCreate(){
        LocalDateTime now = LocalDateTime.now();
        this.createdAt = now;
        this.updatedAt = now;
    }

    @PreUpdate
    private void onUpdate(){
        this.updatedAt = LocalDateTime.now();
    }

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<ProductVariant> productVariants = new ArrayList<>();
}
