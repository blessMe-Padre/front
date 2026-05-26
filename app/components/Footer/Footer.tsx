'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Popup, SocialIcon } from '..';
import { usePopupStore } from '@/app/store/popupStore';
import styles from './style.module.scss';

const footerNav = [
    { label: 'О компании', href: '/about' },
    { label: 'Акции', href: '/akcii' },
    { label: 'Новости и статьи', href: '/news' },
    { label: 'Оплата и доставка', href: '/dostavka-i-oplata' },
    { label: 'Контакты', href: '/contacts' },
    { label: 'Отзывы', href: '/reviews' },
] as const;

const legalLinks = [
    { label: 'Политика конфиденциальности', href: '/policy' },
    { label: 'Политика обработки персональных данных', href: '/policy' },
    { label: 'Договор оферты', href: '/oferta' },
] as const;


export default function Footer() {
    const { popupOpened, togglePopupState } = usePopupStore();

    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.grid}`}>
                <div>
                    <div className={styles.companyRows}>
                        <p>
                            ИП Осадчий А.В.
                            <br />
                            ИНН: 253805803187
                            <br />
                            ОГРН: 325253600005794
                        </p>
                        <p>
                            ООО “Полистар”
                            <br />
                            ИНН: 2543034983
                            <br />
                            КПП: 254301001
                            <br />
                            ОГРН: 1132543019993
                        </p>
                    </div>

                    <ul className={styles.legalList}>
                        {legalLinks.map((link) => (
                            <li key={link.label}>
                                <Link href={link.href}>{link.label}</Link>
                            </li>
                        ))}
                    </ul>

                    <p className={styles.copyright}>© ИП Осадчий А.В., {new Date().getFullYear()}</p>
                </div>

                <nav aria-label="Навигация в футере">
                    <ul className={styles.navList}>
                        {footerNav.map((item) => (
                            <li key={item.label}>
                                <Link href={item.href}>{item.label}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className={styles.contacts}>
                    <a href="mailto:rif-vl@yandex.ru" className={styles.email}>
                        rif-vl@yandex.ru
                    </a>
                    <div className={styles.phones}>
                        <a href="tel:+79024829089">+7 (902) 482 90 89</a>
                        <a href="tel:+79147911877">+7 (914) 791 18 77</a>
                    </div>
                    <address className={styles.address}>
                        <span className={styles.addressIcon}>
                        <svg width="36" height="38" viewBox="0 0 36 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_387_858)">
                            <path d="M36 5.04997V32.2833C36 35.0681 33.8157 37.334 31.1305 37.334H4.87019C2.18489 37.334 0 35.0681 0 32.2833V5.04997C0 2.26518 2.18489 0 4.87019 0H31.1305C33.8157 0 36 2.26518 36 5.04997Z" fill="#555555" />
                            <path d="M24.6861 9.4565C22.8397 7.54098 20.4199 6.58398 17.9993 6.58398C15.5794 6.58398 13.1589 7.54098 11.3125 9.4565C7.80999 13.0888 7.60418 18.9083 10.8399 22.7983L17.1042 30.3255C17.5761 30.8929 18.4232 30.8929 18.8951 30.3255L25.1587 22.7983C26.6956 20.9516 27.456 18.6688 27.456 16.3925C27.456 13.8745 26.5256 11.3636 24.6861 9.4565ZM17.9992 21.3525C15.3573 21.3525 13.215 19.1309 13.215 16.3911C13.215 13.6505 15.3573 11.4296 17.9992 11.4296C20.6419 11.4296 22.7834 13.6506 22.7834 16.3911C22.7835 19.1309 20.6419 21.3525 17.9992 21.3525Z" fill="white" />
                        </g>
                        <defs>
                            <clipPath id="clip0_387_858">
                            <rect width="36" height="37.4595" fill="white" />
                            </clipPath>
                        </defs>
                        </svg>
                        </span>
                        <span>
                            г. Владивосток,
                            <br />
                            ул. Днепровская, 21в · 1 этаж
                        </span>
                    </address>
                </div>

                <div className={styles.brandColumn}>
                    <Image src="/logo.svg" alt="РИФ" width={131} height={65} />

                    <div>
                        <div className={styles.social}>
                            <SocialIcon href="tel:+79024829089" type="phone" />
                            <SocialIcon href="https://t.me/" type="telegram" />
                            <SocialIcon href="https://max.ru/" type="max" />
                            <SocialIcon href="rif-vl@yandex.ru" type="email" />
                        </div>
                        <div className={styles.payments} aria-label="Способы оплаты">
                            <Image src="/payments.png" alt="Способы оплаты" width={228} height={44} />
                        </div>
                    </div>
                </div>
            </div>
            <Popup active={popupOpened} setActive={togglePopupState} />
        </footer>
    );
}