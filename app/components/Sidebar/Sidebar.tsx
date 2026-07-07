"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./style.module.scss";
import { NavigationItem } from "../Navigation/Navigation";
import normalizePhone from "@/app/utils/NormalizePhone";
import { SocialIcon } from "..";
import { useEffect } from "react";

export default function Sidebar({ isOpen, setIsOpen, navigationList, phone, address, telegram, max, email }: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void, navigationList: NavigationItem[], phone: string, address: string, telegram: string, max: string, email: string }) {

    const handleBackdropClick = () => {
        setIsOpen(false);
    };

    // закрытие по esc
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape" || event.key === "Esc") {
                setIsOpen(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
    }, [setIsOpen]);

    return (
        <aside
            className={`${styles.sidebar} ${isOpen ? styles.isActive : ''}`}
            onClick={isOpen ? handleBackdropClick : undefined}
        >
            <div
                className={styles.sidebar_content}
                onClick={(e) => e.stopPropagation()}
            >
                <button 
                type="button"
                className={styles.sidebar_closeButton}
                onClick={() => {
                    setIsOpen(false);
                }}
                >
                    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M26.9167 9.08087L24.9192 7.08337L17 15.0025L9.08087 7.08337L7.08337 9.08087L15.0025 17L7.08337 24.9192L9.08087 26.9167L17 18.9975L24.9192 26.9167L26.9167 24.9192L18.9975 17L26.9167 9.08087Z" fill="#878787" />
                    </svg>
                </button>

                <Image className={styles.sidebar_logo} src="/logo-white.svg" alt="logo" width={131} height={65} />
                <Link href="/catalog" className={styles.sidebar_link} onClick={() => setIsOpen(false)}>Каталог</Link>
                <nav className={styles.sidebar_navigation}>
                    <ul>
                        {navigationList.map((item: NavigationItem) => (
                            <li key={item.id}>
                                <Link className={styles.nav_link} href={item.link} onClick={() => setIsOpen(false)}>{item.title}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className={styles.sidebar_contacts}>
                    <address className={styles.sidebar_address} dangerouslySetInnerHTML={{ __html: address }} />
                    <a className={styles.sidebar_phone} href={normalizePhone(phone)}>{phone}</a>
                </div>

                <div className={styles.social_wrapper}>
                    <SocialIcon href={telegram} type="telegram" />
                    <SocialIcon href={max} type="max" />
                    <SocialIcon href={email} type="email" />
                </div>

                <a href={`mailto:${email}`} className={styles.sidebar_email}>{email}</a>
            </div>
        </aside>
    );
}

