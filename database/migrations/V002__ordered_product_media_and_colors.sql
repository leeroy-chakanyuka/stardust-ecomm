-- Manual MySQL 8 migration from V001 / equivalent Hibernate-created schema.
-- Stop application writes first. Apply once, before Hibernate validate starts.
-- MySQL DDL implicitly commits; this script is NOT transactionally reversible.
-- No existing FK/index names are assumed or changed.

-- Some older Hibernate schemas already contain an unordered colour bag with
-- these two columns. Adopt that table in place; otherwise create the same bag.
-- Verify the starting columns before applying this apply-once migration.
CREATE TABLE IF NOT EXISTS product_colors (
    product_id BINARY(16) NOT NULL,
    color VARCHAR(255) NOT NULL,
    KEY ix_product_colors_product (product_id),
    CONSTRAINT fk_product_colors_product FOREIGN KEY (product_id)
        REFERENCES products (uuid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_bin;

-- Preserve any existing colour rows, including duplicates, when assigning order.
ALTER TABLE product_colors
    ADD COLUMN sort_order INT NULL,
    ADD COLUMN _v002_color_row_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    ADD UNIQUE KEY uq_v002_color_row (_v002_color_row_id);

UPDATE product_colors AS colors
JOIN (
    SELECT _v002_color_row_id,
           ROW_NUMBER() OVER (
               PARTITION BY product_id
               ORDER BY CONVERT(color USING binary), _v002_color_row_id
           ) - 1 AS new_sort_order
    FROM product_colors
) AS numbered ON numbered._v002_color_row_id = colors._v002_color_row_id
SET colors.sort_order = numbered.new_sort_order;

ALTER TABLE product_colors
    MODIFY COLUMN sort_order INT NOT NULL,
    ADD PRIMARY KEY (product_id, sort_order),
    DROP COLUMN _v002_color_row_id;

-- The old bag has no row identity or recorded order. A temporary identity lets
-- us number EVERY row, including repeated URLs, without deduplicating data.
ALTER TABLE product_images
    ADD COLUMN sort_order INT NULL,
    ADD COLUMN _v002_row_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    ADD UNIQUE KEY uq_v002_image_row (_v002_row_id);

-- Window functions materialize this derived table in MySQL 8 (no target-table
-- merge). Order URLs bytewise so the old schema's collation cannot change it.
-- Identical URL rows are indistinguishable; their temporary identity breaks
-- ties while preserving the same ordered URL sequence and all duplicates.
UPDATE product_images AS images
JOIN (
    SELECT _v002_row_id,
           ROW_NUMBER() OVER (
               PARTITION BY product_id
               ORDER BY CONVERT(image_url USING binary), _v002_row_id
           ) - 1 AS new_sort_order
    FROM product_images
) AS numbered ON numbered._v002_row_id = images._v002_row_id
SET images.sort_order = numbered.new_sort_order;

ALTER TABLE product_images
    MODIFY COLUMN sort_order INT NOT NULL,
    ADD UNIQUE KEY uq_product_images_order (product_id, sort_order),
    DROP COLUMN _v002_row_id;
-- Dropping the temporary column also removes its single-column unique index.
-- Existing image URLs, colours, thumbnails, products, variants, sizes and FKs survive.
-- No new product_colors rows are inferred from inventory variants on existing DBs.
