import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    IconButton,
    InputAdornment,
    CircularProgress,
    Paper,
    Alert,
    Fade,
    Switch,
    Stack,
} from "@mui/material";
import { styled } from "@mui/system";
import {
    MdVisibility,
    MdVisibilityOff,
    MdEmail,
    MdLock,
    MdPerson,
    MdSmartphone,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { logo as logoIcon } from "~/assets/Images";
import config from "~/config";
import {
    calculatePasswordStrength,
    formatPhoneNumber,
    removeDots,
} from "~/utils/helper";
import { registerUser } from "~/services/UserService";

const StyledPaper = styled(Paper)(({ theme }) => ({
    display: "flex",
    height: "100px",
    minHeight: "100vh",
    overflow: "hidden",
    background: "#fff",
}));

const LeftPanel = styled(Box)(({ theme }) => ({
    flex: 1,
    position: "relative",
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    "&::before": {
        content: '""',
        position: "absolute",
        width: "200%",
        height: "200%",
        background: "#008bf933",
        animation: "ripple 15s infinite linear",
    },
    "@keyframes ripple": {
        "0%": { transform: "translate(-50%, -50%) rotate(0deg)" },
        "100%": { transform: "translate(-50%, -50%) rotate(360deg)" },
    },
    "@media (max-width: 960px)": {
        display: "none",
    },
}));

const LogoIcon = styled("img")({
    background: "#fff",
    width: "50%",
    borderRadius: "20px",
    cursor: "pointer",
});

const RightPanel = styled(Box)(({ theme }) => ({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px",
    backgroundColor: "#fafafa",
}));

const LoginForm = styled(Box)(({ theme }) => ({
    width: "100%",
    maxWidth: "400px",
}));

const PasswordStrengthMeter = styled(Box)(({ strength }) => ({
    height: "4px",
    width: "100%",
    background: "#e0e0e0",
    position: "relative",
    marginTop: "8px",
    "&::before": {
        content: '""',
        position: "absolute",
        height: "100%",
        width: `${strength}%`,
        background:
            strength < 33 ? "#f44336" : strength < 66 ? "#ffa726" : "#66bb6a",
        transition: "width 0.3s ease",
    },
}));

const UserTypeSwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
        margin: 1,
        padding: 0,
        transform: "translateX(6px)",
        "&.Mui-checked": {
            color: "#fff",
            transform: "translateX(22px)",
            "& .MuiSwitch-thumb:before": {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                    "#fff"
                )}" d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10-2h4v2h-4V4zm10 14H4V8h16v10z"/></svg>')`,
            },
            "& + .MuiSwitch-track": {
                opacity: 1,
                backgroundColor: "#aab4be",
                ...theme.applyStyles("dark", {
                    backgroundColor: "#8796A5",
                }),
            },
        },
    },
    "& .MuiSwitch-thumb": {
        backgroundColor: "#001e3c",
        width: 32,
        height: 32,
        "&::before": {
            content: "''",
            position: "absolute",
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                "#fff"
            )}" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>')`,
        },
        ...theme.applyStyles("dark", {
            backgroundColor: "#003892",
        }),
    },
    "& .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#aab4be",
        borderRadius: 20 / 2,
        ...theme.applyStyles("dark", {
            backgroundColor: "#8796A5",
        }),
    },
}));

const Register = () => {
    const [fullname, setFullname] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [rePassword, setRePassword] = useState("");
    const [showRePassword, setShowRePassword] = useState(false);
    const [errorRePassword, setErrorRePassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [jobSeeker, setJobSeeker] = useState(true);

    const navigate = useNavigate();

    const redirectHome = () => {
        navigate(config.routes.home);
    };

    const redirectLogin = () => {
        navigate(config.routes.login);
    };

    const handlePhoneChange = (e) => {
        const inputValue = e.target.value;
        setPhoneNumber(formatPhoneNumber(inputValue));
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setPasswordStrength(calculatePasswordStrength(newPassword));
    };

    const handleRePasswordChange = (e) => {
        const rePassword = e.target.value;
        setRePassword(rePassword);
        if (rePassword !== password) {
            setErrorRePassword("Mật khẩu không trùng khớp");
        } else {
            setErrorRePassword("");
        }
    };

    const switchUserType = () => {
        setJobSeeker(!jobSeeker);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await registerUser(
                fullname,
                email,
                password,
                rePassword,
                removeDots(phoneNumber),
                jobSeeker ? "candidate" : "recruiter"
            );
            console.log(res);
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                setError(error.response.data.message);
            } else {
                setError("Đăng ký không thành công. Hãy thử lại sau.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <StyledPaper elevation={0}>
            <LeftPanel>
                <LogoIcon onClick={redirectHome} src={logoIcon} />
            </LeftPanel>

            <RightPanel>
                <LoginForm component="form" onSubmit={handleSubmit}>
                    <Typography variant="h4" gutterBottom>
                        Đăng ký
                    </Typography>

                    {error && (
                        <Fade in={!!error}>
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {error}
                            </Alert>
                        </Fade>
                    )}

                    <TextField
                        required
                        fullWidth
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <MdEmail />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        fullWidth
                        label="Họ và tên"
                        variant="outlined"
                        margin="normal"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <MdPerson />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        type="text"
                        fullWidth
                        label="Số điện thoại"
                        variant="outlined"
                        margin="normal"
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <MdSmartphone />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        required
                        fullWidth
                        label="Mật khẩu"
                        type={showPassword ? "text" : "password"}
                        variant="outlined"
                        margin="normal"
                        value={password}
                        onChange={handlePasswordChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <MdLock />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        edge="end"
                                    >
                                        {showPassword ? (
                                            <MdVisibilityOff />
                                        ) : (
                                            <MdVisibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <PasswordStrengthMeter strength={passwordStrength} />

                    <TextField
                        required
                        fullWidth
                        label="Nhập lại mật khẩu"
                        type={showRePassword ? "text" : "password"}
                        variant="outlined"
                        margin="normal"
                        value={rePassword}
                        error={errorRePassword !== ""}
                        helperText={errorRePassword}
                        onChange={handleRePasswordChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <MdLock />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() =>
                                            setShowRePassword(!showRePassword)
                                        }
                                        edge="end"
                                    >
                                        {showRePassword ? (
                                            <MdVisibilityOff />
                                        ) : (
                                            <MdVisibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{ alignItems: "center" }}
                    >
                        <Typography
                            style={{ color: jobSeeker ? "#000" : "#9d9b9b" }}
                        >
                            Người tìm việc
                        </Typography>
                        <UserTypeSwitch onChange={switchUserType} />
                        <Typography
                            style={{ color: jobSeeker ? "#9d9b9b" : "#000" }}
                        >
                            Nhà tuyển dụng
                        </Typography>
                    </Stack>

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        size="large"
                        type="submit"
                        disabled={loading}
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {loading ? <CircularProgress size={24} /> : "Đăng ký"}
                    </Button>

                    <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                        Bạn đã có tài khoản?{" "}
                        <Button color="primary" onClick={redirectLogin}>
                            Đăng nhập
                        </Button>
                    </Typography>
                </LoginForm>
            </RightPanel>
        </StyledPaper>
    );
};

export default Register;
