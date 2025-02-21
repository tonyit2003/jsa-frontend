import {
    CalendarMonthOutlined,
    ComputerOutlined,
    FmdGood,
    MonetizationOn,
    WorkHistoryOutlined,
} from "@mui/icons-material";
import { Avatar, Box, Button, Container, Grid2, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { defaultImage } from "~/assets/Images";
import jobTypeList from "~/constants/jobTypeList";
import { getJobPostDetail } from "~/services/JobPostService";
import { formatISODate } from "~/utils/helper";

function JobPostDetail() {
    const { jobPostId } = useParams();

    const [job, setJob] = useState({});

    const getJob = async () => {
        try {
            const res = await getJobPostDetail(jobPostId);
            if (res.status === "success" && res.data) {
                setJob(res.data);
            }
        } catch (error) {}
    };

    useEffect(() => {
        getJob();
    }, []);

    return (
        <Container>
            <Paper elevation={4} sx={{ padding: "10px" }}>
                <Grid2 container spacing={2}>
                    <Grid2 size={3}>
                        <Avatar
                            src={defaultImage}
                            sx={{ width: "100%", height: "100%" }}
                        />
                    </Grid2>
                    <Grid2
                        size={9}
                        container
                        flexDirection={"column"}
                        justifyContent={"space-between"}
                    >
                        <h4 style={{ color: "rgb(111, 109, 113)" }}>
                            {job.company_name}
                        </h4>
                        <h2>{job.job_title}</h2>
                        <Grid2 container spacing={2}>
                            <Grid2 container alignItems={"center"} spacing={1}>
                                <MonetizationOn
                                    sx={{ color: "rgb(30, 136, 229)" }}
                                />
                                <span>
                                    Mức lương: <span>{job.salary_range}</span>
                                </span>
                            </Grid2>
                            {" | "}
                            <Grid2 container alignItems={"center"} spacing={1}>
                                <FmdGood sx={{ color: "rgb(30, 136, 229)" }} />
                                <span>
                                    {" "}
                                    Khu vực tuyển:{" "}
                                    <span>{job.job_location}</span>
                                </span>
                            </Grid2>
                        </Grid2>
                        <p>
                            Công việc đang rất được quan tâm! Ứng tuyển ngay để
                            không lỡ cơ hội!
                        </p>
                        <Grid2 size={4}>
                            <Button
                                variant="contained"
                                sx={{ textTransform: "none" }}
                            >
                                Đăng ký ứng tuyển
                            </Button>
                        </Grid2>
                    </Grid2>
                </Grid2>
            </Paper>
            <Paper elevation={4} sx={{ marginTop: "10px", padding: "10px" }}>
                <h3 style={{ color: "rgb(30, 136, 229)" }}>
                    Chi tiết tuyển dụng
                </h3>
                <Box sx={{ marginTop: "20px" }}>
                    <h2>Thông tin chung</h2>
                    <Grid2
                        container
                        sx={{
                            padding: "10px",
                            background: "rgb(221, 214, 254)",
                            my: 1,
                        }}
                    >
                        <Grid2 size={6}>
                            <Grid2 container textAlign={"center"} spacing={1}>
                                <CalendarMonthOutlined
                                    sx={{ color: "rgb(139, 92, 246)" }}
                                />
                                <span>
                                    Ngày đăng:{" "}
                                    <span>{formatISODate(job.created_at)}</span>
                                </span>
                            </Grid2>
                        </Grid2>
                        <Grid2 size={6}>
                            <Grid2 container textAlign={"center"} spacing={1}>
                                <WorkHistoryOutlined
                                    sx={{ color: "rgb(139, 92, 246)" }}
                                />
                                <span>
                                    Hình thức làm việc:{" "}
                                    <span>
                                        {jobTypeList.find(
                                            (item) =>
                                                item.value === job.job_type
                                        )?.label ?? "Không xác định"}
                                    </span>
                                </span>
                            </Grid2>
                        </Grid2>
                    </Grid2>
                </Box>
                <Box sx={{ marginTop: "20px" }}>
                    <h2>Mô tả công việc</h2>
                    <Box sx={{ padding: "15px" }}>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: job.job_description,
                            }}
                        />
                    </Box>
                </Box>
                <Box sx={{ marginTop: "20px" }}>
                    <h2>Yêu cầu công việc</h2>
                    <Box sx={{ padding: "15px" }}>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: job.job_requirements,
                            }}
                        />
                    </Box>
                </Box>
            </Paper>
            <Paper elevation={4} sx={{ marginTop: "10px", padding: "10px" }}>
                <h3 style={{ color: "rgb(30, 136, 229)" }}>
                    Thông tin công ty
                </h3>
                <Grid2
                    container
                    flexDirection={"column"}
                    spacing={1}
                    sx={{ marginTop: "20px" }}
                >
                    <h3>{job.company_name}</h3>
                    <Grid2 container textAlign={"center"} spacing={1}>
                        <ComputerOutlined />
                        <span>
                            Website: <span>{job.company_website}</span>
                        </span>
                    </Grid2>
                    <Box>{job.company_description}</Box>
                </Grid2>
            </Paper>
        </Container>
    );
}

export default JobPostDetail;
