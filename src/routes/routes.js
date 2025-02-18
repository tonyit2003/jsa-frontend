import config from "~/config";
import UserLayout from "~/layouts/UserLayout";
import Home from "~/pages/Client/Home";
import Dashboard from "~/pages/Admin/Dashboard";
import LoginAdmin from "~/pages/Admin/Login";
import Login from "~/pages/Client/Login";
import DefaultLayout from "~/layouts";
import Register from "~/pages/Client/Register";

const publicRoutes = [
    // Client
    { path: config.routes.home, component: Home, layout: UserLayout },
    { path: config.routes.login, component: Login, layout: DefaultLayout },
    {
        path: config.routes.register,
        component: Register,
        layout: DefaultLayout,
    },

    // Admin
    { path: config.routes.loginAdmin, component: LoginAdmin },
    { path: config.routes.dashboard, component: Dashboard },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
