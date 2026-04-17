# ASP.NET-CORE-ESHOP Database Schema

This document describes the database schema for a clothing e-commerce platform. The schema is designed to manage users, products with variants (sizes/colors), shopping carts, orders, and reviews.

---

![DatabaseDiagram](/Images/ASP.NET-CORE-ESHOP-DatabaseDiagram.png)

---

## Table: `users`
Stores registered customer and administrator accounts.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | integer | No | auto-increment | Primary key. |
| email | nvarchar(255) | No | - | Unique login email address. |
| password_hash | nvarchar(255) | No | - | Hashed user password |
| first_name | nvarchar(100) | Yes | - | User's first name. |
| last_name | nvarchar(100) | Yes | - | User's last name. |
| phone | nvarchar(20) | Yes | - | Contact phone number. |
| is_admin | boolean | No | false | Flag for administrative privileges. |
| created_at | timestamp | No | now() | Account creation timestamp. |
| updated_at | timestamp | Yes | - | Last update timestamp. |

**Indexes:**
- `users_pkey` (PRIMARY KEY, btree, id)
- `users_email_key` (UNIQUE, btree, email)

---

## Table: `addresses`
Stores shipping and billing addresses for users.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | integer | No | auto-increment | Primary key. |
| user_id | integer | No | - | Foreign key to `users.id`. |
| address_line1 | nvarchar(255) | No | - | Primary street address. |
| address_line2 | nvarchar(255) | Yes | - | Secondary address line (apt, suite). |
| city | nvarchar(100) | No | - | City name. |
| state | nvarchar(100) | Yes | - | State or province. |
| postal_code | nvarchar(20) | No | - | ZIP or postal code. |
| country | nvarchar(100) | No | - | Country name. |
| is_default_shipping | boolean | No | false | True if this is the default shipping address. |
| is_default_billing | boolean | No | false | True if this is the default billing address. |
| created_at | timestamp | No | now() | Record creation timestamp. |

**Indexes:**
- `addresses_pkey` (PRIMARY KEY, btree, id)
- `idx_addresses_user_id` (btree, user_id)

---

## Table: `categories`
Hierarchical product categories (e.g., Men > Shirts > T-Shirts).

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | integer | No | auto-increment | Primary key. |
| name | nvarchar(100) | No | - | Display name of the category. |
| slug | nvarchar(100) | No | - | URL-friendly unique identifier. |
| description | nvarchar(max) | Yes | - | Optional category description. |
| parent_category_id | integer | Yes | - | Self-reference for subcategories. |
| image_url | nvarchar(500) | Yes | - | URL to category banner/image. |
| created_at | timestamp | No | now() | Creation timestamp. |

**Indexes:**
- `categories_pkey` (PRIMARY KEY, btree, id)
- `idx_categories_slug` (btree, slug)
- `idx_categories_parent_id` (btree, parent_category_id)

---

## Table: `products`
Core product information shared across all variants.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | integer | No | auto-increment | Primary key. |
| name | nvarchar(255) | No | - | Product display name. |
| slug | nvarchar(255) | No | - | Unique URL slug (e.g., `red-running-shoes` instead of `index.php?id=598`). |
| description | nvarchar(max) | Yes | - | Full product description. |
| base_price | decimal(10,2) | No | - | Starting price before variant adjustments. |
| discount_price | decimal(10,2) | Yes | - | Optional sale price overriding base price. |
| details | json | Yes | - | Flexible key-value store for material, care, fit, etc. |
| is_active | boolean | No | true | Whether the product is visible in the store. |
| is_featured | boolean | No | false | Flag for highlighting on homepage. |
| created_at | timestamp | No | now() | Creation timestamp. |
| updated_at | timestamp | Yes | - | Last update timestamp. |

**Indexes:**
- `products_pkey` (PRIMARY KEY, btree, id)
- `idx_products_slug` (btree, slug)
- `idx_products_active` (btree, is_active)
- `idx_products_price` (btree, base_price, discount_price)

---

## Table: `product_categories`
Junction table linking products to multiple categories.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| product_id | integer | No | - | Foreign key to `products.id`. |
| category_id | integer | No | - | Foreign key to `categories.id`. |

**Indexes:**
- `idx_product_categories_unique` (UNIQUE, btree, product_id, category_id)
- `idx_product_categories_category_id` (btree, category_id)

---

## Table: `product_images`
Stores image URLs associated with a product, including a primary image flag.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | integer | No | auto-increment | Primary key. |
| product_id | integer | No | - | Foreign key to `products.id`. |
| image_url | nvarchar(500) | No | - | URL or path to the image file. |
| alt_text | nvarchar(255) | Yes | - | Accessibility description. (SEO) |
| sort_order | integer | No | 0 | Display order among product images. |
| is_primary | boolean | No | false | Whether this is the main product image. |

