"use client";

import { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import HeaderContent from "./HeaderContent";
import styles from "./style.module.scss";
import type { NavigationItem } from "../Navigation/Navigation";

type HeaderShellProps = {
    phone: string;
    navigationList: NavigationItem[];
};

export default function HeaderShell({ phone, navigationList }: HeaderShellProps) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = Math.max(
                window.scrollY,
                document.documentElement.scrollTop,
                document.body.scrollTop,
                document.scrollingElement?.scrollTop ?? 0,
            );

            setIsScrolled(scrollTop > 0);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        document.addEventListener("scroll", handleScroll, { passive: true, capture: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("scroll", handleScroll, true);
        };
    }, []);

    return (
        <header className={`${styles.header} ${isScrolled ? styles.fixed : ""}`}>
            <div className="container">
                <HeaderContent
                    phone={phone}
                    navigationList={navigationList}
                    isScrolled={isScrolled}
                />
            </div>

            <Sidebar />
        </header>
    );
}
