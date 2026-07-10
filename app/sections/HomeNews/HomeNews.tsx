import Link from "next/link";

import NewsCard from "@/app/components/NewsCard/NewsCard";
import fetchData from "@/app/utils/fetchData";
import { Novost, StrapiListResponse } from "@/app/types/types";

import styles from "./style.module.scss";

const newsUrl =
    "/api/novostis?populate[0]=image&populate[1]=kategorii_novostejs&pagination[page]=1&pagination[pageSize]=4&sort[0]=createdAt:desc";

export default async function HomeNews() {
    const news = await fetchData<StrapiListResponse<Novost[]>>(newsUrl);
    const items = news?.data ?? [];

    if (items.length === 0) {
        return null;
    }

    return (
        <section className={styles.section}>
            <h2 className={styles.title}>Новости и статьи</h2>

            <ul className={styles.list}>
                {items.map((item) => (
                    <li className={styles.item} key={item.id}>
                        <NewsCard item={item} />
                    </li>
                ))}
            </ul>

            <Link className={styles.allLink} href="/news">
                Все новости
            </Link>
        </section>
    );
}
