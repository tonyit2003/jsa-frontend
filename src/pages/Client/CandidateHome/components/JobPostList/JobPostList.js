import { Grid2, Pagination, Stack } from "@mui/material";
import { useEffect, useState } from "react";

import RecruitmentPost from "../RecruitmentPost";
import { getJobPostPagination } from "~/services/JobPostService";

function JobPostList() {
    const [jobs, setJobs] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [page, setPage] = useState(1);

    const getJobPost = async ($page = 1) => {
        try {
            const res = await getJobPostPagination($page);
            if (res.status === "success") {
                setJobs([...res.data]);
                setTotalPage(res.meta.last_page);
            } else {
                setJobs([]);
            }
        } catch (error) {
            setJobs([]);
        }
    };

    useEffect(() => {
        getJobPost(page);
    }, [page]);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <div>
            <Grid2 container spacing={3}>
                {jobs.map((job, index) => (
                    <Grid2 key={index} size={4}>
                        <RecruitmentPost
                            jobPostId={job.job_post_id}
                            titleJob={job.job_title}
                            companyName={job.company_name}
                            salary={job.salary_range}
                            address={job.job_location}
                        />
                    </Grid2>
                ))}
            </Grid2>
            <Stack spacing={2} alignItems="center" sx={{ mt: 2 }}>
                <Pagination
                    count={totalPage}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                    showFirstButton
                    showLastButton
                    sx={{
                        "& .MuiPaginationItem-root": {
                            fontSize: { xs: "0.875rem", sm: "1rem" },
                        },
                    }}
                />
            </Stack>
        </div>
    );
}

export default JobPostList;
