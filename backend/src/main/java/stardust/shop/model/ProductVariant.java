package stardust.shop.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import stardust.shop.enums.Size;

import java.util.UUID;

@Entity
@Table(name = "product_variants")
@Builder
@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class ProductVariant {

    @GeneratedValue
    @Id
    private UUID uuid;

    /** Open color set — plain String, hex mapping stays in frontend taxonomy. */
    @Column(nullable = false)
    private String color;

    /** Closed size taxonomy. */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Size size;

    @Column(nullable = false)
    private int stockQuantity;

    @ManyToOne(optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

}
