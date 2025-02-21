import config from "~/config";
import UserLayout from "~/layouts/UserLayout";
import Home from "~/pages/Client/Home";
import Dashboard from "~/pages/Admin/Dashboard";
import LoginAdmin from "~/pages/Admin/Login";
import AdminLayout from "~/layouts/AdminLayout";
import UserCandidate from "~/pages/Admin/UserCandidate";
import JobPost from "~/pages/Admin/JobPost";
import UserRecruiter from "~/pages/Admin/UserRecruiter";
import UserMember from "~/pages/Admin/UserMember";
import Login from "~/pages/Client/Login";
import DefaultLayout from "~/layouts";
import Register from "~/pages/Client/Register";
import CreateJobPosting from "~/pages/Client/CreateJobPosting";
import AccessDenied from "~/pages/Client/Status/AccessDenied";
import AddUserAdmin from "~/pages/Admin/UserMember/AddUserAdmin";
import EditUserAdmin from "~/pages/Admin/UserMember/EditUserAdmin";
import BrowserJobPost from "~/pages/Admin/JobPost/BrowserJobPost";
import JobPostDetail from "~/pages/Client/JobPostDetail";
import CandidateProfile from "~/pages/Client/CandidateProfile";

const publicRoutes = [
    // Client
    { path: config.routes.home, component: Home, layout: UserLayout },
    { path: config.routes.info, component: CandidateProfile, layout: UserLayout },
    { path: config.routes.login, component: Login, layout: DefaultLayout },
    {
        path: config.routes.register,
        component: Register,
        layout: DefaultLayout,
    },
    {
        path: config.routes.jobPostDetail,
        component: JobPostDetail,
        layout: UserLayout,
    },

    // Admin - Để đăng nhập admin
    { path: config.routes.loginAdmin, component: LoginAdmin },

    // Status
    { path: config.routes.accessDenied, component: AccessDenied },
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
        path: config.routes.jobPost,
        component: JobPost,
        layout: AdminLayout,
    },
    {
        path: config.routes.browserJobPost,
        component: BrowserJobPost,
        layout: AdminLayout,
    },
    {
        path: config.routes.addUserAdmin,
        component: AddUserAdmin,
        layout: AdminLayout,
    },
    {
        path: config.routes.editUserAdmin,
        component: EditUserAdmin,
        layout: AdminLayout,
    },

    // Status
    { path: config.routes.accessDenied, component: AccessDenied },
];

const recruiterRoutes = [
    {
        path: config.routes.createJobPosting,
        component: CreateJobPosting,
        layout: UserLayout,
    },
];

export { publicRoutes, recruiterRoutes, adminRoutes };
