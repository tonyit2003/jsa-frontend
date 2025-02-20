import { Grid2 } from "@mui/material";
import RecruitmentPost from "~/components/RecruitmentPost";
import Slideshow from "~/components/Slideshow";

const slides = [
    {
        content: "Content 1",
        image: "https://png.pngtree.com/background/20210710/original/pngtree-recruitment-background-banner-picture-image_1037995.jpg",
        alt: "",
        width: "1200px",
        height: "220px",
    },
    {
        content: "Content 1",
        image: "https://png.pngtree.com/background/20210709/original/pngtree-recruitment-gradient-first-place-banner-picture-image_925518.jpg",
        alt: "",
        width: "1200px",
        height: "220px",
    },
    {
        content: "Content 1",
        image: "https://png.pngtree.com/background/20210710/original/pngtree-recruitment-background-banner-picture-image_1034730.jpg",
        alt: "",
        width: "1200px",
        height: "220px",
    },
];

function CandidateHome() {
    return (
        <div>
            <Slideshow slides={slides} />
            <Grid2 container spacing={1}>
                <Grid2 size={4}>
                    <RecruitmentPost />
                </Grid2>
                <Grid2 size={4}>
                    <RecruitmentPost />
                </Grid2>
                <Grid2 size={4}>
                    <RecruitmentPost />
                </Grid2>
            </Grid2>
        </div>
    );
}

export default CandidateHome;
