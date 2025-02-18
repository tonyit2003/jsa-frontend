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
    { field: 'fullName', headerName: 'Họ tên', flex: (200 / totalWidth) * 100 },
    { field: 'email', headerName: 'Email', flex: (250 / totalWidth) * 100 },
    { field: 'phone', headerName: 'Số điện thoại', flex: (130 / totalWidth) * 100 },
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

const rows = [
    {
        id: 1,
        fullName: 'Jon Snow',
        email: 'jon.snow@winterfell.com',
        phone: '0123-456-789',
        company_name: 'Winterfell Holdings',
        company_description: 'Lãnh đạo phương Bắc',
        company_website: 'https://winterfell.com'
    },
    {
        id: 2,
        fullName: 'Cersei Lannister',
        email: 'cersei.lannister@redkeep.com',
        phone: '0987-654-321',
        company_name: 'Red Keep Empire',
        company_description: 'Nữ hoàng Westeros',
        company_website: 'https://redkeep.com'
    },
    {
        id: 3,
        fullName: 'Jaime Lannister',
        email: 'jaime.lannister@casterlyrock.com',
        phone: '0345-678-910',
        company_name: 'Casterly Rock Bank',
        company_description: 'Hiệp sĩ hoàng gia',
        company_website: 'https://casterlyrock.com'
    },
    {
        id: 4,
        fullName: 'Arya Stark',
        email: 'arya.stark@faceless.com',
        phone: '0555-666-777',
        company_name: 'House of Black and White',
        company_description: 'Sát thủ vô diện',
        company_website: 'https://faceless.com'
    },
    {
        id: 5,
        fullName: 'Daenerys Targaryen',
        email: 'daenerys@dragonstone.com',
        phone: '0666-777-888',
        company_name: 'Targaryen Dynasty',
        company_description: 'Mẹ Rồng',
        company_website: 'https://dragonstone.com'
    },
    {
        id: 6,
        fullName: 'Melisandre',
        email: 'melisandre@rhllor.com',
        phone: '0777-888-999',
        company_name: 'Priests of R\'hllor',
        company_description: 'Nữ tư tế đỏ',
        company_website: 'https://rhllor.com'
    },
    {
        id: 7,
        fullName: 'Ferrara Clifford',
        email: 'ferrara.clifford@mercenaries.com',
        phone: '0888-999-000',
        company_name: 'Golden Company',
        company_description: 'Lính đánh thuê hàng đầu',
        company_website: 'https://goldencompany.com'
    },
    {
        id: 8,
        fullName: 'Rossini Frances',
        email: 'rossini.frances@tradeguild.com',
        phone: '0999-000-111',
        company_name: 'Westeros Trade Guild',
        company_description: 'Hội thương gia quyền lực',
        company_website: 'https://tradeguild.com'
    },
    {
        id: 9,
        fullName: 'Harvey Roxie',
        email: 'harvey.roxie@ironbank.com',
        phone: '0111-222-333',
        company_name: 'Iron Bank of Braavos',
        company_description: 'Ngân hàng mạnh nhất',
        company_website: 'https://ironbank.com'
    },
];

const paginationModel = { page: 0, pageSize: 10 };

export default function DataTable() {
    return (
        <Paper sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
            />
        </Paper>
    );
}
