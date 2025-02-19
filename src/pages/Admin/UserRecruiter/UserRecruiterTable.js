import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Box, IconButton, Stack, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const totalWidth = 1580;

const handleAdd = () => {
    console.log('Add new candidate');
};

const handleEdit = (id) => {
    console.log(`Edit candidate with id: ${id}`);
};

const handleDelete = (id) => {
    console.log(`Delete candidate with id: ${id}`);
};

const columns = [
    { field: 'id', headerName: 'STT', flex: (70 / totalWidth) * 100 },
    { field: 'full_name', headerName: 'Họ tên', flex: (200 / totalWidth) * 100 },
    { field: 'email', headerName: 'Email', flex: (250 / totalWidth) * 100 },
    { field: 'phone_number', headerName: 'Số điện thoại', flex: (130 / totalWidth) * 100 },
    { field: 'company_name', headerName: 'Tên doanh nghiệp', flex: (300 / totalWidth) * 100 },
    { field: 'company_description', headerName: 'Mô tả', flex: (380 / totalWidth) * 100 },
    { field: 'company_website', headerName: 'Website', flex: (250 / totalWidth) * 100 },
    {
        field: 'actions',
        headerName: 'Hành động',
        flex: (180 / totalWidth) * 100,
        sortable: false,
        Padding: 3,
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

const paginationModel = { page: 0, pageSize: 10 };

export default function DataTable({rows}) {
    return (
        <Paper sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
                hideFooter
            />
        </Paper>
    );
}
