import "./app.css";
import "../Components/NavBar"

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import Index from "./pages/index";
import NavBar from "../Components/NavBar";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Index/>,
    },
]);

function App() {
    return (
        <>
            <NavBar />
            <RouterProvider router={router} />
        </>
    );
}

export default App;