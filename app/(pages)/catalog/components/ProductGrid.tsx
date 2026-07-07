import { ProductCard } from "@/app/components";
import { Product } from "@/app/types/types";

import styles from "../style.module.scss";

type ProductGridProps = {
    products: Product[];
};

export default function ProductGrid({ products }: ProductGridProps) {
    if (products.length === 0) {
        return <p>Товары не найдены</p>;
    }

    return (
        <>
        <h2>Товары</h2>
        <ul className={styles.products_list}>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </ul>
        </>
    );
}
