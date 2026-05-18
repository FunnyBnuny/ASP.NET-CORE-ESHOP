import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MoreIcon from '@mui/icons-material/MoreVert';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.05),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.1),
    },
    marginRight: theme.spacing(2),
    // Search bar width
    width: '100%',
    [theme.breakpoints.up('md')]: {
        width: 'auto',
        minWidth: '300px',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'black',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
    },
}));

function PrimarySearchAppBar({ navigateTo }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [shopAnchorEl, setShopAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const isShopMenuOpen = Boolean(shopAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleShopMenuOpen = (event) => {
        setShopAnchorEl(event.currentTarget);
    };

    const handleShopMenuClose = () => {
        setShopAnchorEl(null);
    };

    // Navigation
    const handleLogoClick = () => navigateTo("home");
    const handleAllProducts = () => navigateTo("products");

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>My Profile</MenuItem>
        </Menu>
    );
    /*menu shi*/
    const shopMenuId = 'shop-dropdown-menu';
    const renderShopMenu = (
        <Menu
            anchorEl={shopAnchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            id={shopMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            open={isShopMenuOpen}
            onClose={handleShopMenuClose}
        >
            <MenuItem onClick={handleAllProducts}>All Products</MenuItem>
            <MenuItem onClick={handleShopMenuClose}>Men's Apparel</MenuItem>
            <MenuItem onClick={handleShopMenuClose}>Women's Apparel</MenuItem>
            <MenuItem onClick={handleShopMenuClose}>Accessories</MenuItem>
        </Menu>
    );

    /* Main buttons */
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={handleShopMenuOpen}>
                <Typography sx={{ mr: 1 }}>Shop</Typography>
                <ExpandMoreIcon />
            </MenuItem>
            <MenuItem onClick={handleMobileMenuClose}>On Sale</MenuItem>
            <MenuItem onClick={handleMobileMenuClose}>New Arrivals</MenuItem>
            <MenuItem onClick={handleMobileMenuClose}>Brands</MenuItem>
            <MenuItem>
                <IconButton size="large" aria-label="show cart items" color="inherit">
                    <Badge badgeContent={0} color="error">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
                <p>Cart</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton size="large" aria-label="account of current user" color="inherit">
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
                sx={{
                    backgroundColor: 'white',
                    color: 'black',
                    boxShadow: 'none',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                }}
            >
                <Toolbar sx={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'space-between' }}>
                    {/* LEFT SECTION: Logo + nav buttons */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0 }}>
                        {/* Sizing of the logo logo & on click */}
                        <Typography
                            variant="h5"
                            noWrap
                            component="div"
                            onClick={handleLogoClick}
                            sx={{
                                fontWeight: 800,
                                cursor: 'pointer',
                                letterSpacing: '-0.5px',
                                whiteSpace: 'nowrap',
                                fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' },
                                '&:hover': { opacity: 0.8 },
                            }}
                        >
                            SHOP.CO
                        </Typography>

                        {/* Desktop Navigation Buttons */}
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
                            <Button color="inherit" endIcon={<ExpandMoreIcon />} onClick={handleShopMenuOpen} sx={{ fontWeight: 500, whiteSpace: 'nowrap' }}>
                                Shop
                            </Button>
                            <Button color="inherit" sx={{ fontWeight: 500, whiteSpace: 'nowrap' }}>
                                On Sale
                            </Button>
                            <Button color="inherit" sx={{ fontWeight: 500, whiteSpace: 'nowrap' }}>
                                New Arrivals
                            </Button>
                            <Button color="inherit" sx={{ fontWeight: 500, whiteSpace: 'nowrap' }}>
                                Brands
                            </Button>
                        </Box>
                    </Box>

                    {/* RIGHT SECTION: Search + Icons */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase placeholder="Search for products..." inputProps={{ 'aria-label': 'search' }} />
                        </Search>

                        {/* Desktop Icons */}
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                            <IconButton size="large" aria-label="show cart items" color="inherit">
                                <Badge badgeContent={0} color="error">
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </Box>

                        {/* Mobile Menu Icon */}
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
            {renderShopMenu}
        </Box>
    );
}

export default PrimarySearchAppBar;