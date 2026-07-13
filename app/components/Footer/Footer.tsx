import Image from 'next/image';
import Link from 'next/link';
import styles from './style.module.scss';
import fetchData from '@/app/utils/fetchData';
import { Contact, StrapiSingleResponse } from '@/app/types/types';
import { NavigationItem } from '../Navigation/Navigation';
import normalizePhone from '@/app/utils/NormalizePhone';
import { SocialIcon } from '@/app/components';


type NavigationResponse = {
    data?: {
        list?: NavigationItem[];
    }[];
};

const legalLinks = [
    { label: 'Политика конфиденциальности', href: '/policy' },
    { label: 'Политика обработки персональных данных', href: '/personal-data-processing' },
    { label: 'Договор оферты', href: '/oferta' },
] as const;

export default async function Footer() {

    const contacts = await fetchData<StrapiSingleResponse<Contact>>("/api/kontakty");
    const nav = await fetchData<NavigationResponse>("/api/glavnoe-menyus?populate=*");

    const navData = nav.data?.[0]?.list || [];
    const contactВata = contacts.data || "";


    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.grid}`}>
                <div>
                    <div className={styles.companyRows}>
                        <p dangerouslySetInnerHTML={{ __html: contactВata?.ip_data || "" }} />
                        <p dangerouslySetInnerHTML={{ __html: contactВata?.ip_data_2 || "" }} />
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
                        {navData.map((item) => (
                            <li key={item.id}>
                                <Link href={item?.link}>{item?.title}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className={styles.contacts}>
                    <a href={`mailto:${contactВata?.email || ""}`} className={styles.email}>
                        {contactВata?.email}
                    </a>
                    <div className={styles.phones}>
                        <a href={`tel:${normalizePhone(contactВata?.phone || "")}`}>{contactВata?.phone}</a>
                        <a href={`tel:${normalizePhone(contactВata?.phone_2 || "")}`}>{contactВata?.phone_2}</a>
                    </div>
                    <address className={styles.address}>
                        <Image src="/icons/pin-icon.svg" alt="location" width={36} height={38} />
                        <span dangerouslySetInnerHTML={{ __html: contactВata?.address || "" }} />
                    </address>
                </div>

                <div className={styles.brandColumn}>
                    <Image src="/logo-footer.png" alt="РИФ" width={180} height={90} />

                    <div>
                        <div className={styles.social}>
                            <SocialIcon href="tel:+79024829089" type="phone" />
                            <SocialIcon href="https://t.me/" type="telegram" />
                            <SocialIcon href="https://max.ru/" type="max" />
                            <SocialIcon href="rif-vl@yandex.ru" type="email" />
                        </div>
                        <div className={styles.payments} aria-label="Способы оплаты">
                            <Image src="/payments.svg" alt="Способы оплаты" width={228} height={44} />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}