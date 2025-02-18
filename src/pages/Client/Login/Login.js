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
    Divider,
    Alert,
    Fade,
} from "@mui/material";
import { styled } from "@mui/system";
import { FaGoogle, FaGithub, FaApple } from "react-icons/fa";
import { MdVisibility, MdVisibilityOff, MdEmail, MdLock } from "react-icons/md";
import { logo as logoIcon } from "~/assets/Images";
import { useNavigate } from "react-router-dom";
import config from "~/config";

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

const SocialButton = styled(Button)(({ theme }) => ({
    width: "100%",
    marginBottom: "16px",
    textTransform: "none",
    fontSize: "16px",
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

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const redirectHome = () => {
        navigate(config.routes.home);
    };

    const redirectRegister = () => {
        navigate(config.routes.register);
    };

    const calculatePasswordStrength = (pass) => {
        let strength = 0;
        if (pass.length > 6) strength += 20;
        if (pass.match(/[A-Z]/)) strength += 20;
        if (pass.match(/[0-9]/)) strength += 20;
        if (pass.match(/[^A-Za-z0-9]/)) strength += 20;
        if (pass.length > 10) strength += 20;
        return strength;
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setPasswordStrength(calculatePasswordStrength(newPassword));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Simulated API call
            await new Promise((resolve) => setTimeout(resolve, 2000));
            // Add your actual login logic here
            console.log("Login successful");
        } catch (err) {
            setError("Invalid credentials. Please try again.");
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
                        Đăng nhập
                    </Typography>

                    {error && (
                        <Fade in={!!error}>
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {error}
                            </Alert>
                        </Fade>
                    )}

                    <TextField
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

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        size="large"
                        type="submit"
                        disabled={loading}
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {loading ? <CircularProgress size={24} /> : "Đăng nhập"}
                    </Button>

                    <Divider sx={{ my: 3 }}>hoặc</Divider>

                    <SocialButton
                        variant="outlined"
                        startIcon={<FaGoogle />}
                        onClick={() => console.log("Google login")}
                    >
                        Đăng nhập với Google
                    </SocialButton>

                    <SocialButton
                        variant="outlined"
                        startIcon={<FaGithub />}
                        onClick={() => console.log("GitHub login")}
                    >
                        Đăng nhập với GitHub
                    </SocialButton>

                    <SocialButton
                        variant="outlined"
                        startIcon={<FaApple />}
                        onClick={() => console.log("Apple login")}
                    >
                        Đăng nhập với Apple
                    </SocialButton>

                    <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                        Bạn chưa có tài khoản?{" "}
                        <Button color="primary" onClick={redirectRegister}>
                            Đăng ký
                        </Button>
                    </Typography>
                </LoginForm>
            </RightPanel>
        </StyledPaper>
    );
};

export default Login;
