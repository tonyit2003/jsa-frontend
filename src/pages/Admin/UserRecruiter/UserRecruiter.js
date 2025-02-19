import { alpha, Box, Pagination, Stack } from "@mui/material";
import Header from "~/templates/dashboard/components/Header";
import DataTable from "./UserRecruiterTable";
import { useEffect, useState } from "react";
import { getPaginationUserRecruiter } from "~/services/UserRecruiterService";

function UserRecruiter() {
    const [listUserRecruiter, setListUserRecruiter] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [page, setPage] = useState(1);

    function createDate(id, full_name, email, phone_number, company_name, company_description, company_website) {
        return { id, full_name, email, phone_number, company_name, company_description, company_website };
    }

    useEffect(() => {
        getUsers(page);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const getUsers = async (page) => {
        try {
            let res = await getPaginationUserRecruiter(page);
            if (res && res.data) {
                const userArray = res.data.users || res.data.data || res.data;
                const formattedData = userArray.map((userRecruiter) =>
                    createDate(userRecruiter.id, userRecruiter.full_name, userRecruiter.email, userRecruiter.phone_number, userRecruiter.company_name, userRecruiter.company_description, userRecruiter.company_website)
                );
                setListUserRecruiter(formattedData);
                setTotalPage(res.meta.last_page);
            }
        } catch (error) {
            console.error("Lỗi khi lấy danh sách ứng viên:", error);
        }
    }

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
                <DataTable rows={listUserRecruiter} onPageChange={setPage} />
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

export default UserRecruiter;