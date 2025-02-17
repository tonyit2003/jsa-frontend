import Slideshow from "~/components/Slideshow";

const slides = [
    {
        content: "Content 1",
        image: "https://images.pexels.com/photos/1632790/pexels-photo-1632790.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        alt: "",
    },
    {
        content: "Content 1",
        image: "https://static.vecteezy.com/system/resources/previews/007/623/233/non_2x/3d-illustration-education-tablet-with-education-icons-on-on-hi-tech-background-education-banner-vector.jpg",
        alt: "",
    },
    {
        content: "Content 1",
        image: "https://static.vecteezy.com/system/resources/previews/007/623/233/non_2x/3d-illustration-education-tablet-with-education-icons-on-on-hi-tech-background-education-banner-vector.jpg",
        alt: "",
    },
];

function Home() {
    return (
        <div style={{ height: 1000 }}>
            <Slideshow slides={slides || []} />
        </div>
    );
}

export default Home;
