import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Box, IconButton, Stack, Tooltip, Button, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import config from '~/config';

export default function DataTable({ rows, onPageChange, onDelete }) {
    const navigate = useNavigate();

    const handleAdd = () => {
        navigate(config.routes.addUserAdmin); // Chuyển hướng đến trang thêm mới
    };

    const handleEdit = (id) => {
        navigate(config.routes.editUserAdmin.replace(":id", id)); // Chuyển hướng đến trang sửa với id
    };

    const totalWidth = 1560;

    const columns = [
        {
            field: 'id',
            headerName: 'STT',
            flex: (70 / totalWidth) * 100,
            renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,
        },
        { field: 'full_name', headerName: 'Họ tên', flex: (200 / totalWidth) * 100 },
        { field: 'email', headerName: 'Email', flex: (250 / totalWidth) * 100 },
        { field: 'phone_number', headerName: 'Số điện thoại', flex: (130 / totalWidth) * 100 },
        {
            field: 'actions',
            headerName: 'Hành động',
            flex: (100 / totalWidth) * 100,
            sortable: false,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', height: '100%' }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Tooltip title="Sửa">
                            <IconButton color="primary" onClick={() => handleEdit(params.row.id)}>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Xóa">
                            <IconButton color="error" onClick={() => onDelete(params.row.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Box>
            ),
        },
    ];

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                {/* Tiêu đề danh sách bên trái */}
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Danh sách thành viên
                </Typography>

                {/* Nút Thêm mới bên phải */}
                <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAdd}>
                    Thêm mới
                </Button>
            </Box>

            <Paper sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    hideFooter
                    sx={{ border: 0 }}
                />
            </Paper>
        </>
    );

}
