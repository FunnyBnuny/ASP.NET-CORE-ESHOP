import { useState, useEffect } from "react";

function ProfilePage({ userName, userEmail, onUpdateProfile, onLogout }) {
    const [activeTab, setActiveTab] = useState("overview");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [message, setMessage] = useState({ text: "", type: "" });

    // Wishlist test
    const [wishlist, setWishlist] = useState([
        { id: 1, name: "Classic White T-Shirt", price: 29.99, image: "https://picsum.photos/id/20/100/100", inStock: true },
        { id: 2, name: "Black Premium Hoodie", price: 79.99, image: "https://picsum.photos/id/21/100/100", inStock: true },
        { id: 3, name: "Slim Fit Jeans", price: 89.99, image: "https://picsum.photos/id/22/100/100", inStock: false },
    ]);

    // Addresses test
    const [addresses, setAddresses] = useState([
        { id: 1, firstName: "John", lastName: "Doe", street: "123 Main St", city: "New York", state: "NY", zip: "10001", country: "USA", phone: "+1 234 567 890", isDefault: true },
        { id: 2, firstName: "John", lastName: "Doe", street: "456 Oak Ave", city: "Los Angeles", state: "CA", zip: "90001", country: "USA", phone: "+1 234 567 891", isDefault: false },
    ]);

    const [showAddressForm, setShowAddressForm] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [newAddress, setNewAddress] = useState({
        firstName: "",
        lastName: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        phone: "",
        isDefault: false,
    });

    // Orders test
    const orders = [
        { id: "ORD-001", date: "2024-01-15", total: 89.99, status: "Delivered", items: 2 },
        { id: "ORD-002", date: "2024-02-20", total: 159.99, status: "Shipped", items: 1 },
        { id: "ORD-003", date: "2024-03-10", total: 49.99, status: "Processing", items: 1 },
    ];

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[.\-/_]).{8,}$/;

    const isEmailValid = (email) => emailRegex.test(email);
    const isPasswordValid = (password) => passwordRegex.test(password);

    // localstorage
    useEffect(() => {
        const timer = setTimeout(() => {
            const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
            const currentUserEmail = localStorage.getItem("loggedInUserEmail");
            const user = storedUsers.find(u => u.email === currentUserEmail);

            if (user) {
                setFormData(prev => ({
                    ...prev,
                    firstName: user.firstName || "",
                    lastName: user.lastName || "",
                    email: user.email || "",
                }));
            }
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddressChange = (e) => {
        setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.email && !isEmailValid(formData.email)) {
            setMessage({ text: "Please enter a valid email address", type: "error" });
            return;
        }

        if (formData.newPassword) {
            if (!isPasswordValid(formData.newPassword)) {
                setMessage({ text: "Password must have: min. 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special character", type: "error" });
                return;
            }
            if (formData.newPassword !== formData.confirmPassword) {
                setMessage({ text: "New passwords do not match", type: "error" });
                return;
            }
        }

        const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
        const currentUserEmail = localStorage.getItem("loggedInUserEmail");
        const userIndex = storedUsers.findIndex(u => u.email === currentUserEmail);

        if (userIndex !== -1) {
            if (formData.newPassword) {
                if (storedUsers[userIndex].password !== formData.currentPassword) {
                    setMessage({ text: "Current password is incorrect", type: "error" });
                    return;
                }
                storedUsers[userIndex].password = formData.newPassword;
            }

            storedUsers[userIndex].firstName = formData.firstName;
            storedUsers[userIndex].lastName = formData.lastName;
            storedUsers[userIndex].email = formData.email;

            localStorage.setItem("users", JSON.stringify(storedUsers));

            if (formData.email !== currentUserEmail) {
                localStorage.setItem("loggedInUserEmail", formData.email);
                localStorage.setItem("loggedInUser", `${formData.firstName} ${formData.lastName}`);
            } else {
                localStorage.setItem("loggedInUser", `${formData.firstName} ${formData.lastName}`);
            }

            if (onUpdateProfile) {
                onUpdateProfile(formData.firstName, formData.lastName, formData.email);
            }

            setMessage({ text: "Profile updated successfully!", type: "success" });
            setTimeout(() => setActiveTab("overview"), 1500);
        }
    };

    const addAddress = () => {
        if (!newAddress.street || !newAddress.city || !newAddress.zip) {
            alert("Please fill in required fields (street, city, zip)");
            return;
        }

        const addressToAdd = {
            ...newAddress,
            id: Date.now(),
            firstName: formData.firstName || "User",
            lastName: formData.lastName || "",
        };

        if (addressToAdd.isDefault) {
            setAddresses(prev => prev.map(addr => ({ ...addr, isDefault: false })));
        }

        setAddresses([...addresses, addressToAdd]);
        setNewAddress({
            firstName: "",
            lastName: "",
            street: "",
            city: "",
            state: "",
            zip: "",
            country: "",
            phone: "",
            isDefault: false,
        });
        setShowAddressForm(false);
    };

    const editAddress = (address) => {
        setEditingAddress(address);
        setNewAddress(address);
        setShowAddressForm(true);
    };

    const updateAddress = () => {
        if (!newAddress.street || !newAddress.city || !newAddress.zip) {
            alert("Please fill in required fields (street, city, zip)");
            return;
        }

        if (newAddress.isDefault) {
            setAddresses(prev => prev.map(addr => ({ ...addr, isDefault: false })));
        }

        setAddresses(prev => prev.map(addr =>
            addr.id === editingAddress.id ? { ...newAddress, id: addr.id } : addr
        ));

        setEditingAddress(null);
        setNewAddress({
            firstName: "",
            lastName: "",
            street: "",
            city: "",
            state: "",
            zip: "",
            country: "",
            phone: "",
            isDefault: false,
        });
        setShowAddressForm(false);
    };

    const deleteAddress = (id) => {
        if (confirm("Are you sure you want to delete this address?")) {
            setAddresses(addresses.filter(addr => addr.id !== id));
        }
    };

    const removeFromWishlist = (id) => {
        setWishlist(wishlist.filter(item => item.id !== id));
    };

    const moveToCart = (item) => {
        alert(`Added ${item.name} to cart!`);
    };

    return (
        <div className="container">
            <div className="breadcrumb">
                <span className="breadcrumb-home">Home</span>
                <span className="separator">&gt;</span>
                <span className="current">My Profile</span>
            </div>

            <div className="profile-layout">
                {/* Sidebar */}
                <div className="profile-sidebar">
                    <div className="profile-avatar">
                        <div className="avatar-circle">
                            {userName ? userName.charAt(0).toUpperCase() : "U"}
                        </div>
                        <h3>{userName || "User"}</h3>
                        <p>{userEmail || ""}</p>
                    </div>

                    <nav className="profile-nav">
                        <button
                            className={`profile-nav-btn ${activeTab === "overview" ? 'active' : ''}`}
                            onClick={() => setActiveTab("overview")}
                        >
                            Overview
                        </button>
                        <button
                            className={`profile-nav-btn ${activeTab === "edit" ? 'active' : ''}`}
                            onClick={() => setActiveTab("edit")}
                        >
                            Edit Profile
                        </button>
                        <button
                            className={`profile-nav-btn ${activeTab === "orders" ? 'active' : ''}`}
                            onClick={() => setActiveTab("orders")}
                        >
                            My Orders
                        </button>
                        <button
                            className={`profile-nav-btn ${activeTab === "wishlist" ? 'active' : ''}`}
                            onClick={() => setActiveTab("wishlist")}
                        >
                            Wishlist ({wishlist.length})
                        </button>
                        <button
                            className={`profile-nav-btn ${activeTab === "addresses" ? 'active' : ''}`}
                            onClick={() => setActiveTab("addresses")}
                        >
                            Addresses
                        </button>
                        <button className="profile-nav-btn logout-btn" onClick={onLogout}>
                            Sign Out
                        </button>
                    </nav>
                </div>

                {/* Main Content */}
                <div className="profile-content">
                    {/* Overview */}
                    {activeTab === "overview" && (
                        <div className="profile-overview">
                            <h2>Account Overview</h2>

                            <div className="info-card">
                                <h3>Personal Information</h3>
                                <div className="info-row">
                                    <span className="info-label">Name:</span>
                                    <span className="info-value">{userName || "Not set"}</span>
                                </div>
                                <div className="info-row">
                                    <span className="info-label">Email:</span>
                                    <span className="info-value">{userEmail || "Not set"}</span>
                                </div>
                                <button className="btn btn-secondary" onClick={() => setActiveTab("edit")}>
                                    Edit Information
                                </button>
                            </div>

                            <div className="stats-grid">
                                <div className="stat-card">
                                    <span className="stat-number">{orders.length}</span>
                                    <span className="stat-label">Total Orders</span>
                                </div>
                                <div className="stat-card">
                                    <span className="stat-number">{wishlist.length}</span>
                                    <span className="stat-label">Wishlist Items</span>
                                </div>
                                <div className="stat-card">
                                    <span className="stat-number">{addresses.length}</span>
                                    <span className="stat-label">Saved Addresses</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Edit Profile */}
                    {activeTab === "edit" && (
                        <div className="profile-edit">
                            <h2>Edit Profile</h2>

                            {message.text && (
                                <p className={`message-${message.type}`}>{message.text}</p>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>First Name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className="input"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className="input"
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="input"
                                    />
                                </div>

                                <hr className="profile-divider" />
                                <h3>Change Password</h3>

                                <div className="form-group">
                                    <label>Current Password</label>
                                    <input
                                        type="password"
                                        name="currentPassword"
                                        value={formData.currentPassword}
                                        onChange={handleChange}
                                        className="input"
                                        placeholder="Enter current password to change"
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>New Password</label>
                                        <input
                                            type="password"
                                            name="newPassword"
                                            value={formData.newPassword}
                                            onChange={handleChange}
                                            className="input"
                                            placeholder="Min. 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Confirm New Password</label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className="input"
                                        />
                                    </div>
                                </div>

                                <div className="form-actions">
                                    <button type="submit" className="btn btn-primary">Save Changes</button>
                                    <button type="button" className="btn btn-secondary" onClick={() => setActiveTab("overview")}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Orders */}
                    {activeTab === "orders" && (
                        <div className="profile-orders">
                            <h2>My Orders</h2>
                            {orders.length > 0 ? (
                                <div className="orders-table">
                                    <table>
                                        <thead>
                                        <tr>
                                            <th>Order ID</th>
                                            <th>Date</th>
                                            <th>Items</th>
                                            <th>Total</th>
                                            <th>Status</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {orders.map(order => (
                                            <tr key={order.id}>
                                                <td>{order.id}</td>
                                                <td>{order.date}</td>
                                                <td>{order.items}</td>
                                                <td>${order.total.toFixed(2)}</td>
                                                <td><span className={`status-${order.status.toLowerCase()}`}>{order.status}</span></td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p>No orders yet.</p>
                            )}
                        </div>
                    )}

                    {/* Wishlist */}
                    {activeTab === "wishlist" && (
                        <div className="profile-wishlist">
                            <h2>My Wishlist</h2>
                            {wishlist.length > 0 ? (
                                <div className="wishlist-grid">
                                    {wishlist.map(item => (
                                        <div key={item.id} className="wishlist-item">
                                            <img src={item.image} alt={item.name} className="wishlist-image" />
                                            <div className="wishlist-info">
                                                <h4>{item.name}</h4>
                                                <p className="wishlist-price">${item.price.toFixed(2)}</p>
                                                {!item.inStock && <span className="out-of-stock">Out of Stock</span>}
                                            </div>
                                            <div className="wishlist-actions">
                                                <button
                                                    className="btn btn-primary btn-sm"
                                                    onClick={() => moveToCart(item)}
                                                    disabled={!item.inStock}
                                                >
                                                    Add to Cart
                                                </button>
                                                <button
                                                    className="btn btn-secondary btn-sm"
                                                    onClick={() => removeFromWishlist(item.id)}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="empty-state">
                                    <p>Your wishlist is empty.</p>
                                    <button className="btn btn-primary" onClick={() => window.location.href = "/products"}>
                                        Start Shopping
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Addresses */}
                    {activeTab === "addresses" && (
                        <div className="profile-addresses">
                            <div className="addresses-header">
                                <h2>My Addresses</h2>
                                <button className="btn btn-primary" onClick={() => { setShowAddressForm(true); setEditingAddress(null); setNewAddress({ firstName: "", lastName: "", street: "", city: "", state: "", zip: "", country: "", phone: "", isDefault: false }); }}>
                                    + Add New Address
                                </button>
                            </div>

                            {showAddressForm && (
                                <div className="address-form">
                                    <h3>{editingAddress ? "Edit Address" : "Add New Address"}</h3>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Street Address *</label>
                                            <input type="text" name="street" value={newAddress.street} onChange={handleAddressChange} className="input" />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>City *</label>
                                            <input type="text" name="city" value={newAddress.city} onChange={handleAddressChange} className="input" />
                                        </div>
                                        <div className="form-group">
                                            <label>State</label>
                                            <input type="text" name="state" value={newAddress.state} onChange={handleAddressChange} className="input" />
                                        </div>
                                        <div className="form-group">
                                            <label>ZIP Code *</label>
                                            <input type="text" name="zip" value={newAddress.zip} onChange={handleAddressChange} className="input" />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Country</label>
                                            <input type="text" name="country" value={newAddress.country} onChange={handleAddressChange} className="input" placeholder="USA" />
                                        </div>
                                        <div className="form-group">
                                            <label>Phone Number</label>
                                            <input type="text" name="phone" value={newAddress.phone} onChange={handleAddressChange} className="input" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="checkbox-label">
                                            <input type="checkbox" name="isDefault" checked={newAddress.isDefault} onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })} />
                                            Set as default address
                                        </label>
                                    </div>
                                    <div className="form-actions">
                                        <button className="btn btn-primary" onClick={editingAddress ? updateAddress : addAddress}>
                                            {editingAddress ? "Update Address" : "Save Address"}
                                        </button>
                                        <button className="btn btn-secondary" onClick={() => { setShowAddressForm(false); setEditingAddress(null); }}>Cancel</button>
                                    </div>
                                </div>
                            )}

                            <div className="addresses-grid">
                                {addresses.map(addr => (
                                    <div key={addr.id} className={`address-card ${addr.isDefault ? 'default' : ''}`}>
                                        {addr.isDefault && <span className="default-badge">Default</span>}
                                        <div className="address-details">
                                            <p><strong>{addr.firstName} {addr.lastName}</strong></p>
                                            <p>{addr.street}</p>
                                            <p>{addr.city}, {addr.state} {addr.zip}</p>
                                            <p>{addr.country}</p>
                                            <p>{addr.phone}</p>
                                        </div>
                                        <div className="address-actions">
                                            <button className="btn-link" onClick={() => editAddress(addr)}>Edit</button>
                                            <button className="btn-link text-danger" onClick={() => deleteAddress(addr.id)}>Delete</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;