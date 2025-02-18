import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Box, IconButton, Stack, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const totalWidth = 1560;

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
    { field: 'resume', headerName: 'Tóm tắt', flex: (300 / totalWidth) * 100 },
    { field: 'skills', headerName: 'Kỹ năng', flex: (300 / totalWidth) * 100 },
    { field: 'experience', headerName: 'Kinh nghiệm', flex: (130 / totalWidth) * 100 },
    { field: 'education', headerName: 'Học vấn', flex: (180 / totalWidth) * 100 },
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
        email: 'jon.snow@got.com',
        phone: '0123456789',
        resume: 'Chiến binh phương Bắc',
        skills: 'Kiếm thuật, chiến lược',
        experience: '10 năm chiến đấu',
        education: 'Học viện Hiệp Sĩ',
    },
    {
        id: 2,
        fullName: 'Cersei Lannister',
        email: 'cersei.lannister@got.com',
        phone: '0987654321',
        resume: 'Nữ hoàng Westeros',
        skills: 'Mưu lược, chính trị',
        experience: '15 năm trị vì',
        education: 'Hoàng gia Lannister',
    },
    {
        id: 3,
        fullName: 'Jaime Lannister',
        email: 'jaime.lannister@got.com',
        phone: '0345678923',
        resume: 'Kỵ sĩ hoàng gia',
        skills: 'Kiếm thuật, cưỡi ngựa',
        experience: '20 năm chiến đấu',
        education: 'Học viện Kỵ Sĩ',
    },
    {
        id: 4,
        fullName: 'Arya Stark',
        email: 'arya.stark@got.com',
        phone: '0556677889',
        resume: 'Sát thủ vô diện',
        skills: 'Ẩn thân, chiến đấu',
        experience: '5 năm huấn luyện',
        education: 'Nhà Trắng Đen',
    },
    {
        id: 5,
        fullName: 'Daenerys Targaryen',
        email: 'daenerys.targaryen@got.com',
        phone: '0667788990',
        resume: 'Mẹ Rồng',
        skills: 'Chiến thuật, giao tiếp với rồng',
        experience: '10 năm lãnh đạo',
        education: 'Triều đình Valyria',
    },
    {
        id: 6,
        fullName: 'Melisandre',
        email: 'melisandre@got.com',
        phone: '0778899001',
        resume: 'Nữ tư tế đỏ',
        skills: 'Phép thuật, bói toán',
        experience: 'Hơn 100 năm',
        education: `Đền Rhllor`,
    },
    {
        id: 7,
        fullName: 'Ferrara Clifford',
        email: 'ferrara.clifford@got.com',
        phone: '0889900112',
        resume: 'Chiến binh',
        skills: 'Cận chiến',
        experience: '12 năm',
        education: 'Học viện Chiến Binh',
    },
    {
        id: 8,
        fullName: 'Rossini Frances',
        email: 'rossini.frances@got.com',
        phone: '0990011223',
        resume: 'Cố vấn hoàng gia',
        skills: 'Chính trị, ngoại giao',
        experience: '20 năm',
        education: 'Học viện Ngoại Giao',
    },
    {
        id: 9,
        fullName: 'Harvey Roxie',
        email: 'harvey.roxie@got.com',
        phone: '0112233445',
        resume: 'Nhà buôn',
        skills: 'Thương mại, đàm phán',
        experience: '30 năm',
        education: 'Học viện Thương Mại',
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
