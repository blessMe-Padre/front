'use client';
import { useMemo } from "react";

import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import useCartStore from "@/app/store/cartStore";

import Image from "next/image";
import styles from './style.module.scss';

export default function Cart() {
    const cartItems = useCartStore((state) => state.cartItems);
    const increaseQuantity = useCartStore((state) => state.increaseQuantity);
    const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
    const removeFromCart = useCartStore((state) => state.removeFromCart);

    const imageServer = process.env.NEXT_PUBLIC_IMAGE_SERVER ?? "";

    const { counter, price } = useMemo(() => {
        return cartItems.reduce(
            (totals, item) => ({
                counter: totals.counter + item.quantity,
                price: totals.price + (item.price ?? 0) * item.quantity,
            }),
            { counter: 0, price: 0 }
        );
    }, [cartItems]);

    return (
        <>
        <Breadcrumbs secondLink='/catalog' secondLabel='Каталог' thirdLabel="корзина" />

        <div className="container">
            <h1>Корзина</h1>

            {cartItems.length > 0 ? (
                <ul className={styles.cart_list}>
                    {cartItems.map((item) => (
                        <li key={item.id} className={styles.cart_item}>
                            <div className={styles.cart_item_info}>
                                <div className={styles.cart_item_image}>
                                    <Image src={imageServer + (item.images?.[0]?.url ?? '')} alt={item.title ?? ''} width={100} height={100} />
                                </div>

                                <div className={styles.cart_item_content}>
                                    <h2 className={styles.cart_item_title}>{item.title}</h2>
                                </div>
                            </div>

                            <div className={styles.cart_item_actions}>
                                <div className={styles.cart_item_counter}>
                                    <div className={styles.counter_wrapper}>
                                        <button type="button" onClick={() => decreaseQuantity(item.id)}>
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button type="button" onClick={() => increaseQuantity(item.id)}>
                                            +
                                        </button>
                                    </div>
                                    <span>{(item.price ?? 0) }</span>
                                </div>

                                <div className={styles.price_wrapper}>
                                    <span>{(item.price ?? 0) * item.quantity}</span>
                                </div>

                                <button
                                    type="button" onClick={() => removeFromCart(item.id)}
                                    title="удалить товар из корзины"
                                    className={styles.cart_item_remove}
                                >
                                   <Image src="/icons/trash.svg" alt="trash" width={24} height={24} />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Корзина пуста</p>
            )}

            <div>
                <p>Товаров в корзине: {counter}</p>
                <p>Итого: {price}</p>
            </div>
        </div>
        </>
    );
}