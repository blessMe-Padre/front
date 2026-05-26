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
                        <span className={styles.addressIcon}>i</span>
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