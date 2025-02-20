import { Grid2 } from "@mui/material";

import CompanyInformation from "./components/CompanyInformation";
import RecruitmentInformation from "./components/RecruitmentInformation";

function CreateJobPosting() {
    return (
        <>
            <Grid2 container spacing={2}>
                <Grid2 size={12}>
                    <CompanyInformation />
                </Grid2>
                <Grid2 size={12}>
                    <RecruitmentInformation />
                </Grid2>
            </Grid2>
        </>
    );
}

export default CreateJobPosting;
