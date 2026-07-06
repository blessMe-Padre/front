'use client';

import Image from 'next/image';
import type { CartItem as CartItemData } from '@/app/store/cartStore';
import styles from './style.module.scss';

type CartItemProps = {
    item: CartItemData;
    increaseQuantity: (itemId: number) => void;
    decreaseQuantity: (itemId: number) => void;
    removeFromCart: (itemId: number) => void;
};

const imageServer = process.env.NEXT_PUBLIC_IMAGE_SERVER ?? "";

export default function CartItem({ item, increaseQuantity, decreaseQuantity, removeFromCart }: CartItemProps) {
    return (
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
    )
}