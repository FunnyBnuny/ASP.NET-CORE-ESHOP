# ASP.NET‑CORE‑ESHOP Database Schema

This document describes the database schema for a clothing e‑commerce platform.  
The schema manages users, products with size/color variants, orders (including active shopping carts), and reviews.

---

![DatabaseDiagram](/docs/Images/ASP.NET-CORE-ESHOP-DatabaseDiagram.png)

---

## Enumerated Types

The database uses three custom enumerations to enforce valid values:

| Enum | Values | Used in |
|------|--------|---------|
| `size_enum` | XS, S, M, L, XL, XXL | `product_variants.size` |
| `color_enum` | Black, White, Red, Blue, Green, Yellow, Pink, Purple, Orange, Grey, Brown, Navy | `product_variants.color` |
| `order_status_enum` | cart, pending, processing, shipped, delivered, cancelled, returned | `orders.order_status` |

---

## Table: `users`
Stores registered customer and administrator accounts.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | integer | No | auto‑increment | Primary key. |
| email | nvarchar(255) | No | – | Unique login email address. |
| password_hash | nvarchar(255) | No | – | Hashed user password. |
| first_name | nvarchar(100) | Yes | – | User’s first name. |
| last_name | nvarchar(100) | Yes | – | User’s last name. |
| phone | nvarchar(20) | Yes | – | Contact phone number. |
| is_admin | boolean | No | false | Flag for administrative privileges. |
| created_at | timestamp | No | now() | Account creation timestamp. |
| updated_at | timestamp | Yes | – | Last update timestamp. |

**Indexes:**  
`users_pkey` (PRIMARY KEY, btree, id)  
`users_email_key` (UNIQUE, btree, email)

---

## Table: `addresses`
Stores shipping and billing addresses for users.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | integer | No | auto‑increment | Primary key. |
| user_id | integer | No | – | Foreign key to `users.id`. |
| address_line1 | nvarchar(255) | No | – | Primary street address. |
| address_line2 | nvarchar(255) | Yes | – | Secondary address line (apt, suite). |
| city | nvarchar(100) | No | – | City name. |
| state | nvarchar(100) | Yes | – | State or province. |
| postal_code | nvarchar(20) | No | – | ZIP or postal code. |
| country | nvarchar(100) | No | – | Country name. |
| is_default_shipping | boolean | No | false | Default shipping address. |
| is_default_billing | boolean | No | false | Default billing address. |
| created_at | timestamp | No | now() | Record creation timestamp. |

**Indexes:**  
`addresses_pkey` (PRIMARY KEY, btree, id)  
`idx_addresses_user_id` (btree, user_id)

---

## Table: `categories`
Hierarchical product categories (e.g., Men → Shirts → T‑Shirts).

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | integer | No | auto‑increment | Primary key. |
| name | nvarchar(100) | No | – | Display name of the category. |
| slug | nvarchar(100) | No | – | URL‑friendly unique identifier. |
| description | nvarchar(max) | Yes | – | Optional category description. |
| parent_category_id | integer | Yes | – | Self‑reference for subcategories. |
| image_url | nvarchar(500) | Yes | – | URL to category banner/image. |
| created_at | timestamp | No | now() | Creation timestamp. |

**Indexes:**  
`categories_pkey` (PRIMARY KEY, btree, id)  
`idx_categories_slug` (btree, slug)  
`idx_categories_parent_id` (btree, parent_category_id)

---

## Table: `products`
Core product information shared across all variants.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | integer | No | auto‑increment | Primary key. |
| name | nvarchar(255) | No | – | Product display name. |
| slug | nvarchar(255) | No | – | Unique URL slug (e.g., `red-running-shoes`). |
| description | nvarchar(max) | Yes | – | Full product description. |
| base_price | decimal(10,2) | No | – | Starting price before variant adjustments. |
| discount_price | decimal(10,2) | Yes | – | Optional sale price overriding base price. |
| details | json | Yes | – | Flexible key‑value store for material, care, fit, etc. |
| is_active | boolean | No | true | Whether the product is visible in the store. |
| is_featured | boolean | No | false | Flag for highlighting on homepage. |
| created_at | timestamp | No | now() | Creation timestamp. |
| updated_at | timestamp | Yes | – | Last update timestamp. |

