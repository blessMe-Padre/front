import type { Metadata } from 'next';
import { Breadcrumbs, Form } from '@/app/components';
import type { Contact, StrapiSingleResponse } from '@/app/types/types';
import fetchData from '@/app/utils/fetchData';
import normalizePhone from '@/app/utils/NormalizePhone';
import styles from './style.module.scss';

export const metadata: Metadata = {
    title: 'Контакты | RiftVL',
    description: 'Контакты компании RiftVL во Владивостоке',
};

export default async function ContactsPage() {
    const response = await fetchData<StrapiSingleResponse<Contact>>('/api/kontakty');
    const contacts = response.data;

    return (
        <>
            <Breadcrumbs secondLabel="Контакты" />
            <main className={`container ${styles.page}`}>
                <h1 className={styles.title}>Контакты</h1>

                <div className={styles.cards}>
                    <section className={styles.card}>
                        <h2>Адрес</h2>
                        <div dangerouslySetInnerHTML={{ __html: contacts?.address || 'г. Владивосток' }} />
                    </section>

                    <section className={styles.card}>
                        <h2>Телефон</h2>
                        <div className={styles.phones}>
                            {contacts?.phone && <a href={`tel:${normalizePhone(contacts.phone)}`}>{contacts.phone}</a>}
                            {contacts?.phone_2 && <a href={`tel:${normalizePhone(contacts.phone_2)}`}>{contacts.phone_2}</a>}
                        </div>
                        <span className={styles.timezone}>МСК+7</span>
                    </section>

                    <section className={styles.card}>
                        <h2>Режим работы</h2>
                        <p>ПН-ПТ 9:00-18:00<br />СБ 10:00-16:00</p>
                    </section>

                    <section className={styles.card}>
                        <h2>E-mail</h2>
                        {contacts?.email && <a href={`mailto:${contacts.email}`}>{contacts.email}</a>}
                    </section>
                </div>

                <div className={styles.map}>
                    <iframe
                        src="https://yandex.ru/map-widget/v1/?ll=131.925220%2C43.141841&mode=search&oid=1113538927&ol=biz&z=16.45"
                        title="RiftVL на карте"
                        loading="lazy"
                        allowFullScreen
                    />
                </div>

                <section className={styles.consultation}>
                    <div className={styles.consultationContent}>
                        <h2>Хотите задать вопрос?</h2>
                        <p>Оставьте ваш телефон, и наш специалист перезвонит Вам в кратчайшие сроки. Мы всегда готовы помочь вам с выбором материала или ответить на любые вопросы по нашей продукции и услугам</p>
                    </div>
                    <Form submitLabel="Получить консультацию" />
                </section>
            </main>
        </>
    );
}
