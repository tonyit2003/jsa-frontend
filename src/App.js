import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import DefaultLayout from "~/layouts";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";
import { publicRoutes, recruiterRoutes, adminRoutes } from "~/routes";
import RecruiterRoutes from "./routes/RecruiterRoutes";
function App() {
    return (
        <Router>
            <div>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}

                    {/* Private Routes - Chỉ Admin Mới Truy Cập Được */}
                    {adminRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <ProtectedAdminRoute>
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    </ProtectedAdminRoute>
                                }
                            />
                        );
                    })}

                    {recruiterRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route key={index} element={<RecruiterRoutes />}>
                                <Route
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            </Route>
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
