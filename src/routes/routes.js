import config from "~/config";
import UserLayout from "~/layouts/UserLayout";
import Home from "~/pages/Client/Home";
import Dashboard from "~/pages/Admin/Dashboard";
import LoginAdmin from "~/pages/Admin/Login";

const publicRoutes = [
    { path: config.routes.home, component: Home, layout: UserLayout },
    { path: config.routes.loginAdmin, component: LoginAdmin },
    { path: config.routes.dashboard, component: Dashboard },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
