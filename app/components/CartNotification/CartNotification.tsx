'use client';

import { useEffect } from "react";
import Image from "next/image";

import useCartStore from "@/app/store/cartStore";

import styles from './style.module.scss';

const NOTIFICATION_TEXT = {
    add: {
        title: "Добавлен в корзину",
        description: "Товар добавлен в корзину",
    },
    remove: {
        title: "Удален из корзины",
        description: "Товар удален из корзины",
    },
    clear: {
        title: "Корзина очищена",
        description: "Все товары удалены из корзины",
    },
};

export default function CartNotification() {
    const lastAction = useCartStore((state) => state.lastAction);
    const lastChangedItem = useCartStore((state) => state.lastChangedItem);
    const clearLastAction = useCartStore((state) => state.clearLastAction);

    const imageServer = process.env.NEXT_PUBLIC_IMAGE_SERVER ?? "";
    const message = lastAction ? NOTIFICATION_TEXT[lastAction] : null;
    const imageSrc = lastChangedItem?.images?.[0]?.url
        ? `${imageServer}${lastChangedItem.images[0].url}`
        : "/placeholder.svg";

    useEffect(() => {
        if (!lastAction) return;

        const timeoutId = window.setTimeout(clearLastAction, 3000);

        return () => window.clearTimeout(timeoutId);
    }, [clearLastAction, lastAction]);

    if (!message) return null;

    return (
        <div className={styles.notification} role="status" aria-live="polite">
            <div className={styles.image_wrapper}>
                <Image
                    src={imageSrc}
                    alt={lastChangedItem?.title ?? message.title}
                    fill
                    sizes="78px"
                    className={styles.image}
                />
            </div>

            <div className={styles.content}>
                <p className={styles.title}>{message.title}</p>
                <p className={styles.description}>
                    {lastChangedItem?.title ?? message.description}
                </p>
            </div>

            <button
                type="button"
                className={styles.close}
                aria-label="Закрыть уведомление"
                onClick={clearLastAction}
            >
                x
            </button>
        </div>
    );
}
