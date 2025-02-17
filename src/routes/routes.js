import config from "~/config";
import UserLayout from "~/layouts/UserLayout";
import Home from "~/pages/Client/Home";

const publicRoutes = [
    { path: config.routes.home, component: Home, layout: UserLayout },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