**Indexes:**  
`products_pkey` (PRIMARY KEY, btree, id)  
`idx_products_slug` (btree, slug)  
`idx_products_active` (btree, is_active)  
`idx_products_price` (btree, base_price, discount_price)

---

## Table: `product_categories`
Junction table linking products to multiple categories.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| product_id | integer | No | – | Foreign key to `products.id`. |
| category_id | integer | No | – | Foreign key to `categories.id`. |

**Indexes:**  
`idx_product_categories_unique` (UNIQUE, btree, product_id, category_id)  
`idx_product_categories_category_id` (btree, category_id)

---

## Table: `product_images`
Stores image URLs associated with a product, including a primary image flag.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | integer | No | auto‑increment | Primary key. |
| product_id | integer | No | – | Foreign key to `products.id`. |
| image_url | nvarchar(500) | No | – | URL or path to the image file. |
| alt_text | nvarchar(255) | Yes | – | Accessibility description (SEO). |
| sort_order | integer | No | 0 | Display order among product images. |
| is_primary | boolean | No | false | Whether this is the main product image. |

**Indexes:**  
`product_images_pkey` (PRIMARY KEY, btree, id)  
`idx_product_images_product_id` (btree, product_id)

---

## Table: `product_variants`
Specific size/color combinations of a product, each with its own SKU, price adjustment, and stock.  

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | integer | No | auto‑increment | Primary key. |
| product_id | integer | No | – | Foreign key to `products.id`. |
| size | size_enum | Yes | – | Size from predefined list (e.g., S, M, L). |
| color | color_enum | Yes | – | Color from predefined list (e.g., Black, Red). |
| sku | nvarchar(100) | No | – | Unique Stock Keeping Unit identifier. |
| price_adjustment | decimal(10,2) | No | 0.00 | Amount added to `products.base_price` for this variant. |
| stock_quantity | integer | No | 0 | Current available inventory. |
| is_active | boolean | No | true | Whether this variant can be purchased. |
| created_at | timestamp | No | now() | Creation timestamp. |
| updated_at | timestamp | Yes | – | Last update timestamp. |

**Indexes:**  
`product_variants_pkey` (PRIMARY KEY, btree, id)  
`idx_variants_product_id` (btree, product_id)  
`idx_variants_sku` (btree, sku)  
`idx_variants_size_color` (btree, size, color)  
`idx_variants_stock` (btree, stock_quantity)

---

## Table: `orders`
Used both for active shopping carts (`order_status = 'cart'`) and finalized orders.  
For guest users, `user_id` is `NULL` and `session_id` identifies the cart.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | integer | No | auto‑increment | Primary key. |
| user_id | integer | Yes | – | Foreign key to `users.id` (NULL for guests). |
| session_id | nvarchar(255) | Yes | – | Session identifier for guest carts. |
| order_number | nvarchar(50) | Yes | – | Unique public‑facing order number; assigned when order is placed. |
| order_status | order_status_enum | No | 'cart' | `cart` for active cart, then `pending`, `processing`, `shipped`, `delivered`, `cancelled`, `returned`. |
| total_amount | decimal(10,2) | Yes | – | Final total; calculated and populated at checkout. |
| shipping_amount | decimal(10,2) | No | 0.00 | Shipping cost applied. |
| tax_amount | decimal(10,2) | No | 0.00 | Tax amount applied. |
| shipping_address_id | integer | Yes | – | FK to `addresses.id`; required at checkout. |
| billing_address_id | integer | Yes | – | FK to `addresses.id`; required at checkout. |
| payment_method | nvarchar(50) | Yes | – | Method used: credit_card, paypal, cash_on_delivery. |
| payment_status | nvarchar(50) | No | 'pending' | pending, paid, failed, refunded. |
| notes | nvarchar(max) | Yes | – | Internal or customer notes. |
| created_at | timestamp | No | now() | Cart/order creation timestamp. |
| updated_at | timestamp | Yes | – | Last modification timestamp. |

**Indexes:**  
`orders_pkey` (PRIMARY KEY, btree, id)  
`idx_orders_user_id` (btree, user_id)  
`idx_orders_session_id` (btree, session_id)  
`idx_orders_order_number` (btree, order_number)  
`idx_orders_status` (btree, order_status)  
`idx_orders_created_at` (btree, created_at)  
`idx_orders_one_active_cart` (UNIQUE, btree, user_id, order_status) – guarantees at most one active cart per registered user.

