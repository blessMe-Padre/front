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
        <div className="relative" ref={menuRef}>
            <button 
            className={styles.headerCatalogMenuButton}
            onClick={() => setIsActive(!isActive)}
            type="button"
            >
                <Image src="/icons/dots.svg" alt="catalog" width={20} height={20} />
                <span>Каталог</span>
            </button>

            <div className={`${styles.headerCatalogMenu} ${isActive ? styles.active : ''}`}>
                <ul className={styles.headerCatalogMenuList}>
                    {catalogMenu.map((item) => {
                        const imageSrc = item.image?.url ? `${imageServer}${item.image.url}` : "/placeholder.svg";

                        return (
                            <li key={item.id} className={styles.headerCatalogMenuItem}>
                                <Link href={`/catalog/${item?.slug || ""}`}>

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