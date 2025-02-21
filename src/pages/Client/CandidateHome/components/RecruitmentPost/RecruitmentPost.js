import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    styled,
} from "@mui/material";
import {
    Apartment,
    LocationOnOutlined,
    MonetizationOnOutlined,
} from "@mui/icons-material";

import { formatNumber } from "~/utils/helper";
import { useNavigate } from "react-router-dom";

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

const RecruitmentPost = ({
    jobPostId,
    titleJob,
    companyName,
    salary,
    address,
}) => {
    const navigate = useNavigate();

    const handleRegister = () => {
        navigate(`/job-post-detail/${jobPostId}`);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <StyledCard>
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                        variant="h5"
                        component="h2"
                        gutterBottom
                        sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {titleJob}
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 1,
                        }}
                    >
                        <Apartment style={{ marginRight: "8px" }} />
                        <Typography
                            variant="body2"
                            sx={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {companyName}
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
                        <Typography variant="body2">{salary}</Typography>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 2,
                        }}
                    >
                        <LocationOnOutlined style={{ marginRight: "8px" }} />
                        <Typography variant="body2">{address}</Typography>
                    </Box>

                    <StyledButton fullWidth onClick={() => handleRegister()}>
                        Xem chi tiết
                    </StyledButton>
                </CardContent>
            </StyledCard>
        </Box>
    );
};

export default RecruitmentPost;
