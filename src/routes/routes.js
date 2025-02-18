import config from "~/config";
import UserLayout from "~/layouts/UserLayout";
import Home from "~/pages/Client/Home";
import Dashboard from "~/pages/Admin/Dashboard";
import LoginAdmin from "~/pages/Admin/Login";
import AdminLayout from "~/layouts/AdminLayout";
import UserManagement from "~/pages/Admin/UserManagement";
import BrowseJobPostings from "~/pages/Admin/BrowseJobPostings";
import BrowseAccount from "~/pages/Admin/BrowseAccount";

const publicRoutes = [
    { path: config.routes.home, component: Home, layout: UserLayout },
    { path: config.routes.loginAdmin, component: LoginAdmin },
    { path: config.routes.dashboard, component: Dashboard, layout: AdminLayout },
    { path: config.routes.userManagement, component: UserManagement, layout: AdminLayout },
    { path: config.routes.browseJobPostings, component: BrowseJobPostings, layout: AdminLayout },
    { path: config.routes.browseAccount, component: BrowseAccount, layout: AdminLayout },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
