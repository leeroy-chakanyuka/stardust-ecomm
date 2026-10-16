-- Manual MySQL 8 baseline, inferred from the pre-V002 JPA entities.
-- EMPTY schemas only. An existing Hibernate-created schema baselines V001
-- without executing it; see ../README.md. DDL implicitly commits in MySQL.
-- UUIDs are Hibernate's unswapped 16 bytes, not CHAR(36) or swapped UUID_TO_BIN.

CREATE TABLE category (
    uuid BINARY(16) NOT NULL,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(255) NULL,
    path VARCHAR(255) NULL,
    description VARCHAR(255) NULL,
    PRIMARY KEY (uuid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_bin;

CREATE TABLE category_types (
    uuid BINARY(16) NOT NULL,
    name VARCHAR(255) NOT NULL,
    category_id BINARY(16) NOT NULL,
    PRIMARY KEY (uuid),
    KEY ix_category_types_category (category_id),
    CONSTRAINT fk_category_types_category FOREIGN KEY (category_id)
        REFERENCES category (uuid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_bin;

CREATE TABLE products (
    uuid BINARY(16) NOT NULL,
    legacy_id INT NULL,
    description VARCHAR(255) NULL,
    title VARCHAR(255) NOT NULL,
    price DECIMAL(38,2) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    is_new_arrival BIT(1) NOT NULL,
    discount INT NULL,
    thumbnail VARCHAR(1024) NULL,
    rating DOUBLE NULL,
    gender ENUM('KIDS','MEN','UNISEX','WOMEN') NULL,
    category_id BINARY(16) NULL,
    type_id BINARY(16) NULL,
    created_at DATETIME(6) NOT NULL,
    updated_at DATETIME(6) NOT NULL,
    PRIMARY KEY (uuid),
    UNIQUE KEY uq_products_legacy_id (legacy_id),
    KEY ix_products_category (category_id),
    KEY ix_products_type (type_id),
    CONSTRAINT fk_products_category FOREIGN KEY (category_id)
        REFERENCES category (uuid),
    CONSTRAINT fk_products_type FOREIGN KEY (type_id)
        REFERENCES category_types (uuid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_bin;

-- Before V002 this is an unordered element collection (a Hibernate bag).
CREATE TABLE product_images (
    product_id BINARY(16) NOT NULL,
    image_url VARCHAR(1024) NOT NULL,
    KEY ix_product_images_product (product_id),
    CONSTRAINT fk_product_images_product FOREIGN KEY (product_id)
        REFERENCES products (uuid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_bin;

-- @Enumerated(STRING) persists Java identifiers, not @JsonValue display codes.
CREATE TABLE product_sizes (
    product_id BINARY(16) NOT NULL,
    size ENUM('L','M','ONE_SIZE','S','UK10','UK11','UK6','UK7','UK8','UK9',
              'XL','XXL','Y2_4','Y5_8','Y9_12') NOT NULL,
    KEY ix_product_sizes_product (product_id),
    CONSTRAINT fk_product_sizes_product FOREIGN KEY (product_id)
        REFERENCES products (uuid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_bin;

CREATE TABLE product_variants (
    uuid BINARY(16) NOT NULL,
    color VARCHAR(255) NOT NULL,
    size ENUM('L','M','ONE_SIZE','S','UK10','UK11','UK6','UK7','UK8','UK9',
              'XL','XXL','Y2_4','Y5_8','Y9_12') NOT NULL,
    stock_quantity INT NOT NULL,
    product_id BINARY(16) NOT NULL,
    PRIMARY KEY (uuid),
    KEY ix_product_variants_product (product_id),
    CONSTRAINT fk_product_variants_product FOREIGN KEY (product_id)
        REFERENCES products (uuid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_bin;
