import * as React from "react";
import { Typography, Paper, Card, CardContent, Stack, Avatar, Box, Button } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MoneyIcon from "@mui/icons-material/AttachMoney";
import { browserJobPost, getInfoJobPostById } from "~/services/JobPostService";
import { useNavigate, useParams } from "react-router-dom";
import config from "~/config";

export default function JobPostDetails() {
    const { id } = useParams(); // Lấy ID bài tuyển dụng từ URL
    const [jobPost, setJobPost] = React.useState(null);

    const navigate = useNavigate();

    // Gọi API lấy thông tin bài tuyển dụng
    React.useEffect(() => {
        if (id) {
            fetchJobPost();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const fetchJobPost = async () => {
        try {
            const res = await getInfoJobPostById(id);
            if (res && res.data) {
                setJobPost(res.data);
            }
        } catch (error) {
            console.error("Lỗi khi lấy bài tuyển dụng:", error);
        }
    };

    if (!jobPost) return <Typography>Đang tải dữ liệu...</Typography>;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isConfirmed = window.confirm("Bạn có chắc chắn muốn duyệt bài tuyển dụng này?");
        if (!isConfirmed) return; // Nếu người dùng chọn "Hủy", dừng xử lý

        try {
            await browserJobPost(id, 'approved');
            alert("Duyệt bài tuyển dụng thành công!");
            navigate(config.routes.jobPost);
        } catch (error) {
            console.log("Lỗi duyệt bài:", error);
        }
    };

    const handleCancel = async (e) => {
        e.preventDefault();
        try {
            await browserJobPost(id, 'rejected');
            alert("Từ chối bài tuyển dụng thành công!");
            navigate(config.routes.jobPost);
        } catch (error) {
            console.log("Lỗi từ chối bài:", error);
        }
    }

    return (
        <Paper elevation={4} sx={{ padding: "24px", borderRadius: "12px", maxWidth: "1200px", margin: "auto" }}>
            <Stack spacing={3}>
                {/* Tiêu đề công việc */}
                <Typography variant="h4" fontWeight="bold" color="primary">
                    {jobPost.job_title}
                </Typography>

                {/* Thông tin công ty */}
                <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar sx={{ bgcolor: "primary.main", width: 50, height: 50 }}>
                        <WorkIcon fontSize="large" />
                    </Avatar>
                    <Typography variant="h6">Công ty/Doanh nghiệp: {jobPost.recruiters.company_name}</Typography>
                </Stack>

                {/* Thông tin chính */}
                <Card variant="outlined">
                    <CardContent>
                        <Stack spacing={2}>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <LocationOnIcon color="action" />
                                <Typography variant="body1">Địa chỉ: {jobPost.job_location}</Typography>
                            </Stack>

                            <Stack direction="row" spacing={1} alignItems="center">
                                <MoneyIcon color="action" />
                                <Typography variant="body1">
                                    Lương: {new Intl.NumberFormat("vi-VN").format(jobPost.salary_range)} đ
                                </Typography>
                            </Stack>

                            {/* Loại công việc */}
                            <Box
                                sx={{
                                    display: "inline-block",
                                    backgroundColor: getJobTypeColor(jobPost.job_type),
                                    color: "#ff0017",
                                    fontWeight: "bold",
                                    borderRadius: "16px",
                                    fontSize: "0.875rem",
                                }}
                            >
                                Loại công việc:  {getJobTypeLabel(jobPost.job_type)}
                            </Box>

                        </Stack>
                    </CardContent>
                </Card>

                {/* Mô tả công việc */}
                <Paper sx={{ padding: "16px", backgroundColor: "#f9f9f9" }}>
                    <Typography variant="h6" fontWeight="bold">Mô tả công việc</Typography>
                    <Typography dangerouslySetInnerHTML={{ __html: jobPost.job_description }} />
                </Paper>

                {/* Yêu cầu công việc */}
                <Paper sx={{ padding: "16px", backgroundColor: "#f9f9f9" }}>
                    <Typography variant="h6" fontWeight="bold">Yêu cầu công việc</Typography>
                    <Typography dangerouslySetInnerHTML={{ __html: jobPost.job_requirements }} />
                </Paper>
            </Stack>
            <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "12px" }}>
                <Button
                    onClick={handleCancel}
                    variant="contained"
                    color="error"
                    sx={{
                        marginRight: "12px", // Tạo khoảng cách với nút bên cạnh
                        borderRadius: "8px",
                        fontWeight: "bold",
                        padding: "12px",
                        backgroundColor: "#2e7d32",
                        "&:hover": { backgroundColor: "#b71c1c" },
                    }}
                >
                    Hủy bài
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    sx={{
                        borderRadius: "8px",
                        fontWeight: "bold",
                        padding: "12px",
                        backgroundColor: "#d32f2f",
                        "&:hover": { backgroundColor: "#1d80e3" },
                    }}
                >
                    Duyệt bài
                </Button>
            </Box>
        </Paper >
    );
}

// Hàm đổi loại công việc sang tiếng Việt
const getJobTypeLabel = (type) => {
    switch (type) {
        case "full-time": return "Toàn thời gian";
        case "part-time": return "Bán thời gian";
        case "contract": return "Hợp đồng";
        case "internship": return "Thực tập";
        default: return "Không xác định";
    }
};

// Màu sắc cho từng loại công việc
const getJobTypeColor = (type) => {
    switch (type) {
        case "full-time": return "success";
        case "part-time": return "warning";
        case "contract": return "info";
        case "internship": return "primary";
        default: return "default";
    }
};
