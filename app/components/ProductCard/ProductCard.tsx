'use client';

import Image from "next/image";
import { Product } from "@/app/types/types";
import Link from "next/link";

import useCartStore from "@/app/store/cartStore";

import styles from './style.module.scss';


export default function ProductCard({ product }: { product: Product | null }) {
    const addToCart = useCartStore((state) => state.addToCart);
    const cartItems = useCartStore((state) => state.cartItems);

    const imageServer = process.env.NEXT_PUBLIC_IMAGE_SERVER ?? "";
    const imageSrc = product?.images?.[0]?.url ? `${imageServer}${product.images[0].url}` : "/placeholder.svg";

    return (
        <li className={styles.product_card}>
            <Link href={`/products/${product?.slug}`} className={styles.product_link}>
            <div>
            <div className={styles.product_badges}>
                {product?.novinka && <span className={styles.new}>Новинка</span>}
                {product?.akciya && <span className={styles.sale}>Акция</span>}
            </div>

            <div className={styles.image_wrapper}>
                <Image
                    src={imageSrc}
                    alt={"Изображение товара"}
                    fill
                    sizes="20vw"
                    className={styles.image}
                />
            </div>
            <span className={styles.price}>{product?.price?.toLocaleString('ru-RU')}₽</span>

            {product?.amount && product.amount > 0  ? (
            <div className={styles.availability}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5 10C2.2385 10 0 7.7615 0 5C0 2.2385 2.2385 0 5 0C7.7615 0 10 2.2385 10 5C10 7.7615 7.7615 10 5 10ZM4.4115 6.07L3.029 4.6865L2.5 5.2155L4.0595 6.776C4.15326 6.86974 4.28042 6.92239 4.413 6.92239C4.54558 6.92239 4.67274 6.86974 4.7665 6.776L7.7425 3.801L7.2115 3.27L4.4115 6.07Z" fill="#314077" />
                </svg>
                <span>В наличии</span>
            </div> 
            ) : ( <div className={styles.availability}><span>Нет в наличии</span></div>
            )}

            <h3 className={styles.title}>{product?.title}</h3>
            </div>
            </Link>

            {cartItems.find((item) => item.id === product?.id) ? (
                <button type="button" className={styles.button}>
                    Добавлен в корзину
                </button>
            ) : (
                <button type="button" onClick={() => product && addToCart(product)} className={styles.button}>
                    В корзину
                </button>
            )}
        </li>
    );
}