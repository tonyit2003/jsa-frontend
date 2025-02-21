import { useState } from "react";
import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    Box,
    Typography
} from "@mui/material";
import {
    AccountCircle,
    Assignment,
    Work,
    Favorite,
    Notifications,
    Help,
    Business,
    ExpandLess,
    ExpandMore
} from "@mui/icons-material";

function Sidebar() {
    const [openSubMenu, setOpenSubMenu] = useState({
        account: false,
        profile: false,
        jobs: false,
        employers: false,
        support: false,
    });

    const toggleSubMenu = (menu) => {
        setOpenSubMenu((prev) => ({ ...prev, [menu]: !prev[menu] }));
    };

    return (
        <Drawer
            anchor="left"
            variant="permanent" // Luôn hiển thị sidebar
            sx={{
                "& .MuiDrawer-paper": { width: 280, backgroundColor: "#1e88e5", color: "white" }
            }}
        >
            <Box sx={{ padding: 2, textAlign: "center" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Tìm việc online
                </Typography>
            </Box>

            <List>
                {/* Quản lý tài khoản */}
                <ListItemButton onClick={() => toggleSubMenu("account")}>
                    <ListItemIcon>
                        <AccountCircle sx={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText primary="Quản lý tài khoản" />
                    {openSubMenu.account ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openSubMenu.account} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemText primary="Tài khoản của bạn" />
                        </ListItemButton>
                    </List>
                </Collapse>

                {/* Quản lý hồ sơ */}
                <ListItemButton onClick={() => toggleSubMenu("profile")}>
                    <ListItemIcon>
                        <Assignment sx={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText primary="Quản lý hồ sơ" />
                    {openSubMenu.profile ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openSubMenu.profile} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemText primary="Hồ sơ của bạn" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemText primary="Trang trí CV" />
                        </ListItemButton>
                    </List>
                </Collapse>

                {/* Quản lý việc làm */}
                <ListItemButton onClick={() => toggleSubMenu("jobs")}>
                    <ListItemIcon>
                        <Work sx={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText primary="Quản lý việc làm" />
                    {openSubMenu.jobs ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openSubMenu.jobs} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <Work sx={{ color: "white" }} />
                            </ListItemIcon>
                            <ListItemText primary="Việc làm đã ứng tuyển" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <Favorite sx={{ color: "white" }} />
                            </ListItemIcon>
                            <ListItemText primary="Việc làm đã lưu" />
                        </ListItemButton>
                    </List>
                </Collapse>

                {/* Nhà tuyển dụng quan tâm */}
                <ListItemButton onClick={() => toggleSubMenu("employers")}>
                    <ListItemIcon>
                        <Business sx={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText primary="Nhà tuyển dụng bạn quan tâm" />
                    {openSubMenu.employers ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openSubMenu.employers} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemText primary="Nhà tuyển dụng xem hồ sơ bạn" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemText primary="Nhà tuyển dụng đang theo dõi" />
                        </ListItemButton>
                    </List>
                </Collapse>

                {/* Hỗ trợ và thông báo */}
                <ListItemButton onClick={() => toggleSubMenu("support")}>
                    <ListItemIcon>
                        <Help sx={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText primary="Hỗ trợ và thông báo" />
                    {openSubMenu.support ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openSubMenu.support} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <Notifications sx={{ color: "white" }} />
                            </ListItemIcon>
                            <ListItemText primary="Việc làm 24h thông báo" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemText primary="Hướng dẫn sử dụng" />
                        </ListItemButton>
                    </List>
                </Collapse>
            </List>
        </Drawer>

    );
}

export default Sidebar;
