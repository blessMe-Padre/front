"use client";

import { useState, useEffect, useRef } from "react";

import styles from "./style.module.scss";
import Image from "next/image";
import Link from "next/link";

const catalogItems = [
    {
        id: 1,
        title: "Полиэфирная смола",
        image: "/placeholder.svg",
        link: "/catalog",
    },
    {
        id: 2,
        title: "Гелькоуты",
        image: "/placeholder.svg",
        link: "/catalog",
    },
    {
        id: 3,
        title: "Гелькоуты",
        image: "/placeholder.svg",
        link: "/catalog",
    },
    {
        id: 4,
        title: "Разделительные составы",
        image: "/placeholder.svg",
        link: "/catalog",
    },
    {
        id: 5,
        title: "Все для катеров, яхт",
        image: "/placeholder.svg",
        link: "/catalog",
    },
    {
        id: 6,
        title: "Производимые изделия",
        image: "/placeholder.svg",
        link: "/catalog",
    },
    {
        id: 7,
        title: "Эпоксидные смолы",
        image: "/placeholder.svg",
        link: "/catalog",
    },
    {
        id: 8,
        title: "Армирующие материалы",
        image: "/placeholder.svg",
        link: "/catalog",
    },

];

export default function HeaderCatalogMenu() {

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
                    {catalogItems.map((item) => (
                        <li key={item.id} className={styles.headerCatalogMenuItem}>
                            <Link href={item.link}>
                                <Image src={item.image} alt={item.title} width={61} height={61} />
                                <span>{item.title}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}