**Indexes:**
- `product_images_pkey` (PRIMARY KEY, btree, id)
- `idx_product_images_product_id` (btree, product_id)

---

## Table: `sizes`
Available size options (e.g., S, M, L, XL or numeric sizes).

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | integer | No | auto-increment | Primary key. |
| name | nvarchar(50) | No | - | Unique size label. |
| sort_order | integer | No | 0 | Display order for size selection. |

**Indexes:**
- `sizes_pkey` (PRIMARY KEY, btree, id)
- `idx_sizes_name` (UNIQUE, btree, name)

---

## Table: `colors`
Available color options with optional hex codes.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | integer | No | auto-increment | Primary key. |
| name | nvarchar(50) | No | - | Unique color name. |
| hex_code | nvarchar(7) | Yes | - | CSS hex color code (e.g., `#FF5733`). |

**Indexes:**
- `colors_pkey` (PRIMARY KEY, btree, id)
- `idx_colors_name` (UNIQUE, btree, name)

---

## Table: `product_variants`
Specific combinations of product, size, and color, each with its own SKU, stock, and price adjustment.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | integer | No | auto-increment | Primary key. |
| product_id | integer | No | - | Foreign key to `products.id`. |
| size_id | integer | Yes | - | Foreign key to `sizes.id` (nullable if no size applies). |
| color_id | integer | Yes | - | Foreign key to `colors.id` (nullable if no color applies). |
| sku | nvarchar(100) | No | - | Unique Stock Keeping Unit identifier. |
| price_adjustment | decimal(10,2) | No | 0.00 | Amount added to `products.base_price` for this variant. |
| stock_quantity | integer | No | 0 | Current available inventory. |
| is_active | boolean | No | true | Whether this variant can be purchased. |
| created_at | timestamp | No | now() | Creation timestamp. |
| updated_at | timestamp | Yes | - | Last update timestamp. |

**Indexes:**
- `product_variants_pkey` (PRIMARY KEY, btree, id)
- `idx_variants_product_id` (btree, product_id)
- `idx_variants_sku` (btree, sku)
- `idx_variants_size_color` (btree, size_id, color_id)
- `idx_variants_stock` (btree, stock_quantity)

---

## Table: `cart`
Shopping cart container for both logged-in users and guest sessions.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | integer | No | auto-increment | Primary key. |
| user_id | integer | Yes | - | Foreign key to `users.id` (null for guests). |
| session_id | nvarchar(255) | Yes | - | Session identifier for guest carts. |
| created_at | timestamp | No | now() | Cart creation timestamp. |
| updated_at | timestamp | Yes | - | Last modification timestamp. |

**Indexes:**
- `cart_pkey` (PRIMARY KEY, btree, id)
- `idx_cart_user_id` (btree, user_id)
- `idx_cart_session_id` (btree, session_id)

---

## Table: `cart_items`
Items stored in a shopping cart, referencing a specific product variant.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | integer | No | auto-increment | Primary key. |
| cart_id | integer | No | - | Foreign key to `cart.id`. |
| product_variant_id | integer | No | - | Foreign key to `product_variants.id`. |
| quantity | integer | No | 1 | Number of units of this variant. |

**Indexes:**
- `cart_items_pkey` (PRIMARY KEY, btree, id)
- `idx_cart_items_cart_id` (btree, cart_id)
- `idx_cart_items_variant_id` (btree, product_variant_id)
- `idx_cart_items_unique` (UNIQUE, btree, cart_id, product_variant_id)

---

## Table: `orders`
Customer orders containing totals, status, and references to addresses used.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | integer | No | auto-increment | Primary key. |
| user_id | integer | No | - | Foreign key to `users.id`. |
| order_number | nvarchar(50) | No | - | Unique human-readable order identifier. |
| order_status | nvarchar(50) | No | 'pending' | Status: pending, processing, shipped, delivered, cancelled, returned. |
| total_amount | decimal(10,2) | No | - | Final total including shipping and tax. |
| shipping_amount | decimal(10,2) | No | 0.00 | Shipping cost applied. |
| tax_amount | decimal(10,2) | No | 0.00 | Tax amount applied. |
| shipping_address_id | integer | No | - | Foreign key to `addresses.id` for shipping destination. |
| billing_address_id | integer | No | - | Foreign key to `addresses.id` for billing. |
| payment_method | nvarchar(50) | No | - | Method used: credit_card, paypal, cash_on_delivery. |
| payment_status | nvarchar(50) | No | 'pending' | Status: pending, paid, failed, refunded. |
| notes | nvarchar(max) | Yes | - | Internal or customer notes. |
| created_at | timestamp | No | now() | Order placement timestamp. |
| updated_at | timestamp | Yes | - | Last status change timestamp. |

**Indexes:**
- `orders_pkey` (PRIMARY KEY, btree, id)
- `idx_orders_user_id` (btree, user_id)
- `idx_orders_order_number` (btree, order_number)
- `idx_orders_status` (btree, order_status)
- `idx_orders_created_at` (btree, created_at)

