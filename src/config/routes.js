const routes = {
    // Client
    home: "/",
    login: "/login",
    register: "/register",
    createJobPosting: "/create-job-posting",

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
    addUserAdmin: "/admin/addUserAdmin",
    editUserAdmin: "/admin/editUserAdmin/:id",

    //Status
    accessDenied: "/403",
};

export default routes;
