import {
    Button,
    FormControl,
    Grid2,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertCustomize from "~/components/AlertCustomize";
import ConfirmationModal from "~/components/ConfirmationModal";
import TextEditor from "~/components/TextEditor";
import config from "~/config";
import jobTypeList from "~/constants/jobTypeList";
import { UserContext } from "~/context/UserProvider";
import { insertJobPost } from "~/services/JobPostService";

function RecruitmentInformation() {
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [jobType, setJobType] = useState("");
    const [salary, setSalary] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [jobRequirement, setJobRequirement] = useState("");
    const [errors, setErrors] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const [message, setMessage] = useState({
        open: false,
        message: "",
        type: "success",
    });

    // eslint-disable-next-line no-unused-vars
    const { auth, setAuth } = useContext(UserContext);

    const navigate = useNavigate();

    const handleSave = () => {
        const newErrors = {};
        if (!title.trim()) {
            newErrors.title = "Vui lòng nhập tiêu đề tin tuyển dụng";
        }
        if (!address.trim()) {
            newErrors.address = "Vui lòng nhập địa chỉ";
        }
        if (!jobType) {
            newErrors.jobType = "Vui lòng chọn dạng công việc";
        }
        if (!salary) {
            newErrors.salary = "Vui lòng nhập mức lương";
        }
        if (!jobDescription.trim()) {
            newErrors.jobDescription = "Vui lòng nhập mô tả công việc";
        }
        if (!jobRequirement.trim()) {
            newErrors.jobRequirement = "Vui lòng nhập yêu cầu công việc";
        }

        // Nếu có lỗi thì cập nhật state và dừng xử lý
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setOpenModal(true);
    };

    const handleSubmit = async () => {
        if (!auth.isAuth || !auth.token) {
            navigate(config.routes.login);
            return;
        }
        try {
            const res = await insertJobPost(
                auth.token,
                title,
                jobDescription,
                jobRequirement,
                address,
                jobType,
                salary
            );
            if (res.status === "success") {
                setOpenModal(false);
                setTitle("");
                setAddress("");
                setJobType("");
                setSalary("");
                setJobDescription("");
                setJobRequirement("");
                setErrors({});
                setMessage({
                    open: true,
                    message: res.message,
                    type: "success",
                });
            }
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
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
                        <strong>Thông tin tuyển dụng</strong>
                    </Grid2>
                </Grid2>
                <br />
                <Grid2 container spacing={2}>
                    <TextField
                        required
                        label={"Tiêu đề tin tuyển dụng"}
                        fullWidth
                        value={title}
                        error={!!errors.title}
                        helperText={errors.title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            setErrors({ ...errors, title: "" });
                        }}
                    />
                    <TextField
                        required
                        label={"Địa chỉ"}
                        fullWidth
                        value={address}
                        error={!!errors.address}
                        helperText={errors.address}
                        onChange={(e) => {
                            setAddress(e.target.value);
                            setErrors({ ...errors, address: "" });
                        }}
                    />
                    <Grid2 size={12} container spacing={2}>
                        <Grid2 size={6}>
                            <FormControl fullWidth>
                                <InputLabel
                                    required
                                    id="demo-simple-select-label"
                                >
                                    Dạng công việc
                                </InputLabel>
                                <Select
                                    required
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label={"Dạng công việc"}
                                    error={!!errors.jobType}
                                    value={jobType}
                                    onChange={(e) => {
                                        setJobType(e.target.value);
                                        setErrors({ ...errors, jobType: "" });
                                    }}
                                >
                                    {jobTypeList.map((type, index) => {
                                        return (
                                            <MenuItem
                                                key={index}
                                                value={type.value}
                                            >
                                                {type.label}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                                {errors.jobType && (
                                    <p
                                        style={{
                                            color: "#d32f2f",
                                            fontSize: "0.75rem",
                                            margin: "3px 14px 0",
                                        }}
                                    >
                                        {errors.jobType}
                                    </p>
                                )}
                            </FormControl>
                        </Grid2>
                        <Grid2 size={6}>
                            <TextField
                                required
                                fullWidth
                                label="Mức lương"
                                error={!!errors.salary}
                                helperText={errors.salary}
                                value={salary}
                                onChange={(e) => {
                                    setSalary(e.target.value);
                                    setErrors({ ...errors, salary: "" });
                                }}
                            />
                        </Grid2>
                    </Grid2>
                    <TextEditor
                        title="Mô tả công việc"
                        description="Nhập mô tả công việc của bạn"
                        value={jobDescription}
                        onChange={(value) => {
                            setJobDescription(value);
                            setErrors({ ...errors, jobDescription: "" });
                        }}
                        error={!!errors.jobDescription}
                        helperText={errors.jobDescription}
                    />
                    <TextEditor
                        title="Yêu cầu công việc"
                        description="Nhập yêu cầu công việc của bạn"
                        value={jobRequirement}
                        onChange={(value) => {
                            setJobRequirement(value);
                            setErrors({ ...errors, jobRequirement: "" });
                        }}
                        error={!!errors.jobRequirement}
                        helperText={errors.jobRequirement}
                    />
                </Grid2>
                <Grid2
                    sx={{ marginTop: "10px" }}
                    container
                    spacing={2}
                    justifyContent={"flex-end"}
                >
                    <Button variant="contained" onClick={handleSave}>
                        Lưu
                    </Button>
                </Grid2>
            </Paper>
            <ConfirmationModal
                title="Xác nhận tạo tin tuyển dụng"
                description="Bạn có chắc chắn muốn tạo tin tuyển dụng này không?"
                confirmText="Xác nhận"
                cancelText="Hủy"
                open={openModal}
                onClose={() => setOpenModal(false)}
                onConfirm={handleSubmit}
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

export default RecruitmentInformation;
