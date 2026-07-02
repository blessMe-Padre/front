import { ProductCard } from "@/app/components";
import styles from './style.module.scss';
import fetchData from "@/app/utils/fetchData";
import { StrapiListResponse } from "@/app/types/types";
import { Product } from "@/app/types/types";

export default async function CatalogPage() {

    const response = await fetchData<StrapiListResponse<Product[]>>(
        `/api/tovars?populate[0]=images`
    );
    const products = response.data;

    return (
        <div className="container">
            <h1>Каталог</h1>

            <ul className={styles.products_list}>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </ul>
        </div>
    );
}