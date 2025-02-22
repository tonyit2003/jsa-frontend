import { alpha, Box, Pagination, Stack } from "@mui/material";
import Header from "~/templates/dashboard/components/Header";
import DataTable from "./UserMemberTable";
import { useEffect, useState } from "react";
import { deleteUserAdmin, getPaginationUsersAdmin } from "~/services/UserAdminService";

function UserMember() {
    const [listUserMember, setListUserMember] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [page, setPage] = useState(1);

    useEffect(() => {
        getUsers(page);
        // eslint-disable-next-line react-hooks/exhaustive-deps     
    }, [page]);

    const getUsers = async (page) => {
        let res = await getPaginationUsersAdmin(page);

        try {
            if (res && res.data) {
                setListUserMember(res.data);
                setTotalPage(res.meta.last_page);
            }
        } catch (error) {
            console.error("Lỗi khi lấy danh sách thành viên:", error);
        }
    }

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa thành viên này không?");
        if (!confirmDelete) return;

        try {
            await deleteUserAdmin(id);
            alert("Xóa thành công!");

            // Gọi lại API để kiểm tra danh sách sau khi xóa
            let res = await getPaginationUsersAdmin(page);
            const usersArray = res?.data?.users || res?.data?.data || res?.data || [];

            // Nếu trang hiện tại rỗng sau khi xóa và page > 1, thì giảm page xuống 1
            if (usersArray.length === 0 && page > 1) {
                setPage((prevPage) => prevPage - 1);
            } else {
                // Nếu trang vẫn còn dữ liệu, chỉ cần cập nhật dữ liệu mới
                getUsers(page);
            }
        } catch (error) {
            console.error("Lỗi khi xóa thành viên:", error);
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
            <Stack
                spacing={2}
                sx={{
                    alignItems: 'center',
                    mx: 3,
                    pb: 5,
                    mt: { xs: 8, md: 0 },
                }}
            >
                <Header />
                <DataTable rows={listUserMember} onPageChange={setPage} onDelete={handleDelete} />
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

export default UserMember;