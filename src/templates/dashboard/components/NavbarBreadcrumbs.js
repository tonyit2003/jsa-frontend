import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { useLocation } from 'react-router-dom';
import config from "../../../config";

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: (theme.vars || theme).palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: 'center',
  },
}));

export default function NavbarBreadcrumbs() {
  const location = useLocation(); // Lấy pathname của trang hiện tại
  const isEditUserAdmin = location.pathname.startsWith("/admin/editUserAdmin");
  const isBrowserJobPost = location.pathname.startsWith("/admin/browserJobPost");
  // Danh sách breadcrumb theo route
  const breadcrumbsConfig = {
    [config.routes.dashboard]: ["Trang chủ", "Thống kê"],
    [config.routes.userCandidate]: ["Trang chủ", "Quản lý người tìm việc"],
    [config.routes.userRecruiter]: ["Trang chủ", "Quản lý nhà tuyển dụng"],
    [config.routes.userMember]: ["Trang chủ", "Quản lý thành viên"],
    [config.routes.addUserAdmin]: ["Trang chủ", "Thêm thành viên"],
    [config.routes.jobPost]: ["Trang chủ", "Bài tuyển dụng"],
    [config.routes.browserJobPost]: ["Trang chủ", "Duyệt bài tuyển dụng"],
    "/settings": ["Trang chủ", "Cài đặt"],
    "/about": ["Trang chủ", "Giới thiệu"],
    "/feedback": ["Trang chủ", "Phản hồi"],
  };

  let currentBreadcrumbs;

  // Lấy breadcrumb theo pathname, nếu không có thì mặc định là ["Trang chủ"]
  if (isEditUserAdmin) {
    currentBreadcrumbs = ["Trang chủ", "Sửa thành viên"]
  } else if (isBrowserJobPost) {
    currentBreadcrumbs = ["Trang chủ", "Duyệt bài tuyển dụng"]
  } else {
    currentBreadcrumbs = breadcrumbsConfig[location.pathname] || ["Trang chủ"]
  }

  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      {currentBreadcrumbs.map((text, index) => (
        <Typography
          key={index}
          variant="body1"
          sx={{ color: index === currentBreadcrumbs.length - 1 ? 'text.primary' : 'inherit', fontWeight: index === currentBreadcrumbs.length - 1 ? 600 : 'normal' }}
        >
          {text}
        </Typography>
      ))}
    </StyledBreadcrumbs>
  );
}
