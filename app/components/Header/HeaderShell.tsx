"use client";

import { useEffect, useState } from "react";
import HeaderContent from "./HeaderContent";
import styles from "./style.module.scss";
import type { NavigationItem } from "../Navigation/Navigation";
import { CatalogMenuItem } from "@/app/types/types";
import { useIsMobile } from "@/app/hooks/use-mobile";

type HeaderShellProps = {
    phone: string;
    navigationList: NavigationItem[];
    address: string;
    telegram: string;
    max: string;
    email: string;
    catalogMenu: CatalogMenuItem[];
};

export default function HeaderShell({ phone, navigationList, address, telegram, max, email, catalogMenu }: HeaderShellProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const isMobile = useIsMobile();

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
        <header className={`${styles.header} ${isScrolled ? styles.fixed : ""} ${isMobile ? styles.fixed : ""}`}>
            <HeaderContent
                phone={phone}
                navigationList={navigationList}
                isScrolled={isScrolled}
                address={address}
                telegram={telegram}
                max={max}
                email={email}
                catalogMenu={catalogMenu}
            />
        </header>
    );
}