---

## Table: `order_items`
Line items for an order, capturing the exact price and variant at the time of purchase.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | integer | No | auto-increment | Primary key. |
| order_id | integer | No | - | Foreign key to `orders.id`. |
| product_variant_id | integer | No | - | Foreign key to `product_variants.id`. |
| quantity | integer | No | - | Number of units purchased. |
| unit_price | decimal(10,2) | No | - | Price per unit at checkout (base + adjustment). |
| total_price | decimal(10,2) | No | - | Calculated as `unit_price * quantity`. |

**Indexes:**
- `order_items_pkey` (PRIMARY KEY, btree, id)
- `idx_order_items_order_id` (btree, order_id)
- `idx_order_items_variant_id` (btree, product_variant_id)

---

## Table: `reviews`
Product reviews submitted by customers, subject to moderation.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | integer | No | auto-increment | Primary key. |
| user_id | integer | No | - | Foreign key to `users.id`. |
| product_id | integer | No | - | Foreign key to `products.id`. |
| rating | integer | No | - | Numeric rating from 1 to 5. |
| title | nvarchar(255) | Yes | - | Review headline. |
| comment | nvarchar(max) | Yes | - | Full review text. |
| is_approved | boolean | No | false | Whether the review is publicly visible. |
| created_at | timestamp | No | now() | Review submission timestamp. |

**Indexes:**
- `reviews_pkey` (PRIMARY KEY, btree, id)
- `idx_reviews_product_id` (btree, product_id)
- `idx_reviews_user_id` (btree, user_id)
- `idx_reviews_unique_user_product` (UNIQUE, btree, user_id, product_id)
- `idx_reviews_rating` (btree, rating)

---

## Relationships

| Parent Table | Child Table | FK Column(s) | Cardinality | ON DELETE | Notes |
|--------------|-------------|--------------|-------------|-------------------------|-------|
| users | addresses | user_id | 1:N | CASCADE | Deleting a user removes their addresses. |
| users | cart | user_id | 1:N | SET NULL | Guest carts remain; authenticated user carts are preserved. |
| users | orders | user_id | 1:N | RESTRICT | Orders are retained for history; user cannot be deleted if orders exist. |
| users | reviews | user_id | 1:N | CASCADE | Reviews are removed when user account is deleted. |
| users | wishlist | user_id | 1:N | CASCADE | Wishlist items are removed with user. |
| categories | categories | parent_category_id | 1:N (self) | SET NULL | Subcategories become top-level if parent is deleted. |
| products | product_categories | product_id | 1:N | CASCADE | Deleting a product removes its category associations. |
| categories | product_categories | category_id | 1:N | CASCADE | Deleting a category removes all product links. |
| products | product_images | product_id | 1:N | CASCADE | Images are deleted with the product. |
| products | product_variants | product_id | 1:N | CASCADE | Variants are deleted with the product. |
| products | reviews | product_id | 1:N | CASCADE | Reviews are deleted with the product. |
| products | wishlist | product_id | 1:N | CASCADE | Wishlist references removed when product is deleted. |
| sizes | product_variants | size_id | 1:N | SET NULL | Variant size becomes NULL; SKU should be updated or variant deactivated. |
| colors | product_variants | color_id | 1:N | SET NULL | Variant color becomes NULL. |
| product_variants | cart_items | product_variant_id | 1:N | CASCADE | Cart items removed when variant is deleted. |
| product_variants | order_items | product_variant_id | 1:N | RESTRICT | Prevent deletion of variants that appear in past orders. |
| cart | cart_items | cart_id | 1:N | CASCADE | Items are deleted when cart is removed. |
| orders | order_items | order_id | 1:N | CASCADE | Line items are deleted with the order. |
| addresses | orders | shipping_address_id | 1:N | RESTRICT | Address cannot be deleted if used in an order. |
| addresses | orders | billing_address_id | 1:N | RESTRICT | Same as above. |

---

## Data Type Notes

- **nvarchar**: Unicode string type; lengths are specified in characters.
- **nvarchar(max)**: Large text field for descriptions and notes.
- **timestamp**: Date and time (without timezone). Assumes UTC storage; application should handle conversion.
- **decimal(10,2)**: Fixed-precision monetary values; 10 total digits, 2 decimal places.
- **json**: MySQL JSON type for storing semi-structured product attributes.
- **boolean**: True/false flags.

---

## Indexes

All standard indexes listed in this schema are implemented using **B-tree** (Balanced Tree) structures. 

**What does `btree` mean?**
- **B-tree** is the default indexing algorithm for most relational databases. It maintains data in a sorted, balanced tree format.
- It optimizes queries that use equality (`=`), range (`>`, `<`, `BETWEEN`), and `ORDER BY` on the indexed column(s).


