import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Box, IconButton, Stack, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const totalWidth = 1560;

const columns = (handleDelete) => [
    {
        field: 'id',
        headerName: 'STT',
        flex: (70 / totalWidth) * 100,
        renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,
    },
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

export default function DataTable({ rows, onPageChange, onDelete }) {
    const [paginationModel, setPaginationModel] = React.useState({ page: 0, pageSize: 10 });

    const handlePageChange = (params) => {
        setPaginationModel({ ...paginationModel, page: params.page });
        onPageChange(params.page + 1);
    };

    return (
        <Paper sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <DataGrid
                rows={rows}
                columns={columns(onDelete)}
                hideFooter
                paginationModel={paginationModel}
                onPaginationModelChange={handlePageChange}
                checkboxSelection
                sx={{ border: 0 }}
            />
        </Paper>
    );
}
