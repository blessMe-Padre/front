

import Image from "next/image";
import Link from "next/link";
import { CatalogMenuItem, StrapiListResponse } from "@/app/types/types";
import fetchData from '@/app/utils/fetchData';
import { buildRootCategoriesUrl } from "@/app/utils/catalogQueries";

import styles from './style.module.scss';


export default async function HomeCategory() {

    const catalogMenu = await fetchData<StrapiListResponse<CatalogMenuItem[]>>(buildRootCategoriesUrl());
    const imageServer = process.env.NEXT_PUBLIC_IMAGE_SERVER ?? "";

    return (
        <section className={styles.section}>
            <h2 className={styles.title}>Каталог продукции</h2>
            <ul className={styles.list}>
                {catalogMenu?.data?.map((item) => {
                    const imageSrc = item.image?.url ? `${imageServer}${item.image.url}` : "/placeholder.svg";

                    return (
                        <li key={item.id} className={styles.item}>
                            <Link href={`/catalog/${item?.slug || ""}`}>
                                <Image
                                    src={imageSrc}
                                    width={300}
                                    height={300}
                                    alt={item.name || ""}
                                    className={styles.image}
                                    />
                                <p>{item?.name}</p>
                            </Link>
                        </li>
                    );
                })}
                <li className={styles.allCatalog}>
                    <div className={styles.allCatalogIcon}>
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.6874 1.27018C20.7023 0.718099 20.2668 0.258451 19.7148 0.24353L10.718 0.00037568C10.166 -0.0145458 9.70632 0.42091 9.69139 0.972993C9.67647 1.52508 10.1119 1.98472 10.664 1.99965L18.6611 2.21578L18.445 10.2129C18.43 10.7649 18.8655 11.2246 19.4176 11.2395C19.9697 11.2544 20.4293 10.819 20.4442 10.2669L20.6874 1.27018ZM0.687744 19.2432L1.37549 19.9691L20.3755 1.96912L19.6877 1.24317L19 0.517212L-4.76837e-07 18.5172L0.687744 19.2432Z"/>
                        </svg>
                    </div>

                    <Link href={`/catalog`}>Смотреть весь каталог</Link>
                </li>
            </ul>
        </section>
    );
}