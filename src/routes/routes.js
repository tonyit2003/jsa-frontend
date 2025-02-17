import config from "~/config";
import UserLayout from "~/layouts/UserLayout";
import Dashboard from "~/pages/Admin/Dashboard";
import LoginAdmin from "~/pages/Admin/Login";
import Home from "~/pages/Home";

const publicRoutes = [
    { path: config.routes.home, component: Home, layout: UserLayout },
    { path: config.routes.loginAdmin, component: LoginAdmin },
    { path: config.routes.dashboard, component: Dashboard },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
