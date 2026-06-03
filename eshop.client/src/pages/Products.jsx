import { useState, useEffect } from "react";

// ============================================
// DATA
// ============================================

const categoriesData = [
    { id: 1, name: "Men", slug: "men", parent_category_id: null },
    { id: 2, name: "Women", slug: "women", parent_category_id: null },
    { id: 3, name: "T-Shirts", slug: "men-tshirts", parent_category_id: 1 },
    { id: 4, name: "Hoodies", slug: "men-hoodies", parent_category_id: 1 },
    { id: 5, name: "Jeans", slug: "men-jeans", parent_category_id: 1 },
    { id: 6, name: "Shorts", slug: "men-shorts", parent_category_id: 1 },
    { id: 7, name: "Jackets", slug: "men-jackets", parent_category_id: 1 },
    { id: 8, name: "Dresses", slug: "women-dresses", parent_category_id: 2 },
    { id: 9, name: "Blouses", slug: "women-blouses", parent_category_id: 2 },
    { id: 10, name: "Skirts", slug: "women-skirts", parent_category_id: 2 },
    { id: 11, name: "Coats", slug: "women-coats", parent_category_id: 2 },
];

const sizesData = [
    { id: 1, name: "XS" },
    { id: 2, name: "S" },
    { id: 3, name: "M" },
    { id: 4, name: "L" },
    { id: 5, name: "XL" },
    { id: 6, name: "30" },
    { id: 7, name: "32" },
    { id: 8, name: "34" },
    { id: 9, name: "36" },
];

const allColorsData = [
    { id: 1, name: "Black", hex_code: "#000000" },
    { id: 2, name: "White", hex_code: "#FFFFFF" },
    { id: 3, name: "Blue", hex_code: "#3B82F6" },
    { id: 4, name: "Red", hex_code: "#EF4444" },
    { id: 5, name: "Green", hex_code: "#10B981" },
    { id: 6, name: "Gray", hex_code: "#6B7280" },
    { id: 7, name: "Brown", hex_code: "#8B4513" },
    { id: 8, name: "Khaki", hex_code: "#C3B091" },
    { id: 9, name: "Azure", hex_code: "#00FFFF" },
    { id: 10, name: "Purple", hex_code: "#800080" },
    { id: 11, name: "Pink", hex_code: "#FFC0CB" },
    { id: 12, name: "Yellow", hex_code: "#FFFF00" },
    { id: 13, name: "Orange", hex_code: "#FFA500" },
    { id: 14, name: "Dark Blue", hex_code: "#1E3A8A" },
    { id: 15, name: "Light Green", hex_code: "#A3E4A3" },
    { id: 16, name: "Light Blue", hex_code: "#93C5FD" },
];

const productsData = [
    { id: 1, name: "Classic White T-Shirt", base_price: 29.99, discount_price: null, is_active: true },
    { id: 2, name: "Black Premium Hoodie", base_price: 79.99, discount_price: 59.99, is_active: true },
    { id: 3, name: "Slim Fit Jeans", base_price: 89.99, discount_price: null, is_active: true },
    { id: 4, name: "Summer Shorts", base_price: 39.99, discount_price: 29.99, is_active: true },
    { id: 5, name: "Floral Summer Dress", base_price: 69.99, discount_price: 49.99, is_active: true },
    { id: 6, name: "White Blouse", base_price: 49.99, discount_price: null, is_active: true },
    { id: 7, name: "Leather Skirt", base_price: 59.99, discount_price: 44.99, is_active: true },
    { id: 8, name: "Wool Coat", base_price: 159.99, discount_price: 129.99, is_active: true },
    { id: 9, name: "Sport Shorts", base_price: 34.99, discount_price: null, is_active: true },
    { id: 10, name: "Evening Dress", base_price: 129.99, discount_price: 99.99, is_active: true },
    { id: 11, name: "Denim Jacket", base_price: 89.99, discount_price: 69.99, is_active: true },
    { id: 12, name: "Silk Blouse", base_price: 79.99, discount_price: null, is_active: true },
    { id: 13, name: "Azure Dress", base_price: 99.99, discount_price: 79.99, is_active: true },
    { id: 14, name: "Pink Sweater", base_price: 49.99, discount_price: null, is_active: true },
    { id: 15, name: "Khaki Pants", base_price: 69.99, discount_price: null, is_active: true },
];

