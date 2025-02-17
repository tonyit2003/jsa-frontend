import PropTypes from "prop-types";
import Header from "./components/Header/Header";
import { Container } from "@mui/material";

function UserLayout({ children }) {
    return (
        <>
            <Header />
            <Container sx={{ marginTop: "65px" }}>{children}</Container>
        </>
    );
}

UserLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default UserLayout;