---

## Table: `order_items`
Line items for both shopping carts (when parent order has `order_status = 'cart'`) and completed orders.  

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | integer | No | auto‑increment | Primary key. |
| order_id | integer | No | – | Foreign key to `orders.id`. |
| product_variant_id | integer | No | – | Foreign key to `product_variants.id`. |
| quantity | integer | No | – | Number of units. |
| unit_price | decimal(10,2) | No | – | Price per unit at time of addition. |
| total_price | decimal(10,2) | No | – | Calculated as `unit_price * quantity`. |

**Indexes:**  
`order_items_pkey` (PRIMARY KEY, btree, id)  
`idx_order_items_order_id` (btree, order_id)  
`idx_order_items_variant_id` (btree, product_variant_id)

---

## Table: `reviews`
Product reviews submitted by customers, subject to moderation.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | integer | No | auto‑increment | Primary key. |
| user_id | integer | No | – | Foreign key to `users.id`. |
| product_id | integer | No | – | Foreign key to `products.id`. |
| rating | integer | No | – | Numeric rating from 1 to 5. |
| title | nvarchar(255) | Yes | – | Review headline. |
| comment | nvarchar(max) | Yes | – | Full review text. |
| is_approved | boolean | No | false | Whether the review is publicly visible. |
| created_at | timestamp | No | now() | Review submission timestamp. |

**Indexes:**  
`reviews_pkey` (PRIMARY KEY, btree, id)  
`idx_reviews_product_id` (btree, product_id)  
`idx_reviews_user_id` (btree, user_id)  
`idx_reviews_unique_user_product` (UNIQUE, btree, user_id, product_id)  
`idx_reviews_rating` (btree, rating)

---

## Relationships

| Parent Table | Child Table | FK Column(s) | Cardinality | ON DELETE | Notes |
|--------------|-------------|--------------|-------------|-----------|-------|
| users | addresses | user_id | 1:N | CASCADE | Deleting user removes their addresses. |
| users | orders | user_id | 1:N | SET NULL | Orders retained; user set to NULL if account deleted. |
| users | reviews | user_id | 1:N | CASCADE | Reviews removed when user deleted. |
| categories | categories | parent_category_id | 1:N (self) | SET NULL | Subcategories become top‑level if parent removed. |
| products | product_categories | product_id | 1:N | CASCADE | Category links deleted with product. |
| categories | product_categories | category_id | 1:N | CASCADE | Product links deleted with category. |
| products | product_images | product_id | 1:N | CASCADE | Images deleted with product. |
| products | product_variants | product_id | 1:N | CASCADE | Variants deleted with product. |
| products | reviews | product_id | 1:N | CASCADE | Reviews deleted with product. |
| product_variants | order_items | product_variant_id | 1:N | RESTRICT | Prevents deletion of variants used in any order/cart. |
| orders | order_items | order_id | 1:N | CASCADE | Line items deleted when parent order is removed. |
| addresses | orders | shipping_address_id | 1:N | SET NULL | Address can be deleted independently; order reference becomes NULL. |
| addresses | orders | billing_address_id | 1:N | SET NULL | Same as above. |

---

## Data Type Notes

- **nvarchar**: Unicode string type; lengths are specified in characters.
- **nvarchar(max)**: Large text field for descriptions and notes.
- **timestamp**: Date and time (without timezone). Assumes UTC storage; application handles conversion.
- **decimal(10,2)**: Fixed‑precision monetary values; 10 total digits, 2 decimal places.
- **json**: MySQL JSON type for storing semi‑structured product attributes.
- **boolean**: True/false flags.
- **size_enum, color_enum, order_status_enum**: Custom enumerated types that restrict a column to a fixed list of values. The allowed values are defined at the top of this document. New values can be added by altering the enum domain.

---

## Indexes

All standard indexes listed in this schema are implemented using **B‑tree** (Balanced Tree) structures.  

**What does `btree` mean?**  
- **B‑tree** is the default indexing algorithm for most relational databases. It maintains data in a sorted, balanced tree format.  
- It optimizes queries that use equality (`=`), range (`>`, `<`, `BETWEEN`), and `ORDER BY` on the indexed column(s).
