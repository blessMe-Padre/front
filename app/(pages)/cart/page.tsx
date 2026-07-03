'use client';
import { useMemo } from "react";

import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import useCartStore from "@/app/store/cartStore";

import Image from "next/image";
import styles from './style.module.scss';
import Link from "next/link";

export default function Cart() {
    const cartItems = useCartStore((state) => state.cartItems);
    const increaseQuantity = useCartStore((state) => state.increaseQuantity);
    const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const clearCart = useCartStore((state) => state.clearCart);

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
            <h1 className={styles.cart_title}>Корзина</h1>

            {cartItems.length > 0 ? (
            <div className={styles.cart_wrapper}>
                <div>
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
                                                <button type="button" onClick={() => decreaseQuantity(item.id)} className={styles.counter_button} title="уменьшить количество">
                                                    <svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M11.0833 1.58333H0V0H11.0833V1.58333Z" fill="black" />
                                                    </svg>
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button type="button" onClick={() => increaseQuantity(item.id)} className={styles.counter_button} title="увеличить количество">
                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M11.0833 6.33333H6.33333V11.0833H4.75V6.33333H0V4.75H4.75V0H6.33333V4.75H11.0833V6.33333Z" fill="black" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <span>{(item.price ?? 0).toLocaleString('ru-RU')} ₽</span>
                                        </div>

                                        <div className={styles.price_wrapper}>
                                            <span className={styles.cart_item_price}>
                                            {((item.price ?? 0) * item.quantity).toLocaleString('ru-RU')} ₽
                                            </span>
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
                </div>

                <div className={styles.cart_total_wrapper}>
                    <div className={styles.cart_total}>
                        <p className={styles.cart_total_price}>Итого: <span>{price.toLocaleString('ru-RU') ?? 0} ₽</span></p>
                        <p className={styles.cart_total_counter}>Товаров в корзине: {counter}</p>
                        <Link href="/checkout" className={styles.cart_checkout_button}>Оформить заказ</Link>
                    </div>
                    <button 
                        type="button" 
                        className={styles.cart_remove_all}
                        title="Удалить все товары из корзины"
                        onClick={() => clearCart()}
                        >Очистить корзину
                    </button>
                </div>
            </div>
            ) : (
            <div className={styles.cart_empty}>
                <div className={styles.cart_empty_wrapper}>
                    <Image src="/icons/cart-empty.svg" alt="корзина пуста" width={220} height={206} />
                    <p>В Вашей корзине пока нет товаров</p>
                    <p><Link href="/catalog" className={styles.cart_empty_button}>Перейти в каталог, </Link>чтобы начать покупки</p>
                </div>
            </div>
            )}
        </div>
        </>
    );
}