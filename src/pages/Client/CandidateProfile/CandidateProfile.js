import Sidebar from "./components/Sidebar";
import Information from "./components/Information";
import { Grid } from "@mui/material";

function CandidateProfile() {
    return (
        < Grid container >
            {/* Sidebar - Chiếm 2 phần */}
            <Grid Grid item xs={2} >
                <Sidebar />
            </Grid >

            {/* Nội dung chính - Chiếm 10 phần */}
            <Grid Grid item xs={10} >
                <Information />
            </Grid >
        </Grid >
    );
}

export default CandidateProfile;
