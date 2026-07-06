

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
            <div className="container">
                <h2>Каталог продукции</h2>
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
                        <Link href={`/catalog`}>Смотреть весь каталог</Link>
                    </li>
                </ul>
            </div>
        </section>
    );
}