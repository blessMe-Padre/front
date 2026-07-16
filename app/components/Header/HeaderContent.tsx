'use client';

import Navigation from "../Navigation/Navigation";
import HeaderPopupButton from "./HeaderPopupButton";

import normalizePhone from "@/app/utils/NormalizePhone";
import Image from "next/image";
import { HeaderCatalogMenu, Search } from "@/app/components";
import styles from "./style.module.scss";
import type { NavigationItem } from "../Navigation/Navigation";
import Sidebar from "../Sidebar/Sidebar";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Cart from "../Cart/Cart";
import CartNotification from "../CartNotification/CartNotification";
import { CatalogMenuItem } from "@/app/types/types";

type HeaderContentProps = {
    phone: string;
    navigationList: NavigationItem[];
    address: string;
    telegram: string;
    max: string;
    email: string;
    catalogMenu: CatalogMenuItem[];
};

export default function HeaderContent({ phone, navigationList, address, telegram, max, email, catalogMenu }: HeaderContentProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isTopBarVisible, setIsTopBarVisible] = useState(true);
    const topBarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const topBar = topBarRef.current;

        if (!topBar) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => setIsTopBarVisible(entry.isIntersecting),
            { threshold: 0 },
        );

        observer.observe(topBar);
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <div ref={topBarRef} className={styles.header_top}>
                <div className="container">
                    <div className={styles.header_top_wrapper}>
                        <Navigation navigationList={navigationList} />
                        <div className={styles.header_top_right}>
                            <a href={normalizePhone(phone)}>{phone}</a>
                        </div>
                    </div>
                </div>
            </div>

            <header className={`${styles.header} ${!isTopBarVisible ? styles.header_scrolled : ""}`}>
                <div className="container">
                    <div className={styles.header_wrapper}>
                        <button
                            type="button"
                            aria-label="Открыть меню"
                            className={`${styles.header_menu_button} ${!isTopBarVisible ? styles.header_menu_button_visible : ""}`}
                            onClick={() => {setIsOpen(true);}}
                        >
                            <Image src="/icons/burger.svg" alt="" width={24} height={16} />
                        </button>
                        <Link href="/" className={styles.header_logo}>
                            <Image src="/logo.svg" alt="logo" width={131} height={65} priority />
                        </Link>
                        <HeaderCatalogMenu catalogMenu={catalogMenu || []} />
                        <Search />
                        <HeaderPopupButton />
                        <Cart />
                    </div>

                    <CartNotification />

                    <Sidebar
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        navigationList={navigationList}
                        phone={phone}
                        address={address}
                        telegram={telegram}
                        max={max}
                        email={email}
                    />
                </div>
            </header>
        </>
    );
}
