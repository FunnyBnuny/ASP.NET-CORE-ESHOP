import { useState } from "react";

function AdminPage() {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [products, setProducts] = useState([
        { id: 1, name: "Classic White T-Shirt", price: 29.99, stock: 50, category: "Men", status: "active" },
        { id: 2, name: "Black Premium Hoodie", price: 79.99, stock: 35, category: "Men", status: "active" },
        { id: 3, name: "Floral Summer Dress", price: 69.99, stock: 25, category: "Women", status: "active" },
        { id: 4, name: "Wool Coat", price: 159.99, stock: 15, category: "Women", status: "active" },
    ]);

    const [orders, setOrders] = useState([
        { id: "ORD-001", customer: "John Doe", date: "2024-01-15", total: 89.99, status: "delivered" },
        { id: "ORD-002", customer: "Jane Smith", date: "2024-02-20", total: 159.99, status: "shipped" },
        { id: "ORD-003", customer: "Mike Johnson", date: "2024-03-10", total: 49.99, status: "processing" },
    ]);

    const [users] = useState([
        { id: 1, name: "John Doe", email: "john@example.com", role: "customer", registered: "2024-01-10" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", role: "customer", registered: "2024-02-15" },
        { id: 3, name: "Admin User", email: "admin@example.com", role: "admin", registered: "2024-01-01" },
    ]);

    const [showProductForm, setShowProductForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [productForm, setProductForm] = useState({ name: "", price: "", stock: "", category: "Men", status: "active" });

    const stats = {
        totalProducts: products.length,
        totalOrders: orders.length,
        totalUsers: users.length,
        revenue: orders.reduce((sum, o) => sum + o.total, 0),
    };

    const handleProductSubmit = () => {
        if (editingProduct) {
            setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...productForm, price: parseFloat(productForm.price), stock: parseInt(productForm.stock) } : p));
        } else {
            const newProduct = { ...productForm, id: Date.now(), price: parseFloat(productForm.price), stock: parseInt(productForm.stock) };
            setProducts([...products, newProduct]);
        }
        setShowProductForm(false);
        setEditingProduct(null);
        setProductForm({ name: "", price: "", stock: "", category: "Men", status: "active" });
    };

    const deleteProduct = (id) => {
        if (confirm("Are you sure you want to delete this product?")) {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    const updateOrderStatus = (orderId, newStatus) => {
        setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    };

    return (
        <div className="container">
            <div className="breadcrumb">
                <span className="breadcrumb-home">Home</span>
                <span className="separator">&gt;</span>
                <span className="current">Admin Panel</span>
            </div>

            <div className="admin-layout">
                <div className="admin-sidebar">
                    <div className="admin-avatar">
                        <div className="admin-avatar-circle">A</div>
                        <h3>Admin User</h3>
                        <p>Administrator</p>
                    </div>
                    <nav className="admin-nav">
                        <button className={`admin-nav-btn ${activeTab === "dashboard" ? "active" : ""}`} onClick={() => setActiveTab("dashboard")}>Dashboard</button>
                        <button className={`admin-nav-btn ${activeTab === "products" ? "active" : ""}`} onClick={() => setActiveTab("products")}>Products</button>
                        <button className={`admin-nav-btn ${activeTab === "orders" ? "active" : ""}`} onClick={() => setActiveTab("orders")}>Orders</button>
                        <button className={`admin-nav-btn ${activeTab === "users" ? "active" : ""}`} onClick={() => setActiveTab("users")}>Users</button>
                        <button className={`admin-nav-btn ${activeTab === "settings" ? "active" : ""}`} onClick={() => setActiveTab("settings")}>Settings</button>
                    </nav>
                </div>

                <div className="admin-content">
                    {activeTab === "dashboard" && (
                        <div className="admin-dashboard">
                            <h2>Dashboard</h2>
                            <div className="stats-grid">
                                <div className="stat-card"><span className="stat-number">{stats.totalProducts}</span><span className="stat-label">Products</span></div>
                                <div className="stat-card"><span className="stat-number">{stats.totalOrders}</span><span className="stat-label">Orders</span></div>
                                <div className="stat-card"><span className="stat-number">{stats.totalUsers}</span><span className="stat-label">Users</span></div>
                                <div className="stat-card"><span className="stat-number">${stats.revenue.toFixed(2)}</span><span className="stat-label">Revenue</span></div>
                            </div>
                            <div className="recent-orders">
                                <h3>Recent Orders</h3>
                                <div className="orders-table">
                                    <table>
                                        <thead>
                                        <tr>
                                            <th>Order ID</th>
                                            <th>Customer</th>
                                            <th>Date</th>
                                            <th>Total</th>
                                            <th>Status</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {orders.slice(0, 5).map(order => (
                                            <tr key={order.id}>
                                                <td>{order.id}</td>
                                                <td>{order.customer}</td>
                                                <td>{order.date}</td>
                                                <td>${order.total.toFixed(2)}</td>
                                                <td><span className={`status-${order.status}`}>{order.status}</span></td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "products" && (
                        <div className="admin-products">
                            <div className="admin-header">
                                <h2>Products</h2>
                                <button className="btn btn-primary" onClick={() => { setShowProductForm(true); setEditingProduct(null); setProductForm({ name: "", price: "", stock: "", category: "Men", status: "active" }); }}>+ Add Product</button>
                            </div>
                            {showProductForm && (
                                <div className="product-form">
                                    <h3>{editingProduct ? "Edit Product" : "Add New Product"}</h3>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Product Name</label>
                                            <input type="text" value={productForm.name} onChange={(e) => setProductForm({ ...productForm, name: e.target.value })} className="input" />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Price ($)</label>
                                            <input type="number" value={productForm.price} onChange={(e) => setProductForm({ ...productForm, price: e.target.value })} className="input" />
                                        </div>
                                        <div className="form-group">
                                            <label>Stock</label>
                                            <input type="number" value={productForm.stock} onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })} className="input" />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Category</label>
                                            <select value={productForm.category} onChange={(e) => setProductForm({ ...productForm, category: e.target.value })} className="input">
                                                <option>Men</option>
                                                <option>Women</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Status</label>
                                            <select value={productForm.status} onChange={(e) => setProductForm({ ...productForm, status: e.target.value })} className="input">
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-actions">
                                        <button className="btn btn-primary" onClick={handleProductSubmit}>{editingProduct ? "Update" : "Save"}</button>
                                        <button className="btn btn-secondary" onClick={() => setShowProductForm(false)}>Cancel</button>
                                    </div>
                                </div>
                            )}
                            <div className="products-table">
                                <table>
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Stock</th>
                                        <th>Category</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {products.map(p => (
                                        <tr key={p.id}>
                                            <td>{p.id}</td>
                                            <td>{p.name}</td>
                                            <td>${p.price.toFixed(2)}</td>
                                            <td>{p.stock}</td>
                                            <td>{p.category}</td>
                                            <td><span className={`status-${p.status}`}>{p.status}</span></td>
                                            <td>
                                                <button className="btn-link" onClick={() => { setEditingProduct(p); setProductForm(p); setShowProductForm(true); }}>Edit</button>
                                                <button className="btn-link text-danger" onClick={() => deleteProduct(p.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === "orders" && (
                        <div className="admin-orders">
                            <h2>Orders</h2>
                            <div className="orders-table">
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Customer</th>
                                        <th>Date</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {orders.map(o => (
                                        <tr key={o.id}>
                                            <td>{o.id}</td>
                                            <td>{o.customer}</td>
                                            <td>{o.date}</td>
                                            <td>${o.total.toFixed(2)}</td>
                                            <td>
                                                <select value={o.status} onChange={(e) => updateOrderStatus(o.id, e.target.value)} className="status-select">
                                                    <option value="processing">Processing</option>
                                                    <option value="shipped">Shipped</option>
                                                    <option value="delivered">Delivered</option>
                                                </select>
                                            </td>
                                            <td><button className="btn-link">View</button></td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === "users" && (
                        <div className="admin-users">
                            <h2>Users</h2>
                            <div className="users-table">
                                <table>
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Registered</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {users.map(u => (
                                        <tr key={u.id}>
                                            <td>{u.id}</td>
                                            <td>{u.name}</td>
                                            <td>{u.email}</td>
                                            <td><span className={`role-${u.role}`}>{u.role}</span></td>
                                            <td>{u.registered}</td>
                                            <td>
                                                <button className="btn-link">Edit</button>
                                                <button className="btn-link text-danger">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === "settings" && (
                        <div className="admin-settings">
                            <h2>Settings</h2>
                            <div className="settings-form">
                                <div className="form-group">
                                    <label>Store Name</label>
                                    <input type="text" defaultValue="SHOP.CO" className="input" />
                                </div>
                                <div className="form-group">
                                    <label>Store Email</label>
                                    <input type="email" defaultValue="info@shop.co" className="input" />
                                </div>
                                <div className="form-group">
                                    <label>Currency</label>
                                    <select className="input">
                                        <option>USD ($)</option>
                                        <option>EUR (€)</option>
                                        <option>CZK (Kč)</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Tax Rate (%)</label>
                                    <input type="number" defaultValue="21" className="input" />
                                </div>
                                <button className="btn btn-primary">Save Settings</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminPage;