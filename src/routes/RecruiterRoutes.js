import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import config from "~/config";
import userType from "~/constants/userType";
import { UserContext } from "~/context/UserProvider";

function RecruiterRoutes() {
    // eslint-disable-next-line no-unused-vars
    const { auth, setAuth } = useContext(UserContext);

    if (!auth.isAuth) {
        return <Navigate to={config.routes.login} />;
    }

    if (auth.user_type !== userType.RECRUITER) {
        return <Navigate to={config.routes.accessDenied} />;
    }

    return <Outlet />;
}

export default RecruiterRoutes;