const productCategories = [
    { product_id: 1, category_id: 3 }, { product_id: 2, category_id: 4 },
    { product_id: 3, category_id: 5 }, { product_id: 4, category_id: 6 },
    { product_id: 5, category_id: 8 }, { product_id: 6, category_id: 9 },
    { product_id: 7, category_id: 10 }, { product_id: 8, category_id: 11 },
    { product_id: 9, category_id: 6 }, { product_id: 10, category_id: 8 },
    { product_id: 11, category_id: 7 }, { product_id: 12, category_id: 9 },
    { product_id: 13, category_id: 8 }, { product_id: 14, category_id: 9 },
    { product_id: 15, category_id: 6 },
];

const productVariants = [
    { id: 1, product_id: 1, size_id: 2, color_id: 2, is_active: true },
    { id: 2, product_id: 1, size_id: 3, color_id: 2, is_active: true },
    { id: 3, product_id: 2, size_id: 3, color_id: 1, is_active: true },
    { id: 4, product_id: 2, size_id: 4, color_id: 1, is_active: true },
    { id: 5, product_id: 5, size_id: 2, color_id: 4, is_active: true },
    { id: 6, product_id: 5, size_id: 3, color_id: 4, is_active: true },
    { id: 7, product_id: 8, size_id: 3, color_id: 6, is_active: true },
    { id: 8, product_id: 8, size_id: 4, color_id: 6, is_active: true },
    { id: 9, product_id: 3, size_id: 3, color_id: 3, is_active: true },
    { id: 10, product_id: 11, size_id: 4, color_id: 3, is_active: true },
    { id: 11, product_id: 8, size_id: 3, color_id: 8, is_active: true },
    { id: 12, product_id: 13, size_id: 3, color_id: 9, is_active: true },
    { id: 13, product_id: 14, size_id: 2, color_id: 11, is_active: true },
    { id: 14, product_id: 15, size_id: 3, color_id: 8, is_active: true },
    { id: 15, product_id: 4, size_id: 3, color_id: 4, is_active: true },
];

const productImages = [
    { id: 1, product_id: 1, image_url: "https://picsum.photos/id/20/300/300", is_primary: true },
    { id: 2, product_id: 2, image_url: "https://picsum.photos/id/21/300/300", is_primary: true },
    { id: 3, product_id: 3, image_url: "https://picsum.photos/id/22/300/300", is_primary: true },
    { id: 4, product_id: 4, image_url: "https://picsum.photos/id/23/300/300", is_primary: true },
    { id: 5, product_id: 5, image_url: "https://picsum.photos/id/24/300/300", is_primary: true },
    { id: 6, product_id: 6, image_url: "https://picsum.photos/id/25/300/300", is_primary: true },
    { id: 7, product_id: 7, image_url: "https://picsum.photos/id/26/300/300", is_primary: true },
    { id: 8, product_id: 8, image_url: "https://picsum.photos/id/27/300/300", is_primary: true },
    { id: 9, product_id: 9, image_url: "https://picsum.photos/id/28/300/300", is_primary: true },
    { id: 10, product_id: 10, image_url: "https://picsum.photos/id/29/300/300", is_primary: true },
    { id: 11, product_id: 11, image_url: "https://picsum.photos/id/30/300/300", is_primary: true },
    { id: 12, product_id: 12, image_url: "https://picsum.photos/id/31/300/300", is_primary: true },
    { id: 13, product_id: 13, image_url: "https://picsum.photos/id/32/300/300", is_primary: true },
    { id: 14, product_id: 14, image_url: "https://picsum.photos/id/33/300/300", is_primary: true },
    { id: 15, product_id: 15, image_url: "https://picsum.photos/id/34/300/300", is_primary: true },
];

const reviewsData = [
    { id: 1, product_id: 1, rating: 5, is_approved: true },
    { id: 2, product_id: 2, rating: 4, is_approved: true },
    { id: 3, product_id: 3, rating: 4, is_approved: true },
    { id: 4, product_id: 5, rating: 5, is_approved: true },
    { id: 5, product_id: 8, rating: 4, is_approved: true },
    { id: 6, product_id: 10, rating: 5, is_approved: true },
];

//colors

function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
}

function colorDistance(rgb1, rgb2) {
    const dr = rgb1.r - rgb2.r;
    const dg = rgb1.g - rgb2.g;
    const db = rgb1.b - rgb2.b;
    return Math.sqrt(dr * dr + dg * dg + db * db);
}

