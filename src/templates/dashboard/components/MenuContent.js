import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import SupervisedUserCircleRoundedIcon from '@mui/icons-material/SupervisedUserCircleRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import DynamicFeedRoundedIcon from '@mui/icons-material/DynamicFeedRounded';
import RememberMeRoundedIcon from '@mui/icons-material/RememberMeRounded';

import { useLocation, useNavigate } from 'react-router-dom';
import config from "../../../config";

const mainListItems = [
  { text: 'Thống kê', icon: <DashboardRoundedIcon />, path: config.routes.dashboard },
  { text: 'Người tìm việc', icon: <SupervisedUserCircleRoundedIcon />, path: config.routes.userCandidate },
  { text: 'Nhà tuyển dụng', icon: <GroupRoundedIcon />, path: config.routes.userRecruiter },
  { text: 'Thành viên', icon: <RememberMeRoundedIcon />, path: config.routes.userMember },
  { text: 'Duyệt tin', icon: <DynamicFeedRoundedIcon />, path: config.routes.browseJobPostings },
  { text: 'Duyệt tài khoản', icon: <AssignmentRoundedIcon />, path: config.routes.browseAccount },
];

const secondaryListItems = [
  { text: 'Settings', icon: <SettingsRoundedIcon /> },
  { text: 'About', icon: <InfoRoundedIcon /> },
  { text: 'Feedback', icon: <HelpRoundedIcon /> },
];

export default function MenuContent() {
  const navigate = useNavigate();
  const location = useLocation(); //Lấy URL

  const handleNavigation = (path) => {
    navigate(path);
  }

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleNavigation(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
