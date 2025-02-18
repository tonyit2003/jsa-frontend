import React, { useState } from "react";
import { Alert, Typography, Button, Box } from "@mui/material";
import { styled } from "@mui/system";
import {
    FaCheckCircle,
    FaExclamationTriangle,
    FaInfoCircle,
    FaTimesCircle,
} from "react-icons/fa";

const StyledAlert = styled(Alert)(({ severity }) => ({
    borderRadius: "8px",
    minWidth: "320px",
    maxWidth: "600px",
    padding: "16px",
    "& .MuiAlert-icon": {
        fontSize: "24px",
        marginRight: "12px",
    },
    backgroundColor:
        severity === "success"
            ? "#e8f5e9"
            : severity === "error"
            ? "#ffebee"
            : severity === "warning"
            ? "#fff3e0"
            : "#e3f2fd",
}));

const AlertProvider = ({ children }) => {
    const [open, setOpen] = useState(true);
    const [alerts, setAlerts] = useState([
        {
            id: 1,
            type: "success",
            title: "Success!",
            message: "Your action has been completed successfully.",
            icon: <FaCheckCircle />,
        },
        {
            id: 2,
            type: "error",
            title: "Error!",
            message: "An error occurred while processing your request.",
            icon: <FaTimesCircle />,
        },
        {
            id: 3,
            type: "warning",
            title: "Warning!",
            message: "Please review the information before proceeding.",
            icon: <FaExclamationTriangle />,
        },
        {
            id: 4,
            type: "info",
            title: "Information",
            message: "Here's something you should know.",
            icon: <FaInfoCircle />,
        },
    ]);

    const handleClose = (id) => {
        setAlerts((prevAlerts) =>
            prevAlerts.filter((alert) => alert.id !== id)
        );
    };

    const handleDemoAlert = () => {
        setAlerts([
            {
                id: Date.now(),
                type: "success",
                title: "New Alert!",
                message: "This is a demonstration of a new alert.",
                icon: <FaCheckCircle />,
            },
            ...alerts,
        ]);
    };

    return (
        <Box
            sx={{
                position: "fixed",
                top: 20,
                right: 20,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                zIndex: 9999,
            }}
            role="alert"
        >
            {alerts.map((alert) => (
                <StyledAlert
                    key={alert.id}
                    severity={alert.type}
                    icon={alert.icon}
                    onClose={() => handleClose(alert.id)}
                    action={
                        <Button
                            color={alert.type}
                            size="small"
                            variant="text"
                            onClick={() => handleClose(alert.id)}
                            aria-label={`Dismiss ${alert.type} alert`}
                        >
                            Dismiss
                        </Button>
                    }
                >
                    <Typography
                        variant="subtitle1"
                        component="div"
                        fontWeight="bold"
                    >
                        {alert.title}
                    </Typography>
                    <Typography variant="body2">{alert.message}</Typography>
                </StyledAlert>
            ))}
            <Box sx={{ position: "fixed", bottom: 20, right: 20 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleDemoAlert}
                    aria-label="Show demo alert"
                >
                    Show Demo Alert
                </Button>
            </Box>
        </Box>
    );
};

export default AlertProvider;
