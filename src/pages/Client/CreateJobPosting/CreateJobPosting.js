import { Container } from "@mui/material";

import CompanyInformation from "./components/CompanyInformation";

function CreateJobPosting() {
    return (
        <>
            <Container sx={{ marginTop: "80px" }}>
                <CompanyInformation />
            </Container>
        </>
    );
}

export default CreateJobPosting;
