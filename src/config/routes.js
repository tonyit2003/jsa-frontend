const routes = {
    // Client
    home: "/",
    login: "/login",
    register: "/register",
    createJobPosting: "/create-job-posting",
    jobPostDetail: "/job-post-detail/:jobPostId",

    // Admin
    loginAdmin: "/admin",
    userCandidate: "/admin/userCandidate",
    userRecruiter: "/admin/userRecruiter",
    userMember: "/admin/userMember",
    browseJobPostings: "/admin/browseJobPostings",
    browseAccount: "/admin/browseAccount",
    dashboard: "/admin/dashboard",
    users: "/admin/users",
    roles: "/admin/roles",
    permissions: "/admin/permissions",
    settings: "/admin/settings",

    //Status
    accessDenied: "/403",
};

export default routes;
