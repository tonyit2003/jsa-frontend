import PropTypes from "prop-types";
import Header from "./components/Header/Header";
import { Container } from "@mui/material";

function UserLayout({ children }) {
    return (
        <>
            <Header />
            <Container maxWidth={"fixed"} sx={{ marginTop: "80px" }}>
                {children}
            </Container>
        </>
    );
}

UserLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default UserLayout;
