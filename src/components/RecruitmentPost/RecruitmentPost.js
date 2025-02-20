import React, { useState, useEffect } from "react";
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Grid,
    CircularProgress,
    styled,
} from "@mui/material";
import { FaMapMarkerAlt, FaClock, FaCalendarAlt } from "react-icons/fa";
import {
    Apartment,
    LocationOnOutlined,
    MonetizationOnOutlined,
} from "@mui/icons-material";

const StyledCard = styled(Card)(({ theme }) => ({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
        transform: "scale(1.02)",
    },
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
}));

const StyledButton = styled(Button)(({ theme }) => ({
    background:
        "linear-gradient(45deg,rgb(107, 153, 254) 30%,rgb(83, 97, 255) 90%)",
    border: 0,
    borderRadius: "20px",
    boxShadow: "0 3px 5px 2px rgba(36, 111, 204, 0.3)",
    color: "white",
    height: 48,
    padding: "0 30px",
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
        transform: "scale(1.05)",
    },
}));

const RecruitmentPost = () => {
    const [loading, setLoading] = useState({});

    const handleRegister = async (eventId) => {
        setLoading((prev) => ({ ...prev, [eventId]: true }));
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading((prev) => ({ ...prev, [eventId]: false }));
    };

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <StyledCard>
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Nhân Viên Thương Mại Điện Tử (E-Commerce)
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 1,
                        }}
                    >
                        <Apartment style={{ marginRight: "8px" }} />
                        <Typography variant="body2">
                            Công Ty TNHH Đồ Gỗ Nghĩa Sơn
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 1,
                        }}
                    >
                        <MonetizationOnOutlined
                            style={{ marginRight: "8px" }}
                        />
                        <Typography variant="body2">12.000.000</Typography>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 2,
                        }}
                    >
                        <LocationOnOutlined style={{ marginRight: "8px" }} />
                        <Typography variant="body2">Đồng Nai</Typography>
                    </Box>

                    <StyledButton
                        fullWidth
                        // onClick={() => handleRegister(event.id)}
                        // disabled={loading[event.id]}
                        // aria-label={`Register for ${event.name}`}
                    >
                        {/* {loading[event.id] ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                "Register Now"
                            )} */}
                        Đăng ký ngay
                    </StyledButton>
                </CardContent>
            </StyledCard>
        </Box>
    );
};

export default RecruitmentPost;
