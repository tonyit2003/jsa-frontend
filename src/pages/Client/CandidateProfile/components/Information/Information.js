import { Grid, Paper, TextField, Typography, Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TextEditor from "~/components/TextEditor";
import { UserContext } from "~/context/UserProvider";
import { getInfoCandidate, updateInformationCandidate } from "~/services/UserCandidateService";
import config from "~/config";
import { updateInformation } from "~/services/UserService";

function Information() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [resume, setResume] = useState("");
    const [skills, setSkills] = useState("");
    const [experience, setExperience] = useState("");
    const [education, setEducation] = useState("");

    useEffect(() => {
        getInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const navigate = useNavigate();
    const { auth, setAuth } = useContext(UserContext);

    const getInfo = async () => {
        try {
            if (auth.isAuth && auth.token) {
                const res = await getInfoCandidate(auth.token);
                console.log(res);

                if (res.status === "success" && res.data) {
                    setName(res.data.user.full_name);
                    setPhone(res.data.user.phone_number);
                    setResume(res.data.resume);
                    setSkills(res.data.skills);
                    setExperience(res.data.experience);
                    setEducation(res.data.education);
                }
            } else {
                navigate(config.routes.login);
            }
        } catch (error) {
            console.error("Lỗi khi lấy bài tuyển dụng:", error);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await updateInformation(auth.token, name, phone);
            await updateInformationCandidate(auth.token, resume, skills, experience, education)
            alert("Cập nhật thành viên thành công!");
        } catch (error) {
            console.log("Lỗi cập nhật:", error);
        }
    }

    return (
        <>
            <Paper elevation={3} sx={{ padding: 3 }}>
                <Grid
                    container
                    spacing={2}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    <Typography variant="h6" fontWeight="bold">
                        Thông tin chung
                    </Typography>
                    <Grid>
                        <Button
                            variant="contained"
                            color="success"
                            fullWidth
                            onClick={handleUpdate}
                        >
                            Cập nhật thông tin
                        </Button>
                    </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ marginTop: 2 }}>
                    <Grid item xs={4}>
                        <TextField
                            label="Họ tên"
                            variant="outlined"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField
                            disabled
                            label="Email"
                            variant="outlined"
                            fullWidth
                            value={auth.email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            label="Số điện thoại"
                            variant="outlined"
                            fullWidth
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </Grid>
                </Grid>
            </Paper>

            <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
                <Typography variant="h6" fontWeight="bold">
                    Thông tin chung
                </Typography>

                <Grid container spacing={2} sx={{ marginTop: 2 }}>
                    <Grid item xs={12}>
                        <TextField
                            label="Tóm tắt"
                            variant="outlined"
                            fullWidth
                            value={resume}
                            onChange={(e) => setResume(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextEditor
                            title="Kỹ năng"
                            description="Nhập mô tả kỹ năng"
                            variant="outlined"
                            fullWidth
                            value={skills}
                            onChange={(value) => setSkills(value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextEditor
                            title="Mô tả kinh nghiệm"
                            description="Nhập mô tả công kinh nghiệm"
                            label="Kinh nghiệm"
                            variant="outlined"
                            fullWidth
                            value={experience}
                            onChange={(value) => setExperience(value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Học vấn"
                            variant="outlined"
                            fullWidth
                            value={education}
                            onChange={(e) => setEducation(e.target.value)}
                        />
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
}

export default Information;
