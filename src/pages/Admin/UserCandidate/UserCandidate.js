import { alpha, Box, Stack } from "@mui/material";
import Header from "~/templates/dashboard/components/Header";
import MainGrid from "~/templates/dashboard/components/MainGrid";
import DataTable from "./UserCandidateTable";

function UserCandidate() {
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
                <DataTable />
                {/* <MainGrid /> */}
            </Stack>
        </Box>
    );
}

export default UserCandidate;