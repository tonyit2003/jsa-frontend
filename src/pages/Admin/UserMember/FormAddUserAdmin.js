import * as React from "react";
import { Box, TextField, Button, Typography, Stack, Paper, Avatar } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { addUserAdmin } from "~/services/UserAdminService";
import userType from "~/constants/userType";
import { useNavigate } from "react-router-dom";
import config from "~/config";

export default function FormAddUserAdmin() {
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({
        full_name: "",
        email: "",
        password: "",
        phone_number: "",
    });

    const [errors, setErrors] = React.useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        let newErrors = {};
        if (!formData.full_name.trim()) {
            newErrors.full_name = "Họ tên không được để trống";
        } else if (formData.full_name.length < 3) {
            newErrors.full_name = "Họ tên phải có ít nhất 3 ký tự";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = "Email không được để trống";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Email không hợp lệ";
        }

        if (!formData.password.trim()) {
            newErrors.password = "Mật khẩu không được để trống";
        } else if (formData.password.length < 6) {
            newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
        }

        const phoneRegex = /^\d{10}$/;
        if (!formData.phone_number.trim()) {
            newErrors.phone_number = "Số điện thoại không được để trống";
        } else if (!phoneRegex.test(formData.phone_number)) {
            newErrors.phone_number = "Số điện thoại phải có đúng 10 chữ số";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await addUserAdmin(
                    formData.full_name,
                    formData.email,
                    formData.password,
                    formData.phone_number,
                    userType.ADMIN
                )
                alert('Thêm thành viên thành công!');
                navigate(config.routes.userMember);
            } catch (error) {
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.message
                ) {
                    setErrors(error.response.data.message);
                } else {
                    setErrors("Thêm thành viên không thành công. Hãy thử lại sau.");
                }
            }
        }
    };

    return (
        <Paper
            elevation={4}
            sx={{
                width: "520px",
                padding: "32px",
                borderRadius: "16px",
                background: "#fff",
                boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
                margin: "auto",
            }}
        >
            <Avatar sx={{ bgcolor: "primary.main", width: 56, height: 56, margin: "auto", mb: 2 }}>
                <PersonAddIcon fontSize="large" />
            </Avatar>

            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "primary.main" }}>
                Thêm thành viên
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <TextField
                        label="Họ Tên"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        error={!!errors.full_name}
                        helperText={errors.full_name}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        label="Mật khẩu"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        label="Số điện thoại"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        error={!!errors.phone_number}
                        helperText={errors.phone_number}
                        fullWidth
                        variant="standard"
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                        sx={{
                            borderRadius: "8px",
                            fontWeight: "bold",
                            padding: "12px 0",
                            backgroundColor: "#1976d2",
                            "&:hover": { backgroundColor: "#115293" },
                        }}
                    >
                        Thêm mới
                    </Button>
                </Stack>
            </Box>
        </Paper>
    );
}
