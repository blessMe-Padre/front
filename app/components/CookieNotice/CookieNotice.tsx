'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './style.module.scss';

const COOKIE_NOTICE_SHOWN_AT_KEY = 'riftvl-cookie-notice-shown-at';
const COOKIE_NOTICE_REPEAT_INTERVAL = 30 * 24 * 60 * 60 * 1000;

export default function CookieNotice() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const lastShownAt = Number(localStorage.getItem(COOKIE_NOTICE_SHOWN_AT_KEY));
        const shouldShow = !lastShownAt || Date.now() - lastShownAt >= COOKIE_NOTICE_REPEAT_INTERVAL;

        if (shouldShow) {
            localStorage.setItem(COOKIE_NOTICE_SHOWN_AT_KEY, String(Date.now()));
            setIsVisible(true);
        }
    }, []);

    const acceptCookies = () => {
        setIsVisible(false);
    };

    if (!isVisible) {
        return null;
    }

    return (
        <aside className={styles.notice} aria-label="Уведомление об использовании cookie">
            <div className={styles.content}>
                <p className={styles.text}>
                    Мы используем cookie, чтобы сайт работал корректно и становился удобнее.
                    Продолжая пользоваться сайтом, вы соглашаетесь с нашей{' '}
                    <Link className={styles.link} href="/policy">
                        политикой конфиденциальности
                    </Link>.
                </p>
                <button className={styles.button} type="button" onClick={acceptCookies}>
                    Принять
                </button>
            </div>
        </aside>
    );
}
