import { Button, Grid2, Paper, TextField } from "@mui/material";
import UpdateCompanyInfoModal from "../UpdateCompanyInfoModal";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "~/config";
import { updateCompanyInformation } from "~/services/UserRecruiterService";
import { UserContext } from "~/context/UserProvider";

function CompanyInformation() {
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();
    // eslint-disable-next-line no-unused-vars
    const { auth, setAuth } = useContext(UserContext);

    const handleOpenModal = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);
    const handleSubmit = async ({ name, website, description }) => {
        const token = localStorage.getItem(
            process.env.REACT_APP_AUTH_TOKEN_KEY
        );
        if (!auth.isAuth && !token) {
            navigate(config.routes.login);
            return;
        }
        try {
            const res = await updateCompanyInformation(
                token,
                name,
                description,
                website
            );
            if (res && res.status === "success") {
                handleClose();
            }
        } catch (error) {
            console.log(error);
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
            } else {
            }
        }
    };

    return (
        <>
            <Paper
                elevation={3}
                sx={{
                    padding: "10px",
                }}
            >
                <Grid2
                    container
                    spacing={2}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    <Grid2>
                        <strong>Thông tin công ty</strong>
                    </Grid2>
                    <Grid2>
                        <Button
                            variant="contained"
                            color="success"
                            fullWidth
                            onClick={handleOpenModal}
                        >
                            Cập nhật thông tin
                        </Button>
                    </Grid2>
                </Grid2>
                <br />
                <Grid2 container spacing={2}>
                    <Grid2 size={6}>
                        <TextField
                            label="Tên công ty"
                            variant="outlined"
                            disabled
                            fullWidth
                            name="companyName"
                        />
                    </Grid2>
                    <Grid2 size={6}>
                        <TextField
                            label="Website"
                            variant="outlined"
                            disabled
                            fullWidth
                            name="companyWebsite"
                        />
                    </Grid2>
                    <Grid2 size={12}>
                        <TextField
                            label="Mô tả"
                            variant="outlined"
                            multiline
                            disabled
                            fullWidth
                            maxRows={5}
                            name="companyDescription"
                        />
                    </Grid2>
                </Grid2>
            </Paper>
            <UpdateCompanyInfoModal
                isOpen={openModal}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
            />
        </>
    );
}

export default CompanyInformation;
