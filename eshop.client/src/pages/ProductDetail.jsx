import { useState, useEffect } from "react";

function ProductDetail({ productId, onAddToCart, onAddToWishlist }) {
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState("details");

    useEffect(() => {
        const timer = setTimeout(() => {
            const productsData = {
                1: {
                    id: 1,
                    name: "Classic White T-Shirt",
                    price: 29.99,
                    originalPrice: null,
                    description: "Comfortable cotton t-shirt perfect for everyday wear. Made from 100% organic cotton, this t-shirt is soft, breathable, and durable.",
                    images: ["https://picsum.photos/id/20/600/600", "https://picsum.photos/id/20/400/400"],
                    sizes: ["XS", "S", "M", "L", "XL"],
                    colors: [{ name: "White", hex: "#FFFFFF" }, { name: "Black", hex: "#000000" }],
                    rating: 4.5,
                    reviews: [
                        { id: 1, user: "John D.", rating: 5, comment: "Great quality, fits perfectly!", date: "2024-01-15" },
                        { id: 2, user: "Sarah M.", rating: 4, comment: "Nice shirt, a bit loose but comfortable.", date: "2024-02-20" },
                    ],
                    inStock: true,
                    category: "Men",
                    subcategory: "T-Shirts"
                },
                2: {
                    id: 2,
                    name: "Black Premium Hoodie",
                    price: 79.99,
                    originalPrice: 99.99,
                    description: "Warm and cozy hoodie made from premium cotton blend. Features a kangaroo pocket and adjustable drawstring hood.",
                    images: ["https://picsum.photos/id/21/600/600", "https://picsum.photos/id/21/400/400"],
                    sizes: ["S", "M", "L", "XL"],
                    colors: [{ name: "Black", hex: "#000000" }, { name: "Gray", hex: "#6B7280" }],
                    rating: 4.8,
                    reviews: [
                        { id: 1, user: "Mike R.", rating: 5, comment: "Best hoodie ever! Very warm.", date: "2024-01-10" },
                        { id: 2, user: "Emma W.", rating: 5, comment: "Love it, super comfortable.", date: "2024-02-01" },
                        { id: 3, user: "Alex K.", rating: 4, comment: "Good quality, runs a bit small.", date: "2024-02-15" },
                    ],
                    inStock: true,
                    category: "Men",
                    subcategory: "Hoodies"
                },
                5: {
                    id: 5,
                    name: "Floral Summer Dress",
                    price: 69.99,
                    originalPrice: 89.99,
                    description: "Beautiful floral pattern dress perfect for summer days. Lightweight and breathable fabric.",
                    images: ["https://picsum.photos/id/24/600/600", "https://picsum.photos/id/24/400/400"],
                    sizes: ["XS", "S", "M", "L"],
                    colors: [{ name: "Floral", hex: "#FF6B6B" }, { name: "Blue", hex: "#3B82F6" }],
                    rating: 4.9,
                    reviews: [
                        { id: 1, user: "Lisa M.", rating: 5, comment: "Absolutely beautiful dress!", date: "2024-01-20" },
                        { id: 2, user: "Anna K.", rating: 5, comment: "Perfect for summer, great fit.", date: "2024-02-10" },
                    ],
                    inStock: true,
                    category: "Women",
                    subcategory: "Dresses"
                },
                8: {
                    id: 8,
                    name: "Wool Coat",
                    price: 159.99,
                    originalPrice: 199.99,
                    description: "Warm winter coat made from high-quality wool. Elegant design perfect for formal occasions.",
                    images: ["https://picsum.photos/id/27/600/600", "https://picsum.photos/id/27/400/400"],
                    sizes: ["S", "M", "L", "XL"],
                    colors: [{ name: "Gray", hex: "#6B7280" }, { name: "Black", hex: "#000000" }],
                    rating: 4.7,
                    reviews: [
                        { id: 1, user: "David P.", rating: 5, comment: "Excellent quality, very warm.", date: "2024-01-05" },
                        { id: 2, user: "Clara J.", rating: 4, comment: "Beautiful coat, a bit heavy.", date: "2024-01-25" },
                    ],
                    inStock: true,
                    category: "Women",
                    subcategory: "Coats"
                }
            };
            setProduct(productsData[productId] || productsData[1]);
        }, 0);
        return () => clearTimeout(timer);
    }, [productId]);

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert("Please select a size");
            return;
        }
        if (onAddToCart) {
            onAddToCart({ ...product, quantity, selectedSize, selectedColor });
        }
        alert(`Added ${quantity}x ${product?.name} to cart!`);
    };

    const handleAddToWishlist = () => {
        if (onAddToWishlist) {
            onAddToWishlist(product);
        }
        alert(`${product?.name} added to wishlist!`);
    };

    const renderStars = (rating) => {
        const full = Math.floor(rating);
        const half = rating % 1 >= 0.5;
        let stars = "";
        for (let i = 0; i < full; i++) stars += "★";
        if (half) stars += "½";
        for (let i = 0; i < 5 - full - (half ? 1 : 0); i++) stars += "☆";
        return stars;
    };

    if (!product) {
        return <div className="container">Loading...</div>;
    }

    return (
        <div className="container">
            <div className="breadcrumb">
                <span className="breadcrumb-home">Home</span>
                <span className="separator">&gt;</span>
                <span>{product.category}</span>
                <span className="separator">&gt;</span>
                <span>{product.subcategory}</span>
                <span className="separator">&gt;</span>
                <span className="current">{product.name}</span>
            </div>

            <div className="product-detail-layout">
                <div className="product-detail-images">
                    <img src={product.images[0]} alt={product.name} className="product-main-image" />
                    <div className="product-thumbnails">
                        {product.images.map((img, idx) => (
                            <img key={idx} src={img} alt={`${product.name} ${idx + 1}`} className="product-thumbnail" />
                        ))}
                    </div>
                </div>

                <div className="product-detail-info">
                    <h1>{product.name}</h1>
                    <div className="product-detail-rating">
                        <span className="rating-stars">{renderStars(product.rating)}</span>
                        <span className="rating-count">({product.reviews.length} reviews)</span>
                    </div>
                    <div className="product-detail-price">
                        ${product.price.toFixed(2)}
                        {product.originalPrice && <span className="product-old-price">${product.originalPrice.toFixed(2)}</span>}
                        {product.originalPrice && <span className="product-discount">{Math.round((1 - product.price / product.originalPrice) * 100)}% OFF</span>}
                    </div>
                    <p className="product-detail-description">{product.description}</p>

                    <div className="product-detail-options">
                        <div className="option-group">
                            <label>Size:</label>
                            <div className="size-options">
                                {product.sizes.map(size => (
                                    <button key={size} className={`size-option ${selectedSize === size ? "active" : ""}`} onClick={() => setSelectedSize(size)}>{size}</button>
                                ))}
                            </div>
                        </div>

                        <div className="option-group">
                            <label>Color:</label>
                            <div className="color-options">
                                {product.colors.map(color => (
                                    <button key={color.name} className={`color-option ${selectedColor === color.name ? "active" : ""}`} style={{ backgroundColor: color.hex }} onClick={() => setSelectedColor(color.name)} title={color.name} />
                                ))}
                            </div>
                        </div>

                        <div className="option-group">
                            <label>Quantity:</label>
                            <div className="quantity-selector">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                                <span>{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)}>+</button>
                            </div>
                        </div>
                    </div>

                    <div className="product-detail-actions">
                        <button className="btn btn-primary btn-add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
                        <button className="btn btn-secondary btn-add-to-wishlist" onClick={handleAddToWishlist}>❤️ Wishlist</button>
                    </div>

                    <div className="product-meta">
                        <p><strong>Category:</strong> {product.category} / {product.subcategory}</p>
                        <p><strong>Availability:</strong> <span className={product.inStock ? "in-stock" : "out-of-stock"}>{product.inStock ? "In Stock" : "Out of Stock"}</span></p>
                    </div>
                </div>
            </div>

            <div className="product-detail-tabs">
                <div className="tabs-header">
                    <button className={`tab-btn ${activeTab === "details" ? "active" : ""}`} onClick={() => setActiveTab("details")}>Product Details</button>
                    <button className={`tab-btn ${activeTab === "reviews" ? "active" : ""}`} onClick={() => setActiveTab("reviews")}>Reviews ({product.reviews.length})</button>
                </div>
                <div className="tabs-content">
                    {activeTab === "details" && (
                        <div className="tab-details">
                            <h3>Product Information</h3>
                            <ul><li><strong>Material:</strong> Premium quality fabric</li><li><strong>Care:</strong> Machine wash cold, tumble dry low</li><li><strong>Fit:</strong> True to size</li><li><strong>Origin:</strong> Imported</li></ul>
                        </div>
                    )}
                    {activeTab === "reviews" && (
                        <div className="tab-reviews">
                            <div className="reviews-summary">
                                <div className="average-rating"><span className="big-rating">{product.rating}</span><span className="rating-stars">{renderStars(product.rating)}</span><span>Based on {product.reviews.length} reviews</span></div>
                            </div>
                            <div className="reviews-list">{product.reviews.map(review => (<div key={review.id} className="review-item"><div className="review-header"><strong>{review.user}</strong><span className="review-stars">{renderStars(review.rating)}</span><span className="review-date">{review.date}</span></div><p>{review.comment}</p></div>))}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;