import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Box, IconButton, Stack, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const totalWidth = 1560;

const handleAdd = () => {
    console.log('Thêm ứng viên mới');
};

const handleEdit = (id) => {
    console.log(`Sửa ứng viên có ID: ${id}`);
};

const handleDelete = (id) => {
    console.log(`Xóa ứng viên có ID: ${id}`);
};

const columns = [
    { field: 'id', headerName: 'STT', flex: (70 / totalWidth) * 100 },
    { field: 'full_name', headerName: 'Họ tên', flex: (200 / totalWidth) * 100 },
    { field: 'email', headerName: 'Email', flex: (250 / totalWidth) * 100 },
    { field: 'phone_number', headerName: 'Số điện thoại', flex: (130 / totalWidth) * 100 },
    { field: 'resume', headerName: 'Tóm tắt', flex: (300 / totalWidth) * 100 },
    { field: 'skills', headerName: 'Kỹ năng', flex: (300 / totalWidth) * 100 },
    { field: 'experience', headerName: 'Kinh nghiệm', flex: (130 / totalWidth) * 100 },
    { field: 'education', headerName: 'Học vấn', flex: (180 / totalWidth) * 100 },
    {
        field: 'actions',
        headerName: 'Hành động',
        flex: (180 / totalWidth) * 100,
        sortable: false,
        renderCell: (params) => (
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', height: '100%' }}>
                <Stack direction="row" spacing={1} alignItems="center">
                    <Tooltip title="Thêm">
                        <IconButton color="success" onClick={handleAdd}>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Sửa">
                        <IconButton color="primary" onClick={() => handleEdit(params.row.id)}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </Stack>
            </Box>
        ),
    },
];

export default function DataTable({ rows, onPageChange }) {
    const [paginationModel, setPaginationModel] = React.useState({ page: 0, pageSize: 10 });

    const handlePageChange = (params) => {
        setPaginationModel({ ...paginationModel, page: params.page });
        onPageChange(params.page + 1); // Cập nhật trang khi thay đổi
    };

    return (
        <Paper sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <DataGrid
                rows={rows}
                columns={columns}
                hideFooter
                //pagination
                //pageSizeOptions={[5, 10]}
                paginationModel={paginationModel}
                onPaginationModelChange={handlePageChange} // Cập nhật trang khi thay đổi
                checkboxSelection
                sx={{ border: 0 }}
            />
        </Paper>
    );
}
