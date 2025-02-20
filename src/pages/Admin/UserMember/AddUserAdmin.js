import { alpha, Box, Stack } from "@mui/material";
import Header from "~/templates/dashboard/components/Header";
import FormAddUserAdmin from "./FormAddUserAdmin";

function AddUserAdmin() {
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
                <FormAddUserAdmin />
            </Stack>
        </Box>
    );
}

export default AddUserAdmin;