const filterColors = [
    { name: "Green", hex_code: "#00FF00", group: "green", displayName: "Zelená" },
    { name: "Red", hex_code: "#FF0000", group: "red", displayName: "Červená" },
    { name: "Yellow", hex_code: "#FFFF00", group: "yellow", displayName: "Žlutá" },
    { name: "Orange", hex_code: "#FFA500", group: "orange", displayName: "Oranžová" },
    { name: "Light Blue", hex_code: "#93C5FD", group: "light-blue", displayName: "Světle modrá" },
    { name: "Dark Blue", hex_code: "#1E3A8A", group: "dark-blue", displayName: "Tmavě modrá" },
    { name: "Purple", hex_code: "#800080", group: "purple", displayName: "Fialová" },
    { name: "Pink", hex_code: "#FF69B4", group: "pink", displayName: "Růžová" },
    { name: "White", hex_code: "#FFFFFF", group: "white", displayName: "Bílá" },
    { name: "Black", hex_code: "#000000", group: "black", displayName: "Černá" },
    { name: "Brown", hex_code: "#8B4513", group: "brown", displayName: "Hnědá" },
];

function mapHexToColorGroup(hexCode) {
    const targetRgb = hexToRgb(hexCode);
    let bestMatch = null;
    let smallestDistance = Infinity;

    for (let i = 0; i < filterColors.length; i++) {
        const refColor = filterColors[i];
        const refRgb = hexToRgb(refColor.hex_code);
        const distance = colorDistance(targetRgb, refRgb);

        if (distance < smallestDistance) {
            smallestDistance = distance;
            bestMatch = refColor;
        }
    }

    if (smallestDistance > 100) {
        return "other";
    }

    return bestMatch ? bestMatch.group : "other";
}

//main

