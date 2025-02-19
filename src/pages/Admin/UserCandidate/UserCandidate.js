import { alpha, Box, Stack } from "@mui/material";
import Header from "~/templates/dashboard/components/Header";
import DataTable from "./UserCandidateTable";
import { useEffect, useState } from "react";
import { getPaginationUsersCandidate, deleteUserCandidate } from "~/services/UserCandidateService";
import Pagination from '@mui/material/Pagination';

function UserCandidate() {
    const [listUsersCandidate, setListUsersCandidate] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [page, setPage] = useState(1);

    function createData(id, full_name, email, phone_number, resume, skills, experience, education) {
        return { id, full_name, email, phone_number, resume, skills, experience, education };
    }

    useEffect(() => {
        getUsers(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]); // Gọi API mỗi khi page thay đổi

    const getUsers = async (page) => {
        try {
            let res = await getPaginationUsersCandidate(page);
            if (res && res.data) {
                const usersArray = res.data.users || res.data.data || res.data;
                const formattedData = usersArray.map((userCandidate) =>
                    createData(userCandidate.id, userCandidate.full_name, userCandidate.email, userCandidate.phone_number, userCandidate.resume, userCandidate.skills, userCandidate.experience, userCandidate.education)
                );
                setListUsersCandidate(formattedData);
                setTotalPage(res.meta.last_page);
            }
        } catch (error) {
            console.error("Lỗi khi lấy danh sách ứng viên:", error);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa ứng viên này không?");
        if (!confirmDelete) return;

        try {
            await deleteUserCandidate(id);
            alert("Xóa thành công!");

            // Gọi lại API để kiểm tra danh sách sau khi xóa
            let res = await getPaginationUsersCandidate(page);
            const usersArray = res?.data?.users || res?.data?.data || res?.data || [];

            // Nếu trang hiện tại rỗng sau khi xóa và page > 1, thì giảm page xuống 1
            if (usersArray.length === 0 && page > 1) {
                setPage((prevPage) => prevPage - 1);
            } else {
                // Nếu trang vẫn còn dữ liệu, chỉ cần cập nhật dữ liệu mới
                getUsers(page);
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
                <DataTable rows={listUsersCandidate} onPageChange={setPage} onDelete={handleDelete} />
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

export default UserCandidate;