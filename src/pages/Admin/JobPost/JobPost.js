import { alpha, Box, Stack } from "@mui/material";
import Header from "~/templates/dashboard/components/Header";
import DataTable from "./JobPostTable";
import { useEffect, useState } from "react";
import Pagination from '@mui/material/Pagination';
import { getPaginationJobPost } from "~/services/JobPostService";

function JobPost() {
    const [listJobPosts, setListJobPosts] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [page, setPage] = useState(1);

    useEffect(() => {
        getJobPosts(page);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]); // Gọi API mỗi khi page thay đổi

    const getJobPosts = async (page) => {
        try {
            let res = await getPaginationJobPost(page);
            if (res && res.data) {
                setListJobPosts(res.data);
                setTotalPage(res.meta.last_page);
            }
        } catch (error) {
            console.error("Lỗi khi lấy danh sách bài tuyển dụng:", error);
        }
    };

    return (
        <Box
            component="main"
            sx={(theme) => ({
                flexGrow: 1,
                backgroundColor: theme.vars
                    ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                    : alpha(theme.palette.background.default, 1),
                overflow: 'auto',
            })}
        >
            <Stack spacing={2} sx={{ alignItems: 'center', mx: 3, pb: 5, mt: { xs: 8, md: 0 } }}>
                <Header />
                <DataTable rows={listJobPosts} onPageChange={setPage}/>
                <Pagination
                    count={totalPage}
                    page={page}
                    onChange={(e, newPage) => setPage(newPage)}
                    color="primary"
                />
            </Stack>
        </Box>
    );
}

export default JobPost;