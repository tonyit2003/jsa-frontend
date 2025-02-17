import PropTypes from "prop-types";

function DefaultLayout({ children }) {
    return <div>{children}</div>;
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
