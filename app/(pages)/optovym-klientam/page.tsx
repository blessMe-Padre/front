import { ViewTransition } from 'react';
import { Breadcrumbs, Form } from '@/app/components';
import styles from './style.module.scss';

const benefits = [
    {
        title: 'до -35%',
        text: 'Чем больше объем закупки, тем ниже цена за единицу товара',
    },
    {
        title: 'Гибкая оплата',
        text: 'индивидуальные условия оплаты для наших оптовых клиентов, включая рассрочку и гибкие графики платежей',
    },
    {
        title: '24/7',
        text: 'доступ к консультациям специалистов, которые помогут с выбором материалов',
    },
    {
        title: 'на 30%',
        text: 'сокращаем время доставки, за счет работы с крупными партиями и отлаженной логистики',
    },
] as const;

export default function OptovymKlientam() {
    return (
        <ViewTransition name="optovymKlientam">
            <div className={styles.content}>
                <Breadcrumbs secondLabel="Оптовым клиентам" />
                <div className="container">
                    <h1 className={styles.title}>Оптовым клиентам</h1>

                    <section className={styles.panel} aria-labelledby="wholesale-title">
                        <div className={styles.panelHeader}>
                            <h2 id="wholesale-title" className={styles.heading}>
                                Оптовым клиентам <br />
                                (юридическим лицам и производствам)
                            </h2>
                            <p className={styles.intro}>
                                Мы предлагаем продажу как в розницу (от 1 кг), так и оптом (в заводской упаковке).
                                <br />
                                <br />
                                Чем больше объем упаковки, тем более выгодная цена. Для производств с регулярными
                                закупками предусмотрены индивидуальные условия, гибкие формы оплаты и техническая
                                поддержка.
                            </p>
                        </div>

                        <ul className={styles.cards}>
                            {benefits.map((benefit) => (
                                <li key={benefit.title} className={styles.card}>
                                    <p className={styles.cardTitle}>{benefit.title}</p>
                                    <p className={styles.cardText}>{benefit.text}</p>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <div className={styles.notice}>
                        <span className={styles.noticeLabel}>Важно</span>
                        <p className={styles.noticeText}>
                            Условия (скидка, отсрочка, остатки, кастомизация) зависят от номенклатуры, объёма и
                            регулярности закупок. Оставьте заявку — соберём предложение под ваше производство.
                        </p>
                    </div>

                    <section className={styles.request} aria-labelledby="wholesale-request-title">
                        <div className={styles.requestText}>
                            <div className={styles.requestInner}>
                                <h2 id="wholesale-request-title" className={styles.requestTitle}>
                                    Заявка на оптовое сотрудничество
                                </h2>
                                <p className={styles.requestDescription}>
                                    Оставьте ваш телефон, и наш специалист перезвонит Вам в кратчайшие сроки. Подберем
                                    лучшие условия для наших оптовых клиентов, и подготовим предложение под ваше
                                    производство
                                </p>
                            </div>
                        </div>

                        <div className={styles.formWrap}>
                            <Form
                                submitLabel="Получить выгоду"
                                buttonClassName={styles.requestButton}
                            />
                        </div>
                    </section>
                </div>
            </div>
        </ViewTransition>
    );
}