import "./app.css";
import "../Components/NavBar";
import "../Components/Footer";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Index from "./pages/Products";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Index />,
    },
]);

function App() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <NavBar />
            <div style={{ flex: 1 }}>
                <RouterProvider router={router} />
            </div>
            <Footer />
        </div>
    );
}

export default App;
