"use client";
import { useEffect } from "react";
import { Form } from "..";

import styles from "./style.module.scss";

export default function Popup({ active, setActive }) {
    const handleKeyDown = (event) => {
        if (event.key === "Escape" || event.key === "Esc") {
            setActive(false);
        }
    };

    const lockScroll = (active) => {
        const scrollWidth = window.innerWidth - document.documentElement.clientWidth;
        const paddingRight = active ? `${scrollWidth}px` : "0";

        document.documentElement.style.overflow = active ? "hidden" : "auto";
        document.documentElement.style.paddingRight = paddingRight;
    };

    useEffect(() => {
        lockScroll(active);
        return () => {
            lockScroll(false);
        };
    }, [active]);

    return (
        <div
            className={`${styles.popup} ${active ? styles.popupActive : styles.popupNone}`}
            onClick={() => {
                setActive(false);
            }}
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >
            <div className={styles.popup__body}>
                <div
                    className={styles.popup__content}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        className={styles.popup__close}
                        onClick={() => {
                            setActive(false);
                        }}
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="black" />
                        </svg>
                    </button>

                    <div className={styles.popup__content_inner}>
                        <h2 className={styles.popup_title}>Закажите звонок</h2>
                        <p className={styles.popup_text}>Оставьте свой номер телефона, и специалист свяжется с Вами в ближайшее время</p>

                        <Form active={active} />
                    </div>

                </div>
            </div>
        </div>
    );
}
