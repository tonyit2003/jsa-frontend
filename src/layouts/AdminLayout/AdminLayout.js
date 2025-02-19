import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import AppNavbar from '~/templates/dashboard/components/AppNavbar';
import SideMenu from '~/templates/dashboard/components/SideMenu';
import AppTheme from '~/templates/shared-theme/AppTheme';
import {
    chartsCustomizations,
    dataGridCustomizations,
    datePickersCustomizations,
    treeViewCustomizations,
} from '~/templates/dashboard/theme/customizations';
import { UserContext } from '~/context/UserProvider';

const xThemeComponents = {
    ...chartsCustomizations,
    ...dataGridCustomizations,
    ...datePickersCustomizations,
    ...treeViewCustomizations,
};

export default function AdminLayout({ props, children }) {
    const { auth } = React.useContext(UserContext); // Lấy thông tin đăng nhập từ UserContext

    return (
        <AppTheme {...props} themeComponents={xThemeComponents}>
            <CssBaseline enableColorScheme />
            <Box sx={{ display: 'flex' }}>
                <SideMenu auth={auth}/>
                <AppNavbar />
                <>{children}</>
            </Box>
        </AppTheme>
    );
}
