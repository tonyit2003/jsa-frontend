import React, { useContext, useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { Login as LoginIcon } from "@mui/icons-material";

import { logo } from "~/assets/Images";
import config from "~/config";
import { UserContext } from "~/context/UserProvider";
import { logoutUser } from "~/services/UserService";
import userType from "~/constants/userType";
import useToken from "~/hooks/useToken";

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
    textTransform: "none",
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
    const navigate = useNavigate();
    const tokenStorage = useToken();

    // eslint-disable-next-line no-unused-vars
    const { auth, setAuth } = useContext(UserContext);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const redirectLogin = () => {
        navigate(config.routes.login);
    };

    const redirectHome = () => {
        navigate(config.routes.home);
    };

    const redirectAccount = (id) => {
        if (!auth.isAuth || auth.user_type !== userType.CANDIDATE) {
            navigate(config.routes.login);
        } else {
            navigate(config.routes.info);
        }
    };

    const handleLogout = async () => {
        const token = auth.token;
        if (!token) {
            return;
        }
        try {
            const res = await logoutUser(token);
            if (res.status && res.status === "success") {
                setAuth({
                    isAuth: false,
                    full_name: "",
                    email: "",
                    phone_number: "",
                    user_type: "",
                });
                localStorage.removeItem(process.env.REACT_APP_AUTH_TOKEN_KEY);
                navigate(config.routes.login);
            }
        } catch (error) {
            console.log(error);
        }
    };

    let navItems = [
        {
            text: "Trang chủ",
            onClick: redirectHome,
        },
        {
            text: "Tài khoản",
            onClick: redirectAccount,
        },
    ];

    if (auth.isAuth) {
        navItems = [...navItems, { text: "Đăng xuất", onClick: handleLogout }];
    }

    useEffect(() => {
        if (!tokenStorage && auth.isAuth && auth.token) {
            handleLogout();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tokenStorage]);

    const drawer = (
        <List>
            {navItems.map((item, index) => (
                <ListItem
                    sx={{
                        "&:hover": {
                            backgroundColor: "#f5f5f5",
                            cursor: "pointer",
                        },
                    }}
                    key={index}
                >
                    <ListItemText
                        primary={item.text}
                        primaryTypographyProps={{
                            style: { color: "#333333", fontWeight: 500 },
                        }}
                        onClick={() => {
                            item.onClick();
                        }}
                    />
                </ListItem>
            ))}
            <ListItem>
                {auth.isAuth ? (
                    <ReservationButton variant="p" onClick={() => {}}>
                        {auth.email}
                    </ReservationButton>
                ) : (
                    <ReservationButton
                        variant="contained"
                        startIcon={<LoginIcon />}
                        fullWidth
                        onClick={redirectLogin}
                    >
                        Đăng nhập
                    </ReservationButton>
                )}
            </ListItem>
        </List>
    );

    return (
        <StyledAppBar position="fixed">
            <Container>
                <Toolbar disableGutters>
                    {/* Logo */}
                    <LogoImage
                        onClick={redirectHome}
                        src={logo}
                        alt="Restaurant Logo"
                    />

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
                                {navItems.map((item, index) => (
                                    <NavLink
                                        variant="body1"
                                        key={index}
                                        role="button"
                                        tabIndex={0}
                                        aria-label={item}
                                        onClick={() => {
                                            item.onClick();
                                        }}
                                    >
                                        {item.text}
                                    </NavLink>
                                ))}
                            </Box>
                            {auth.isAuth ? (
                                <ReservationButton
                                    variant="p"
                                    onClick={() => {}}
                                >
                                    {auth.email}
                                </ReservationButton>
                            ) : (
                                <ReservationButton
                                    variant="contained"
                                    startIcon={<LoginIcon />}
                                    onClick={redirectLogin}
                                >
                                    Đăng nhập
                                </ReservationButton>
                            )}
                        </>
                    )}
                </Toolbar>
            </Container>
        </StyledAppBar>
    );
}

export default Header;
