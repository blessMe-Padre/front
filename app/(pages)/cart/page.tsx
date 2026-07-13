'use client';
import { useMemo } from "react";

import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import CartItem from "@/app/components/CartItem/CartItem";
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
                                <CartItem 
                                key={item.id} 
                                item={item}
                                increaseQuantity={increaseQuantity}
                                decreaseQuantity={decreaseQuantity}
                                removeFromCart={removeFromCart}
                            
                            />
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
                        <Link href="/checkout" className="button_primary">Оформить заказ</Link>
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