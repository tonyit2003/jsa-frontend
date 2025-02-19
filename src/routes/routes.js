import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import config from "~/config";
import ProtectedAdminRoute from "./ProtectedAdminRoute";
import UserLayout from "~/layouts/UserLayout";
import Home from "~/pages/Client/Home";
import Dashboard from "~/pages/Admin/Dashboard";
import LoginAdmin from "~/pages/Admin/Login";
import AdminLayout from "~/layouts/AdminLayout";
import UserCandidate from "~/pages/Admin/UserCandidate";
import BrowseJobPostings from "~/pages/Admin/BrowseJobPostings";
import BrowseAccount from "~/pages/Admin/BrowseAccount";
import UserRecruiter from "~/pages/Admin/UserRecruiter";
import UserMember from "~/pages/Admin/UserMember";
import Login from "~/pages/Client/Login";
import DefaultLayout from "~/layouts";
import Register from "~/pages/Client/Register";

const publicRoutes = [
    // Client
    { path: config.routes.home, component: Home, layout: UserLayout },
    { path: config.routes.login, component: Login, layout: DefaultLayout },
    { path: config.routes.register, component: Register, layout: DefaultLayout },

    // Admin - Để đăng nhập admin
    { path: config.routes.loginAdmin, component: LoginAdmin },
];

const adminRoutes = [
    // Các trang admin cần đăng nhập mới truy cập được
    {
        path: config.routes.dashboard,
        component: Dashboard,
        layout: AdminLayout,
    },
    {
        path: config.routes.userCandidate,
        component: UserCandidate,
        layout: AdminLayout,
    },
    {
        path: config.routes.userRecruiter,
        component: UserRecruiter,
        layout: AdminLayout,
    },
    {
        path: config.routes.userMember,
        component: UserMember,
        layout: AdminLayout,
    },
    {
        path: config.routes.browseJobPostings,
        component: BrowseJobPostings,
        layout: AdminLayout,
    },
    {
        path: config.routes.browseAccount,
        component: BrowseAccount,
        layout: AdminLayout,
    },
];

export { publicRoutes, adminRoutes };
