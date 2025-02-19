import * as React from 'react';
import {
    Box, Button, Checkbox, CssBaseline, FormControlLabel, Divider,
    FormLabel, FormControl, Link, TextField, Typography, Stack, Card as MuiCard
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ForgotPassword from '~/templates/sign-in/components/ForgotPassword';
import AppTheme from '~/templates/shared-theme/AppTheme';
import ColorModeSelect from '~/templates/shared-theme/ColorModeSelect';
import { GoogleIcon, FacebookIcon } from '~/templates/sign-in/components/CustomIcons';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '~/services/UserService';
import { UserContext } from '~/context/UserProvider';
import config from "~/config";
import userType from '~/constants/userType';

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '450px',
    },
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
    height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
}));

export default function LoginAdmin(props) {
    const [email, setEmail] = React.useState("caotancong2003@gmail.com");
    const [password, setPassword] = React.useState("123456aA@");
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    const navigate = useNavigate();
    const { setAuth } = React.useContext(UserContext);

    // Mở và đóng modal quên mật khẩu
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Kiểm tra đầu vào hợp lệ
    const validateInputs = () => {
        let isValid = true;

        if (!email.trim() || !/\S+@\S+\.\S+/.test(email.trim())) {
            setEmailError(true);
            setEmailErrorMessage('Vui lòng nhập địa chỉ email hợp lệ.');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        if (!password.trim() || password.trim().length < 6) {
            setPasswordError(true);
            setPasswordErrorMessage('Mật khẩu phải dài ít nhất 6 ký tự.');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        return isValid;
    };

    // Xử lý đăng nhập
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");

        if (!validateInputs()) {
            setLoading(false);
            return;
        }

        try {
            const res = await loginUser(email, password);

            if (res.token && res.user) {
                localStorage.setItem(process.env.REACT_APP_AUTH_TOKEN_KEY, res.token);
                setAuth({
                    isAuth: true,
                    full_name: res.user.full_name,
                    email: res.user.email,
                    phone_number: res.user.phone_number,
                    user_type: res.user.user_type,
                });

                if (res.user.user_type === userType.ADMIN) {
                    navigate(config.routes.dashboard);
                } else {
                    setError("Bạn không có quyền truy cập.");
                }
            } else {
                setError("Đăng nhập không thành công. Hãy thử lại sau.");
            }
        } catch (error) {
            console.log(error);
            
            setError(error.response?.data?.message || "Đăng nhập không thành công. Hãy thử lại sau.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />
            <SignInContainer direction="column" justifyContent="space-between">
                <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
                <Card variant="outlined">
                    <Typography component="h1" variant="h4" sx={{ fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
                        ĐĂNG NHẬP QUẢN TRỊ
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}>
                        <FormControl>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <TextField
                                error={emailError}
                                helperText={emailErrorMessage}
                                id="email"
                                type="email"
                                name="email"
                                placeholder="your@email.com"
                                autoComplete="email"
                                required
                                fullWidth
                                variant="outlined"
                                color={emailError ? 'error' : 'primary'}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="password">Mật khẩu</FormLabel>
                            <TextField
                                error={passwordError}
                                helperText={passwordErrorMessage}
                                name="password"
                                placeholder="••••••"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                required
                                fullWidth
                                variant="outlined"
                                color={passwordError ? 'error' : 'primary'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Nhớ tài khoản" />
                        <ForgotPassword open={open} handleClose={handleClose} />
                        {error && <Typography color="error" textAlign="center">{error}</Typography>}
                        <Button type="submit" fullWidth variant="contained" disabled={loading}>
                            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                        </Button>
                        <Link component="button" type="button" onClick={handleClickOpen} variant="body2" sx={{ alignSelf: 'center' }}>
                            Quên mật khẩu?
                        </Link>
                    </Box>
                    <Divider>hoặc</Divider>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Button fullWidth variant="outlined" onClick={() => alert('Đăng nhập với Google')} startIcon={<GoogleIcon />}>
                            Đăng nhập với Google
                        </Button>
                        <Button fullWidth variant="outlined" onClick={() => alert('Đăng nhập với Facebook')} startIcon={<FacebookIcon />}>
                            Đăng nhập với Facebook
                        </Button>
                    </Box>
                </Card>
            </SignInContainer>
        </AppTheme>
    );
}
