import Image from "next/image";
import Link from "next/link";

import fetchData from "@/app/utils/fetchData";
import formatDate from "@/app/utils/formatDate";
import { Novost, StrapiListResponse } from "@/app/types/types";

import styles from "./style.module.scss";

const imageServer = process.env.NEXT_PUBLIC_IMAGE_SERVER ?? "";

const promosUrl =
    "/api/akcziis?populate[0]=image&pagination[page]=1&pagination[pageSize]=4&sort[0]=createdAt:desc";

export default async function HomePromos() {
    const promos = await fetchData<StrapiListResponse<Novost[]>>(promosUrl);
    const items = promos?.data ?? [];

    if (items.length === 0) {
        return null;
    }

    return (
        <section className={styles.section}>
            <h2 className={styles.title}>Акции</h2>
            <ul className={styles.list}>
                {items.map((item) => {
                    const imageSrc = item.image?.url
                        ? `${imageServer}${item.image.url}`
                        : "/placeholder.svg";

                    return (
                        <li className={styles.item} key={item.id}>
                            <Link className={styles.card} href={`/promos/${item.slug ?? ""}`}>
                                <div className={styles.imageWrapper}>
                                    <Image
                                        src={imageSrc}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                        alt={item.title}
                                        className={styles.image}
                                    />
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
            <Link className={styles.allLink} href="/promos">
                Все акции
            </Link>
        </section>
    );
}
