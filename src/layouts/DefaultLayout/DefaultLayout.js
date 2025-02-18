import { Container } from "@mui/material";
import PropTypes from "prop-types";

function DefaultLayout({ children }) {
    return <Container>{children}</Container>;
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
