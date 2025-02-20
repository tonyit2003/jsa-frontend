import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    IconButton,
    useMediaQuery,
    Grid2,
} from "@mui/material";
import { styled } from "@mui/system";
import { useLayoutEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

const StyledModal = styled(Modal)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& .MuiBackdrop-root": {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
}));

const ModalContent = styled(Box)(({ theme }) => ({
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "32px",
    position: "relative",
    width: "50%",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    transform: "translateY(0px)",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
        transform: "translateY(-2px)",
    },
}));

const CloseButton = styled(IconButton)({
    position: "absolute",
    right: "16px",
    top: "16px",
    color: "#666",
    "&:hover": {
        color: "#000",
    },
});

const SubscribeButton = styled(Button)({
    marginTop: "24px",
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    fontSize: "16px",
    textTransform: "none",
    backgroundColor: "#2196f3",
    "&:hover": {
        backgroundColor: "#1976d2",
    },
});

const UpdateCompanyInfoModal = ({
    isOpen,
    handleClose,
    handleSubmit,
    data,
}) => {
    const isMobile = useMediaQuery("(max-width:600px)");

    const [name, setName] = useState("");
    const [website, setWebsite] = useState("");
    const [description, setDescription] = useState("");

    const handleCloseModal = () => {
        setName("");
        setWebsite("");
        setDescription("");
        handleClose();
    };

    useLayoutEffect(() => {
        if (data) {
            setName(data.name);
            setWebsite(data.website);
            setDescription(data.description);
        }
    }, [data]);

    return (
        <>
            <StyledModal
                open={isOpen}
                onClose={handleCloseModal}
                aria-labelledby="company-information-modal-title"
                aria-describedby="company-information-modal-description"
            >
                <ModalContent sx={{ p: isMobile ? 3 : 4 }}>
                    <CloseButton
                        onClick={handleCloseModal}
                        aria-label="close company-information modal"
                    >
                        <IoClose size={24} />
                    </CloseButton>

                    <Box sx={{ textAlign: "center" }}>
                        <Typography
                            id="company-information-modal-title"
                            variant="h5"
                            component="h2"
                            sx={{ mt: 2, fontWeight: 600 }}
                        >
                            Thông tin công ty
                        </Typography>

                        <Typography
                            id="company-information-modal-description"
                            sx={{
                                mt: 2,
                                color: "#666",
                                textAlign: "left",
                                py: 2,
                            }}
                        >
                            Hãy cung cấp những thông tin chi tiết về công ty của
                            bạn. Những thông tin nãy sẽ giúp Người ứng tuyển
                            biết rõ hơn về công ty của bạn.
                        </Typography>

                        <Grid2 container spacing={2}>
                            <TextField
                                label="Nhập tên công ty"
                                fullWidth
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextField
                                label="Nhập website"
                                fullWidth
                                value={website}
                                onChange={(e) => setWebsite(e.target.value)}
                            />
                            <TextField
                                label="Nhập mô tả"
                                multiline
                                maxRows={5}
                                fullWidth
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Grid2>

                        <SubscribeButton
                            variant="contained"
                            onClick={() => {
                                handleSubmit({ name, website, description });
                            }}
                            aria-label="subscribe to company-information"
                        >
                            Lưu
                        </SubscribeButton>
                    </Box>
                </ModalContent>
            </StyledModal>
        </>
    );
};

export default UpdateCompanyInfoModal;
