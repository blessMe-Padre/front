import Image from "next/image";
import Link from "next/link";

import { Novost } from "@/app/types/types";
import formatDate from "@/app/utils/formatDate";

import styles from "./style.module.scss";

type NewsCardProps = {
    item: Novost;
    titleAs?: "h2" | "h3";
    imageSizes?: string;
};

const imageServer = process.env.NEXT_PUBLIC_IMAGE_SERVER ?? "";

export default function NewsCard({
    item,
    titleAs: Title = "h3",
    imageSizes = "(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 25vw",
}: NewsCardProps) {
    const imageSrc = item.image?.url
        ? `${imageServer}${item.image.url}`
        : "/placeholder.svg";
    const category = item.kategorii_novostejs?.[0]?.name;

    return (
        <Link className={styles.card} href={`/news/${item.slug ?? ""}`}>
            <div className={styles.imageWrapper}>
                <Image
                    src={imageSrc}
                    fill
                    sizes={imageSizes}
                    alt={item.title}
                    className={styles.image}
                />
            </div>

            {category ? (
                <p className={styles.category}>{category}</p>
            ) : null}

            <time className={styles.date} dateTime={item.createdAt}>
                {formatDate(item.createdAt)}
            </time>

            <Title className={styles.title}>{item.title}</Title>
        </Link>
    );
}
