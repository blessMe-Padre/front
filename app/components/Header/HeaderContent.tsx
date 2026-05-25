'use client';

import Navigation from "../Navigation/Navigation";
import HeaderPopupButton from "./HeaderPopupButton";

import normalizePhone from "@/app/utils/NormalizePhone";
import Image from "next/image";
import { HeaderCatalogMenu, Search } from "@/app/components";
import styles from "./style.module.scss";
import type { NavigationItem } from "../Navigation/Navigation";
import Sidebar from "../Sidebar/Sidebar";
import { useState } from "react";

type HeaderContentProps = {
    phone: string;
    navigationList: NavigationItem[];
    isScrolled: boolean;
    address: string;
    telegram: string;
    max: string;
    email: string;
};

export default function HeaderContent({ phone, navigationList, isScrolled, address, telegram, max, email }: HeaderContentProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className={`${styles.header_top} ${isScrolled ? styles.header_top_hidden : ""}`}>
                <Navigation navigationList={navigationList} />
                <div className={styles.header_top_right}>
                    <a href={normalizePhone(phone)}>{phone}</a>
                </div>
            </div>

            <div className={styles.header_wrapper}>
                <button
                    type="button"
                    className={`${styles.header_menu_button} ${isScrolled ? styles.header_menu_button_visible : ""}`}
                    onClick={() => {setIsOpen(true);}}
                >
                    <Image src="/icons/burger.svg" alt="menu" width={34} height={23} />
                </button>
                <Image src="/logo.svg" alt="logo" width={131} height={65} priority />
                <HeaderCatalogMenu />
                <Search />
                <HeaderPopupButton />
            </div>

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
        </>
    );
}
