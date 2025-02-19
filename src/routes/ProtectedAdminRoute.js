import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "~/context/UserProvider";
import userType from '~/constants/userType';
import config from "~/config";

const ProtectedAdminRoute = ({ children }) => {
    const { auth } = useContext(UserContext);

    // Nếu chưa đăng nhập hoặc user không phải admin, chuyển hướng về trang đăng nhập admin
    if (!auth.isAuth || auth.user_type !== userType.ADMIN) {
        return <Navigate to={config.routes.loginAdmin} replace />;
    }

    return children;
};

export default ProtectedAdminRoute;
