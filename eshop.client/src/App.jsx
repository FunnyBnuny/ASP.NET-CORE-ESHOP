import "./app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import HomePage from "./pages/index";   //  correct path
import LoginPage from "./pages/Login";  // if you have one

function App() {
    return (
        <BrowserRouter>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <NavBar />
                <div style={{ flex: 1 }}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        {/* Add other routes later */}
                    </Routes>
                </div>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;