import Link from "next/link";
import { CatalogMenuItem } from "@/app/types/types";
import { CatalogFilters as CatalogFilterValues } from "@/app/utils/catalogQueries";

import styles from "../style.module.scss";

type CatalogFiltersProps = {
    currentSlug: string;
    subcategories: CatalogMenuItem[];
    filters: CatalogFilterValues;
};

const getCategoryHref = (currentSlug: string, filters: CatalogFilterValues, categorySlug?: string) => {
    const params = new URLSearchParams();

    if (categorySlug) {
        params.set("category", categorySlug);
    }

    if (filters.priceFrom) {
        params.set("priceFrom", filters.priceFrom);
    }

    if (filters.priceTo) {
        params.set("priceTo", filters.priceTo);
    }

    if (filters.inStock) {
        params.set("inStock", "1");
    }

    const query = params.toString();
    return query ? `/catalog/${currentSlug}?${query}` : `/catalog/${currentSlug}`;
};

export default function CatalogFilters({ currentSlug, subcategories, filters }: CatalogFiltersProps) {
    if (subcategories.length === 0) {
        return null;
    }

    return (
        <nav aria-label="Фильтр по подкатегориям">
            <ul className={styles.list}>
                <li className={styles.item}>
                    <Link
                        href={getCategoryHref(currentSlug, filters)}
                        aria-current={!filters.category ? "page" : undefined}
                    >
                        <p>Все товары</p>
                    </Link>
                </li>
                {subcategories.map((category) => (
                    <li key={category.id} className={styles.item}>
                        <Link
                            href={getCategoryHref(currentSlug, filters, category.slug)}
                            aria-current={filters.category === category.slug ? "page" : undefined}
                        >
                            <p>{category.name}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
