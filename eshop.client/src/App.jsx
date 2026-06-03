import "./app.css";
import { useState } from "react";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import HomePage from "./pages/index.jsx";
import ProductsPage from "./pages/Products.jsx";
import LoginPage from "./pages/Login";
import ProfilePage from "./pages/Profile.jsx";

function App() {
    const [currentPage, setCurrentPage] = useState("home");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [userName, setUserName] = useState(localStorage.getItem("loggedInUser") || "");
    const [userEmail, setUserEmail] = useState(localStorage.getItem("loggedInUserEmail") || "");

    const navigateTo = (page, category = null) => {
        setCurrentPage(page);
        setSelectedCategory(category);
    };

    const handleUpdateProfile = (firstName, lastName, email) => {
        const fullName = `${firstName} ${lastName}`;
        setUserName(fullName);
        setUserEmail(email);
        localStorage.setItem("loggedInUser", fullName);
        localStorage.setItem("loggedInUserEmail", email);
    };

    const handleLogout = () => {
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("loggedInUserEmail");
        localStorage.removeItem("rememberedUser");
        setUserName("");
        setUserEmail("");
        setCurrentPage("home");
    };

    const renderPage = () => {
        switch (currentPage) {
            case "home":
                return <HomePage />;
            case "products":
                return <ProductsPage initialCategory={selectedCategory} />;
            case "login":
                return <LoginPage />;
            case "profile":
                return <ProfilePage
                    userName={userName}
                    userEmail={userEmail}
                    onUpdateProfile={handleUpdateProfile}
                    onLogout={handleLogout}
                />;
            default:
                return <HomePage />;
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <NavBar navigateTo={navigateTo} />
            <div style={{ flex: 1 }}>
                {renderPage()}
            </div>
            <Footer />
        </div>
    );
}

export default App;