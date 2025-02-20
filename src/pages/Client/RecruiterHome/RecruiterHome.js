import { Button, Container } from "@mui/material";
import classNames from "classnames/bind";

import { bannerRecruiter } from "~/assets/Images";
import styles from "./RecruiterHome.module.scss";
import { useNavigate } from "react-router-dom";
import config from "~/config";

const cx = classNames.bind(styles);

function RecruiterHome() {
    const navigate = useNavigate();

    const redirectCreateJobPosting = () => {
        navigate(config.routes.createJobPosting);
    };

    return (
        <Container>
            <div className={cx("container")}>
                <div className={cx("introduce")}>
                    <strong>
                        Nơi gặp gỡ giữa doanh nghiệp <br /> và 10 triệu ứng viên
                        chất lượng
                    </strong>
                    <p>
                        Tuyển người dễ dàng với Việc Làm 24h - Chúng tôi luôn có
                        ứng viên phù hợp cho bạn
                    </p>
                    <Button
                        variant="contained"
                        onClick={redirectCreateJobPosting}
                    >
                        Đăng tin ngay!
                    </Button>
                </div>
                <div className={cx("banner")}>
                    <img src={bannerRecruiter} alt="banner" />
                </div>
            </div>
        </Container>
    );
}

export default RecruiterHome;
