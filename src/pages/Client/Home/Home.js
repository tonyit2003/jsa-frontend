import { useContext } from "react";
import Slideshow from "~/components/Slideshow";
import userType from "~/constants/userType";
import { UserContext } from "~/context/UserProvider";

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

function Home() {
    const { auth, setAuth } = useContext(UserContext);

    const HomePage = null;

    if (auth.isAuth && auth.user_type === userType.CANDIDATE) {
        
    }

    return (
        <div style={{ height: 1000 }}>
            <Slideshow slides={slides || []} />
        </div>
    );
}

export default Home;
