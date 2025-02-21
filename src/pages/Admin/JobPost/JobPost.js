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

    function createData(id, company_name, job_title, job_description, job_requirements, job_location, job_type, salary_range, status) {
        return {id, company_name, job_title, job_description, job_requirements, job_location, job_type, salary_range, status };
    }

    useEffect(() => {
        getJobPosts(page);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]); // Gọi API mỗi khi page thay đổi

    const getJobPosts = async (page) => {
        try {
            let res = await getPaginationJobPost(page);
            if (res && res.data) {
                const usersArray = res.data.users || res.data.data || res.data;
                const formattedData = usersArray.map((jobPost) =>
                    createData(jobPost.id, jobPost.company_name, jobPost.job_title, jobPost.job_description, jobPost.job_requirements, jobPost.job_location, jobPost.job_type, jobPost.salary_range, jobPost.status)
                );
                setListJobPosts(formattedData);
                setTotalPage(res.meta.last_page);
            }
        } catch (error) {
            console.error("Lỗi khi lấy danh sách bài tuyển dụng:", error);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa ứng viên này không?");
        if (!confirmDelete) return;

        try {
            //await deleteUserCandidate(id);
            alert("Xóa thành công!");

            // Gọi lại API để kiểm tra danh sách sau khi xóa
            let res = await getPaginationJobPost(page);
            const usersArray = res?.data?.users || res?.data?.data || res?.data || [];

            // Nếu trang hiện tại rỗng sau khi xóa và page > 1, thì giảm page xuống 1
            if (usersArray.length === 0 && page > 1) {
                setPage((prevPage) => prevPage - 1);
            } else {
                // Nếu trang vẫn còn dữ liệu, chỉ cần cập nhật dữ liệu mới
                getJobPosts(page);
            }
        } catch (error) {
            console.error("Lỗi khi xóa ứng viên:", error);
            alert("Xóa không thành công. Vui lòng thử lại!");
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
                <DataTable rows={listJobPosts} onPageChange={setPage} onDelete={handleDelete} />
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