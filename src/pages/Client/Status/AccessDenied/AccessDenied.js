import classNames from "classnames/bind";

import styles from "./AccessDenied.module.scss";

const cx = classNames.bind(styles);

function AccessDenied() {
    return (
        <div className={cx("display-middle")}>
            <h1 className={cx("jumbo", "animate-top", "center")}>
                <code>Access Denied</code>
            </h1>
            <hr
                className={cx("border-white", "animate-left")}
                style={{ margin: "auto", width: "50%" }}
            />
            <h3 className={cx("center", "animate-right")}>
                Bạn không có quyền truy cập trang web này.
            </h3>
            <h3 className={cx("center", "animate-zoom")}>🚫🚫🚫🚫</h3>
            <h6 className={cx("center", "animate-zoom")}>
                error code:403 forbidden
            </h6>
        </div>
    );
}

export default AccessDenied;
