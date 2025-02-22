import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Box, IconButton, Stack, Tooltip } from '@mui/material';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import { useNavigate } from 'react-router-dom';
import config from '~/config';

const totalWidth = 1560;

export default function DataTable({ rows, onPageChange }) {
    const navigate = useNavigate();

    const jobTypeMapping = {
        full_time: 'Toàn thời gian',
        part_time: 'Bán thời gian',
        contract: 'Hợp đồng',
        internship: 'Thực tập',
    };

    const jobStatusMapping = {
        pending: { label: 'Chưa duyệt', color: 'warning.main' },   // Màu vàng
        approved: { label: 'Đã duyệt', color: 'success.main' },    // Màu xanh lá
        rejected: { label: 'Bị từ chối', color: 'error.main' }     // Màu đỏ
    };

    const formatCurrency = (value) => {
        if (!value) return 'Chưa xác định';
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    };

    const handleBrowser = (id) => {
        navigate(config.routes.browserJobPost.replace(":id", id)); // Chuyển hướng đến trang sửa với id
    };

    const columns = [
        {
            field: 'id',
            headerName: 'STT',
            flex: (70 / totalWidth) * 100,
            renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,
        },
        { field: 'company_name', headerName: 'Tên công ty', flex: (200 / totalWidth) * 100 },
        { field: 'job_title', headerName: 'Tiêu đề', flex: (200 / totalWidth) * 100 },
        {
            field: 'job_description',
            headerName: 'Mô tả',
            flex: (250 / totalWidth) * 100,
            renderCell: (params) => (
                <div dangerouslySetInnerHTML={{ __html: params.value }} />
            )
        },
        {
            field: 'job_requirements',
            headerName: 'Yêu cầu',
            flex: (250 / totalWidth) * 100,
            renderCell: (params) => (
                <div dangerouslySetInnerHTML={{ __html: params.value }} />
            )
        },
        { field: 'job_location', headerName: 'Địa chỉ', flex: (300 / totalWidth) * 100 },
        {
            field: 'job_type',
            headerName: 'Dạng',
            flex: (130 / totalWidth) * 100,
            renderCell: (params) => jobTypeMapping[params.value] || 'Không xác định'
        },
        {
            field: 'salary_range',
            headerName: 'Lương',
            flex: (180 / totalWidth) * 100,
            renderCell: (params) => formatCurrency(params.value)
        },
        {
            field: "status",
            headerName: "Trạng thái",
            flex: (130 / totalWidth) * 100,
            renderCell: (params) => {
                const status = jobStatusMapping[params.value] || { label: "Không xác định", color: "grey.500" };

                return (
                    <Box
                        sx={{
                            fontWeight: "bold",
                            color: status.color,
                        }}
                    >
                        {status.label}
                    </Box>
                );
            },
        },
        {
            field: 'actions',
            headerName: 'Hành động',
            flex: (100 / totalWidth) * 100,
            sortable: false,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', height: '100%' }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Tooltip title="Duyệt">
                            <IconButton color="error" onClick={() => handleBrowser(params.row.id)}>
                                <OpenInBrowserIcon />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Box>
            ),
        },
    ];

    return (
        <Paper sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <DataGrid
                rows={rows}
                columns={columns}
                hideFooter
                sx={{ border: 0 }}
            />
        </Paper>
    );
}
