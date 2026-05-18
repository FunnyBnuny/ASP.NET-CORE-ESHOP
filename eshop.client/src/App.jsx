import "./app.css";
import { useState } from "react";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import HomePage from "./pages/index";
import ProductsPage from "./pages/Products";
import LoginPage from "./pages/Login";

function App() {
    const [currentPage, setCurrentPage] = useState("home");

    const navigateTo = (page) => {
        setCurrentPage(page);
    };
    /* pages */
    const renderPage = () => {
        switch (currentPage) {
            case "home":
                return <HomePage />;
            case "products":
                return <ProductsPage />;
            case "login":
                return <LoginPage />;
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