import Image from "next/image";
import Link from "next/link";
import { CatalogMenuItem } from "@/app/types/types";

import styles from "../style.module.scss";

const imageServer = process.env.NEXT_PUBLIC_IMAGE_SERVER ?? "";

type CategoryCardListProps = {
    categories: CatalogMenuItem[];
};

export default function CategoryCardList({ categories }: CategoryCardListProps) {
    if (categories.length === 0) {
        return null;
    }

    return (
        <ul className={styles.list}>
            {categories.map((item) => {
                const imageSrc = item.image?.url ? `${imageServer}${item.image.url}` : "/placeholder.svg";

                return (
                    <li key={item.id} className={styles.item}>
                        <Link href={`/catalog/${item.slug || ""}`}>
                            <Image
                                src={imageSrc}
                                width={300}
                                height={300}
                                alt={item.name || ""}
                                className={styles.image}
                            />
                            <p>{item.name}</p>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}
