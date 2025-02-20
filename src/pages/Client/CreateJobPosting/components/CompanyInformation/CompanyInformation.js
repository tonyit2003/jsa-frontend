import { Button, Grid2, Paper, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import UpdateCompanyInfoModal from "../UpdateCompanyInfoModal";
import config from "~/config";
import {
    getCompanyInformation,
    updateCompanyInformation,
} from "~/services/UserRecruiterService";
import { UserContext } from "~/context/UserProvider";
import AlertCustomize from "~/components/AlertCustomize";

function CompanyInformation() {
    const [openModal, setOpenModal] = useState(false);
    const [name, setName] = useState("");
    const [website, setWebsite] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState({
        open: false,
        message: "",
        type: "success",
    });

    const navigate = useNavigate();
    // eslint-disable-next-line no-unused-vars
    const { auth, setAuth } = useContext(UserContext);

    const getInfo = async () => {
        try {
            if (auth.isAuth && auth.token) {
                const res = await getCompanyInformation(auth.token);
                if (res.status === "success" && res.data) {
                    setName(res.data.company_name);
                    setWebsite(res.data.company_website);
                    setDescription(res.data.company_description);
                }
            } else {
                navigate(config.routes.login);
            }
        } catch (error) {
            setName("");
            setWebsite("");
            setDescription("");
        }
    };

    useEffect(() => {
        getInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOpenModal = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);
    const handleSubmit = async ({ name, website, description }) => {
        if (!auth.isAuth || !auth.token) {
            navigate(config.routes.login);
            return;
        }
        try {
            const res = await updateCompanyInformation(
                auth.token,
                name,
                description,
                website
            );
            if (res && res.status === "success") {
                setName(name);
                setWebsite(website);
                setDescription(description);
                handleClose();
                setMessage({
                    open: true,
                    message: res.message,
                    type: "success",
                });
            } else {
                setMessage({
                    open: true,
                    message: "Có lỗi xảy ra, vui lòng thử lại sau",
                    type: "error",
                });
            }
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                navigate(config.routes.home);
                setMessage({
                    open: true,
                    message: error.response.data.message,
                    type: "error",
                });
            } else {
                setMessage({
                    open: true,
                    message: "Có lỗi xảy ra, vui lòng thử lại sau",
                    type: "error",
                });
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
                            fullWidth
                            name="companyName"
                            value={name}
                            onChange={() => {
                                setName(name);
                            }}
                        />
                    </Grid2>
                    <Grid2 size={6}>
                        <TextField
                            label="Website"
                            variant="outlined"
                            fullWidth
                            name="companyWebsite"
                            value={website}
                            onChange={() => setWebsite(website)}
                        />
                    </Grid2>
                    <Grid2 size={12}>
                        <TextField
                            label="Mô tả"
                            variant="outlined"
                            multiline
                            fullWidth
                            maxRows={5}
                            name="companyDescription"
                            value={description}
                            onChange={() => setDescription(description)}
                        />
                    </Grid2>
                </Grid2>
            </Paper>
            <UpdateCompanyInfoModal
                data={{ name, website, description }}
                isOpen={openModal}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
            />
            <AlertCustomize
                open={message.open}
                type={message.type}
                message={message.message}
                onClose={() =>
                    setMessage({ open: false, message: "", type: "success" })
                }
            />
        </>
    );
}

export default CompanyInformation;
