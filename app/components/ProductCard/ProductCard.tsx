'use client';

import Image from "next/image";
import { Product } from "@/app/types/types";

import useCartStore from "@/app/store/cartStore";

import styles from './style.module.scss';


export default function ProductCard({ product }: { product: Product | null }) {
    const addToCart = useCartStore((state) => state.addToCart);
    const cartItems = useCartStore((state) => state.cartItems);

    const imageServer = process.env.NEXT_PUBLIC_IMAGE_SERVER ?? "";
    const imageSrc = product?.images?.[0]?.url ? `${imageServer}${product.images[0].url}` : "/placeholder.svg";

    // console.log('product', product);
    return (
        <li className={styles.product_card}>
            <div className={styles.image_wrapper}>
                <Image
                    src={imageSrc}
                    alt={"Изображение товара"}
                    fill
                    sizes="20vw"
                    className={styles.image}
                />
            </div>
            <h3 className={styles.title}>{product?.title}</h3>
                    {cartItems.find((item) => item.id === product?.id) ? (
                        <button type="button">
                            Добавлен в корзину
                        </button>
                    ) : (
                        <button type="button" onClick={() => product && addToCart(product)}>
                            В корзину
                        </button>
                    )}

        </li>
    );
}