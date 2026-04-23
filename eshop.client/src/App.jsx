import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import "./app.css";


import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";


import Index from "./pages/index";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Index/>,
    },
]);
function App() {
    return (
        <>
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Eshop
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
            </AppBar>
            <RouterProvider router={router} />
        </>
    );
}

export default App;