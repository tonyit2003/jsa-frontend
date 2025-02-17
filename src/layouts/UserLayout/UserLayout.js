import PropTypes from "prop-types";
import Header from "./components/Header/Header";

function UserLayout({ children }) {
    return (
        <div>
            <Header />
            {children}
        </div>
    );
}

UserLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default UserLayout;
