import React from "react";
import { Snackbar, Alert, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
import {
    FaCheckCircle,
    FaExclamationTriangle,
    FaInfoCircle,
    FaTimesCircle,
} from "react-icons/fa";

const StyledAlert = styled(Alert)(({ theme }) => ({
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
    padding: theme.spacing(2),
    "& .MuiAlert-message": {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
}));

const getIcon = (type) => {
    switch (type) {
        case "success":
            return <FaCheckCircle size={24} />;
        case "error":
            return <FaTimesCircle size={24} />;
        case "warning":
            return <FaExclamationTriangle size={24} />;
        case "info":
            return <FaInfoCircle size={24} />;
        default:
            return null;
    }
};

const AlertCustomize = ({
    open,
    type,
    message,
    onClose,
    autoHideDuration = 3000,
}) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={onClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
            <StyledAlert
                severity={type}
                icon={getIcon(type)}
                action={
                    <Button color="inherit" size="small" onClick={onClose}>
                        Đóng
                    </Button>
                }
            >
                <Typography variant="body1" component="div">
                    {message}
                </Typography>
            </StyledAlert>
        </Snackbar>
    );
};

export default AlertCustomize;