function Products({ initialCategory = null }) {

    const [data, setData] = useState({
        selectedCategory: null,
        selectedSubcategory: null,
        selectedSizes: [],
        selectedColorGroups: [],
        selectedRating: null,
        priceMin: 0,
        priceMax: 200,
        sortBy: "default",
    });

    const updateData = (key, value) => {
        setData(prev => ({ ...prev, [key]: value }));
    };

    useEffect(() => {
        if (initialCategory) {
            const timer = setTimeout(() => {
                const category = categoriesData.find(c =>
                    c.slug === initialCategory || c.name.toLowerCase() === initialCategory.toLowerCase()
                );
                if (category) {
                    if (category.parent_category_id === null) {
                        setData(prev => ({
                            ...prev,
                            selectedCategory: category.name,
                            selectedSubcategory: null
                        }));
                    } else {
                        const parent = categoriesData.find(c => c.id === category.parent_category_id);
                        if (parent) {
                            setData(prev => ({
                                ...prev,
                                selectedCategory: parent.name
                            }));
                        }
                        setData(prev => ({
                            ...prev,
                            selectedSubcategory: category.name
                        }));
                    }
                }
            }, 0);
            return () => clearTimeout(timer);
        }
    }, [initialCategory]);

    function getProductPrice(product) {
        return product.discount_price || product.base_price;
    }

    function getProductPrimaryImage(productId) {
        const image = productImages.find(img => img.product_id === productId && img.is_primary);
        return image?.image_url || "https://picsum.photos/id/0/300/300";
    }

    function getProductCategory(productId) {
        const pc = productCategories.find(item => item.product_id === productId);
        if (!pc) return null;
        return categoriesData.find(c => c.id === pc.category_id);
    }

    function getProductAvailableSizes(productId) {
        const variants = productVariants.filter(v => v.product_id === productId && v.is_active);
        const sizeIds = [];
        for (let i = 0; i < variants.length; i++) {
            if (!sizeIds.includes(variants[i].size_id)) {
                sizeIds.push(variants[i].size_id);
            }
        }
        return sizesData.filter(s => sizeIds.includes(s.id));
    }

    function getProductRating(productId) {
        const productReviews = reviewsData.filter(r => r.product_id === productId && r.is_approved);
        if (productReviews.length === 0) return null;
        let sum = 0;
        for (let i = 0; i < productReviews.length; i++) {
            sum = sum + productReviews[i].rating;
        }
        return sum / productReviews.length;
    }

    function getProductColorGroups(productId) {
        const variants = productVariants.filter(v => v.product_id === productId && v.is_active);
        const colorIds = [];
        for (let i = 0; i < variants.length; i++) {
            if (variants[i].color_id && !colorIds.includes(variants[i].color_id)) {
                colorIds.push(variants[i].color_id);
            }
        }

        const colorGroups = [];
        for (let i = 0; i < colorIds.length; i++) {
            const color = allColorsData.find(c => c.id === colorIds[i]);
            if (color) {
                const group = mapHexToColorGroup(color.hex_code);
                if (!colorGroups.includes(group) && group !== "other") {
                    colorGroups.push(group);
                }
            }
        }
        return colorGroups;
    }

    function getBreadcrumbPath() {
        const path = [];
        path.push({ name: "Products", slug: "products" });

        if (data.selectedCategory) {
            path.push({ name: data.selectedCategory, slug: data.selectedCategory.toLowerCase() });
        }

        if (data.selectedSubcategory && data.selectedSubcategory !== data.selectedCategory) {
            path.push({ name: data.selectedSubcategory, slug: data.selectedSubcategory.toLowerCase().replace(/\s+/g, '-') });
        }

        return path;
    }

    const breadcrumbPath = getBreadcrumbPath();
    const mainCategories = categoriesData.filter(c => c.parent_category_id === null);
    const getSubcategories = (parentId) => categoriesData.filter(c => c.parent_category_id === parentId);

    const getCurrentSubcategories = () => {
        if (!data.selectedCategory) return [];
        const mainCat = mainCategories.find(c => c.name === data.selectedCategory);
        if (!mainCat) return [];
        return getSubcategories(mainCat.id);
    };

    const currentSubcategories = getCurrentSubcategories();

//filtr

    let filteredProducts = [];

    for (let i = 0; i < productsData.length; i++) {
        const product = productsData[i];
        if (!product.is_active) continue;

        const productCat = getProductCategory(product.id);
        if (!productCat) continue;

        const parentCategory = categoriesData.find(c => c.id === productCat.parent_category_id);

        if (data.selectedCategory) {
            if (parentCategory?.name !== data.selectedCategory) continue;
        }

        if (data.selectedSubcategory) {
            if (productCat.name !== data.selectedSubcategory) continue;
        }

        if (data.selectedSizes.length > 0) {
            const availableSizes = getProductAvailableSizes(product.id);
            let hasSize = false;
            for (let j = 0; j < availableSizes.length; j++) {
                for (let k = 0; k < data.selectedSizes.length; k++) {
                    if (availableSizes[j].name === data.selectedSizes[k]) {
                        hasSize = true;
                        break;
                    }
                }
                if (hasSize) break;
            }
            if (!hasSize) continue;
        }

        if (data.selectedColorGroups.length > 0) {
            const productGroups = getProductColorGroups(product.id);
            let hasColorGroup = false;
            for (let j = 0; j < data.selectedColorGroups.length; j++) {
                for (let k = 0; k < productGroups.length; k++) {
                    if (data.selectedColorGroups[j] === productGroups[k]) {
                        hasColorGroup = true;
                        break;
                    }
                }
                if (hasColorGroup) break;
            }
            if (!hasColorGroup) continue;
        }

        const productRating = getProductRating(product.id);
        if (data.selectedRating === "without") {
            if (productRating !== null) continue;
        } else if (data.selectedRating !== null && data.selectedRating !== "without") {
            if (productRating === null || productRating < data.selectedRating) continue;
        }

        const price = getProductPrice(product);
        if (price < data.priceMin || price > data.priceMax) continue;

        filteredProducts.push(product);
    }


    if (data.sortBy === "price-asc") {
        filteredProducts.sort(function(a, b) {
            return getProductPrice(a) - getProductPrice(b);
        });
    } else if (data.sortBy === "price-desc") {
        filteredProducts.sort(function(a, b) {
            return getProductPrice(b) - getProductPrice(a);
        });
    } else if (data.sortBy === "name-asc") {
        filteredProducts.sort(function(a, b) {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        });
    } else if (data.sortBy === "rating-desc") {
        filteredProducts.sort(function(a, b) {
            const ratingA = getProductRating(a.id) || 0;
            const ratingB = getProductRating(b.id) || 0;
            return ratingB - ratingA;
        });
    }

    function resetFilters() {
        updateData('selectedCategory', null);
        updateData('selectedSubcategory', null);
        updateData('selectedSizes', []);
        updateData('selectedColorGroups', []);
        updateData('selectedRating', null);
        updateData('priceMin', 0);
        updateData('priceMax', 200);
        updateData('sortBy', "default");
    }

    function renderStars(rating) {
        if (rating === null) return "No reviews";
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let stars = "";
        for (let i = 0; i < fullStars; i++) {
            stars = stars + "★";
        }
        if (hasHalfStar) {
            stars = stars + "½";
        }
        for (let i = 0; i < 5 - fullStars - (hasHalfStar ? 1 : 0); i++) {
            stars = stars + "☆";
        }
        return stars + " " + rating.toFixed(1);
    }

    function handleCategorySelect(categoryName) {
        if (data.selectedCategory === categoryName) {
            updateData('selectedCategory', null);
            updateData('selectedSubcategory', null);
        } else {
            updateData('selectedCategory', categoryName);
            updateData('selectedSubcategory', null);
        }
    }

    function handleSubcategorySelect(subcategoryName) {
        if (data.selectedSubcategory === subcategoryName) {
            updateData('selectedSubcategory', null);
        } else {
            updateData('selectedSubcategory', subcategoryName);
        }
    }

//visual

    return (
        <div className="container">

            {/* Breadcrumb */}
            <div className="breadcrumb">
                <span className="breadcrumb-home">Home</span>
                <span className="separator">&gt;</span>

                {breadcrumbPath.map(function(item, index) {
                    const isLast = index === breadcrumbPath.length - 1;
                    return (
                        <span key={index}>
                            <span className={isLast ? "current" : "breadcrumb-home"}>
                                {item.name}
                            </span>
                            {!isLast && <span className="separator">&gt;</span>}
                        </span>
                    );
                })}
            </div>

            {/* Hlavní layout */}
            <div className="products-layout">

                {/* FILTR PANEL */}
                <div className="filters-sidebar">

                    {/* Category */}
                    <div className="filter-section">
                        <h3 className="filter-title">Category</h3>

                        {mainCategories.map(function(cat) {
                            const isSelected = data.selectedCategory === cat.name;
                            return (
                                <div key={cat.id} className="category-item">
                                    <label className="category-label">
                                        <input
                                            type="radio"
                                            name="mainCategory"
                                            checked={isSelected}
                                            onChange={function() { handleCategorySelect(cat.name); }}
                                        />
                                        {cat.name}
                                    </label>
                                </div>
                            );
                        })}

                        {data.selectedCategory && currentSubcategories.length > 0 && (
                            <div className="subcategories-section" style={{ marginTop: '15px', marginLeft: '20px' }}>
                                {currentSubcategories.map(function(sub) {
                                    const isSelected = data.selectedSubcategory === sub.name;
                                    return (
                                        <label key={sub.id} className="subcategory-label" style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                            marginBottom: '8px',
                                            cursor: 'pointer'
                                        }}>
                                            <input
                                                type="radio"
                                                name="subCategory"
                                                checked={isSelected}
                                                onChange={function() { handleSubcategorySelect(sub.name); }}
                                                style={{ width: '14px', height: '14px', cursor: 'pointer' }}
                                            />
                                            <span style={{ fontSize: '13px', color: '#6b7280' }}>{sub.name}</span>
                                        </label>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Price Range */}
                    <div className="filter-section">
                        <h3 className="filter-title">Price range</h3>
                        <div className="price-slider-container">
                            <div className="price-slider-track"></div>
                            <div
                                className="price-slider-filled"
                                style={{
                                    left: (data.priceMin / 200) * 100 + '%',
                                    width: ((data.priceMax - data.priceMin) / 200) * 100 + '%'
                                }}
                            ></div>
                            <input
                                type="range"
                                min="0"
                                max="200"
                                step="1"
                                value={data.priceMin}
                                onChange={function(e) {
                                    let newMin = Number(e.target.value);
                                    if (newMin > data.priceMax) newMin = data.priceMax;
                                    updateData('priceMin', newMin);
                                }}
                                className="price-slider-input price-slider-input-left"
                            />
                            <input
                                type="range"
                                min="0"
                                max="200"
                                step="1"
                                value={data.priceMax}
                                onChange={function(e) {
                                    let newMax = Number(e.target.value);
                                    if (newMax < data.priceMin) newMax = data.priceMin;
                                    updateData('priceMax', newMax);
                                }}
                                className="price-slider-input price-slider-input-right"
                            />
                        </div>
                        <div className="price-values">
                            <span>${data.priceMin}</span>
                            <span>-</span>
                            <span>${data.priceMax}</span>
                        </div>
                    </div>

                    {/* Colors - používáme filterColors (pouze 11 základních barev) */}
                    <div className="filter-section">
                        <h3 className="filter-title">Colors</h3>
                        <div className="color-groups-grid">
                            {filterColors.map(function(color) {
                                const isActive = data.selectedColorGroups.includes(color.group);
                                const isLightColor = color.hex_code === "#FFFFFF" ||
                                    color.hex_code === "#FFFF00" ||
                                    color.hex_code === "#FF69B4" ||
                                    color.hex_code === "#93C5FD";

                                return (
                                    <button
                                        key={color.group}
                                        className={"color-btn " + (isActive ? 'active' : '') + (isLightColor ? ' color-btn-light' : '')}
                                        style={{
                                            backgroundColor: color.hex_code,
                                            border: color.hex_code === '#FFFFFF' ? '1px solid #ccc' : 'none'
                                        }}
                                        onClick={function() {
                                            if (isActive) {
                                                const newGroups = [];
                                                for (let i = 0; i < data.selectedColorGroups.length; i++) {
                                                    if (data.selectedColorGroups[i] !== color.group) {
                                                        newGroups.push(data.selectedColorGroups[i]);
                                                    }
                                                }
                                                updateData('selectedColorGroups', newGroups);
                                            } else {
                                                updateData('selectedColorGroups', [...data.selectedColorGroups, color.group]);
                                            }
                                        }}
                                        title={color.displayName}
                                    />
                                );
                            })}
                        </div>
                    </div>

                    {/* Sizes */}
                    <div className="filter-section">
                        <h3 className="filter-title">Sizes</h3>
                        <div className="sizes-grid">
                            {sizesData.map(function(size) {
                                const isActive = data.selectedSizes.includes(size.name);
                                return (
                                    <button
                                        key={size.id}
                                        className={"size-btn " + (isActive ? 'active' : '')}
                                        onClick={function() {
                                            if (isActive) {
                                                const newSizes = [];
                                                for (let i = 0; i < data.selectedSizes.length; i++) {
                                                    if (data.selectedSizes[i] !== size.name) {
                                                        newSizes.push(data.selectedSizes[i]);
                                                    }
                                                }
                                                updateData('selectedSizes', newSizes);
                                            } else {
                                                updateData('selectedSizes', [...data.selectedSizes, size.name]);
                                            }
                                        }}
                                    >
                                        {size.name}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Reset button */}
                    <button onClick={resetFilters} className="btn btn-primary reset-filters">
                        Reset all filters
                    </button>
                </div>

                {/* PRODUCTS CONTENT */}
                <div className="products-content">

                    {/* Sort bar */}
                    <div className="sort-bar">
                        <span className="results-count">{filteredProducts.length} products found</span>
                        <select
                            value={data.sortBy}
                            onChange={function(e) { updateData('sortBy', e.target.value); }}
                            className="sort-select"
                        >
                            <option value="default">Default</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="name-asc">Name: A to Z</option>
                            <option value="rating-desc">Best Rating</option>
                        </select>
                    </div>

                    {/* Products grid */}
                    {filteredProducts.length > 0 ? (
                        <div className="products-grid">
                            {filteredProducts.map(function(product) {
                                const price = getProductPrice(product);
                                const discount = product.discount_price ? Math.round((1 - product.discount_price / product.base_price) * 100) : 0;
                                const primaryImage = getProductPrimaryImage(product.id);
                                const rating = getProductRating(product.id);
                                const ratingDisplay = renderStars(rating);

                                return (
                                    <div key={product.id} className="product-card">
                                        <div className="product-image">
                                            <img
                                                src={primaryImage}
                                                alt={product.name}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    borderRadius: '12px'
                                                }}
                                            />
                                        </div>
                                        <div className="product-info">
                                            <div className="product-name">{product.name}</div>
                                            <div className="product-rating" style={{ fontSize: '13px', color: '#f5a623', marginBottom: '8px' }}>
                                                {ratingDisplay}
                                            </div>
                                            <div className="product-price">
                                                ${price.toFixed(2)}
                                                {product.discount_price && (
                                                    <>
                                                        <span className="product-old-price">${product.base_price.toFixed(2)}</span>
                                                        <span className="product-discount">-{discount}%</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="helper-text">
                            <p>No products found matching your filters.</p>
                            <button onClick={resetFilters} className="btn btn-primary">
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Products;