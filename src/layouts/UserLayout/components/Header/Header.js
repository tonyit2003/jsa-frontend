import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    useTheme,
    useMediaQuery,
    Box,
    Container,
} from "@mui/material";
import { styled } from "@mui/system";
import { FaBars } from "react-icons/fa";
import { blue } from "@mui/material/colors";

import { logo } from "~/assets/Images";
import { Login as LoginIcon } from "@mui/icons-material";

const navItems = ["Menu", "About Us", "Locations", "Events", "Contact"];

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
}));

const LogoImage = styled("img")({
    height: "60px",
    cursor: "pointer",
    objectFit: "fill",
});

const NavLink = styled(Typography)(({ theme }) => ({
    margin: "0 16px",
    cursor: "pointer",
    color: "#333333",
    fontWeight: 500,
    "&:hover": {
        color: blue[600],
        transition: "color 0.3s ease",
    },
}));

const ReservationButton = styled(Button)(({ theme }) => ({
    backgroundColor: blue[600],
    color: "#ffffff",
    padding: "8px 24px",
    "&:hover": {
        backgroundColor: blue[800],
        transform: "translateY(-2px)",
        transition: "all 0.3s ease",
    },
}));

function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <List>
            {navItems.map((item) => (
                <ListItem
                    sx={{
                        "&:hover": {
                            backgroundColor: "#f5f5f5",
                            cursor: "pointer",
                        },
                    }}
                    key={item}
                >
                    <ListItemText
                        primary={item}
                        primaryTypographyProps={{
                            style: { color: "#333333", fontWeight: 500 },
                        }}
                    />
                </ListItem>
            ))}
            <ListItem>
                <ReservationButton
                    variant="contained"
                    startIcon={<LoginIcon />}
                    fullWidth
                >
                    Đăng nhập
                </ReservationButton>
            </ListItem>
        </List>
    );

    return (
        <StyledAppBar position="fixed">
            <Container>
                <Toolbar disableGutters>
                    {/* Logo */}
                    <LogoImage src={logo} alt="Restaurant Logo" />

                    {isMobile ? (
                        <>
                            <Box sx={{ flexGrow: 1 }} />
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                sx={{ color: "#333333" }}
                            >
                                <FaBars />
                            </IconButton>
                            <Drawer
                                variant="temporary"
                                anchor="right"
                                open={mobileOpen}
                                onClose={handleDrawerToggle}
                                ModalProps={{
                                    keepMounted: true,
                                }}
                            >
                                {drawer}
                            </Drawer>
                        </>
                    ) : (
                        <>
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                {navItems.map((item) => (
                                    <NavLink
                                        variant="body1"
                                        key={item}
                                        role="button"
                                        tabIndex={0}
                                        aria-label={item}
                                    >
                                        {item}
                                    </NavLink>
                                ))}
                            </Box>
                            <ReservationButton
                                variant="contained"
                                startIcon={<LoginIcon />}
                            >
                                Đăng nhập
                            </ReservationButton>
                        </>
                    )}
                </Toolbar>
            </Container>
        </StyledAppBar>
    );
}

export default Header;
