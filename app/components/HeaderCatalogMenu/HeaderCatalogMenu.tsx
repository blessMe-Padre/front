"use client";

import { useState, useEffect, useRef } from "react";

import styles from "./style.module.scss";
import Image from "next/image";
import Link from "next/link";
import { CatalogMenuItem } from "@/app/types/types";


const imageServer = process.env.NEXT_PUBLIC_IMAGE_SERVER ?? "";

type HeaderCatalogMenuProps = {
    catalogMenu: CatalogMenuItem[];
};

export default function HeaderCatalogMenu({ catalogMenu }: HeaderCatalogMenuProps) {
    const [isActive, setIsActive] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (event.target instanceof Node && !menuRef.current?.contains(event.target)) {
                setIsActive(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <div className={styles.headerCatalogMenuWrapper} ref={menuRef}>
            <button 
            className={`${styles.headerCatalogMenuButton} ${isActive ? styles.active : ''}`}
            onClick={() => setIsActive(!isActive)}
            type="button"
            >
                {/* <Image src="/icons/dots.svg" alt="catalog" width={20} height={20} /> */}
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="2.82353" height="2.82353"/>
                    <rect x="6.82352" width="2.82353" height="2.82353"/>
                    <rect x="13.6471" width="2.82353" height="2.82353"/>
                    <rect y="6.82353" width="2.82353" height="2.82353"/>
                    <rect x="6.82352" y="6.82353" width="2.82353" height="2.82353"/>
                    <rect x="13.6471" y="6.82353" width="2.82353" height="2.82353"/>
                    <rect y="13.6471" width="2.82353" height="2.82353"/>
                    <rect x="6.82352" y="13.6471" width="2.82353" height="2.82353"/>
                    <rect x="13.6471" y="13.6471" width="2.82353" height="2.82353"/>
                </svg>
                <span>Каталог</span>
            </button>

            <div className={`${styles.headerCatalogMenu} ${isActive ? styles.active : ''}`}>
                <ul className={styles.headerCatalogMenuList}>
                    {catalogMenu.map((item) => {
                        const imageSrc = item.image?.url ? `${imageServer}${item.image.url}` : "/placeholder.svg";

                        return (
                            <li key={item.id} className={styles.headerCatalogMenuItem}>
                                <Link 
                                    href={`/catalog/${item?.slug || ""}`}
                                    onClick={() => setIsActive(false)}
                                >

                                    <Image src={imageSrc}
                                        width={61}
                                        height={61}
                                        alt={item.name || ""}
                                     />
                                    <span>{item?.name}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}