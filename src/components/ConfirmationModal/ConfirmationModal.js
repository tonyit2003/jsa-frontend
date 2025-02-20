// src/components/ConfirmationModal/ConfirmationModal.jsx
import React from "react";
import {
    Modal,
    Box,
    Typography,
    Button,
    Backdrop,
    Fade,
    useMediaQuery,
    IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import { IoClose } from "react-icons/io5";

const StyledModal = styled(Modal)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const ModalContainer = styled(Box)(({ theme }) => ({
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "24px",
    position: "relative",
    outline: "none",
    maxWidth: "90%",
    width: "450px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
    "@supports (backdrop-filter: blur(8px))": {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(8px)",
    },
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "24px",
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
    position: "absolute",
    right: "8px",
    top: "8px",
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
        transform: "rotate(90deg)",
    },
}));

const ConfirmationModal = ({
    open,
    onClose,
    onConfirm,
    title = "Confirm Deletion",
    description = "Are you sure you want to delete this item? This action cannot be undone.",
    cancelText = "Cancel",
    confirmText = "Delete",
    ...props
}) => {
    const isMobile = useMediaQuery("(max-width:600px)");

    return (
        <StyledModal
            open={open}
            onClose={onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            aria-labelledby="confirmation-modal-title"
            aria-describedby="confirmation-modal-description"
            {...props}
        >
            <Fade in={open}>
                <ModalContainer
                    sx={{
                        width: isMobile ? "85%" : "450px",
                        padding: isMobile ? "20px" : "24px",
                    }}
                >
                    <CloseButton
                        onClick={onClose}
                        aria-label="Close confirmation modal"
                    >
                        <IoClose />
                    </CloseButton>

                    <Typography
                        id="confirmation-modal-title"
                        variant="h6"
                        component="h2"
                        gutterBottom
                        sx={{ pr: 4 }}
                    >
                        {title}
                    </Typography>

                    <Typography
                        id="confirmation-modal-description"
                        variant="body1"
                        sx={{ mb: 2 }}
                    >
                        {description}
                    </Typography>

                    <ButtonContainer>
                        <Button
                            variant="outlined"
                            onClick={onClose}
                            sx={{
                                transition: "all 0.2s",
                                "&:hover": {
                                    transform: "translateY(-2px)",
                                },
                            }}
                        >
                            {cancelText}
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={onConfirm}
                            sx={{
                                transition: "all 0.2s",
                                "&:hover": {
                                    transform: "translateY(-2px)",
                                },
                            }}
                            autoFocus
                        >
                            {confirmText}
                        </Button>
                    </ButtonContainer>
                </ModalContainer>
            </Fade>
        </StyledModal>
    );
};

export default ConfirmationModal;
