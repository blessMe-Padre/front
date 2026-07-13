import { ProductCard } from "@/app/components";
import { Product } from "@/app/types/types";

import styles from "../style.module.scss";

type ProductGridProps = {
    products: Product[];
};

export default function ProductGrid({ products }: ProductGridProps) {
    if (products.length === 0) {
        return <p className={styles.no_products_found}>Товары не найдены</p>;
    }

    return (
        <ul className={styles.products_list}>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </ul>
    );
}
