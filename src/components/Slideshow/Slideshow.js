import classNames from "classnames/bind";

import styles from "./Slideshow.module.scss";
import { useState } from "react";

const cx = classNames.bind(styles);

function Slideshow({ slides = [] }) {
    const [slideIndex, setSlideIndex] = useState(0);

    const handleDecrease = () => {
        setSlideIndex((prev) => {
            return prev - 1 === -1 ? slides.length - 1 : prev - 1;
        });
    };

    const handleIncrease = () => {
        setSlideIndex((prev) => {
            return prev + 1 === slides.length ? 0 : prev + 1;
        });
    };

    const handleCurrentSlide = (index) => {
        setSlideIndex(index);
    };

    return (
        <>
            <div className={cx("slideshow-container")}>
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={cx("mySlides", "fade")}
                        style={{
                            display: index === slideIndex ? "block" : "none",
                        }}
                    >
                        <img
                            alt={slide.alt || ""}
                            src={slide.image || ""}
                            width={"100%"}
                        />
                        <div className={cx("text")}>{slide.content || ""}</div>
                    </div>
                ))}
                <button className={cx("prev")} onClick={handleDecrease}>
                    ❮
                </button>
                <button className={cx("next")} onClick={handleIncrease}>
                    ❯
                </button>
            </div>
            <br />
            <div style={{ textAlign: "center" }}>
                {slides.map((slide, index) => {
                    return (
                        <span
                            key={index}
                            className={
                                index === slideIndex
                                    ? cx("dot", "active")
                                    : cx("dot")
                            }
                            onClick={() => {
                                handleCurrentSlide(index);
                            }}
                        ></span>
                    );
                })}
            </div>
        </>
    );
}

export default Slideshow;
