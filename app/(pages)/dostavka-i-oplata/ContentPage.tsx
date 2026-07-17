
import { Dostavka } from '@/app/types/types';
import { FormSection } from '@/app/sections';

import styles from './style.module.scss';

export default function ContentPage({ data }: { data: Dostavka }) {
    return (
        <main className={`container ${styles.page}`}>
                <h1 className={styles.page_title}>{data.title ?? 'Доставка и оплата'}</h1>

                <section className={styles.section}>
                    <div className={styles.section_content}>
                        <h2 className={styles.section_content_title}>{data.order_title}</h2>
                        <ol className={styles.section_content_list}>
                            {data.order_steps?.map((step) => (
                                <li key={step.key} className={styles.section_content_item}>
                                    <span>{step.key}</span>
                                    <p>{step.value}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                <section className={styles.payments}>
                    <h2 className={styles.payments_title}>{data.payment_title}</h2>
                    <ul className={styles.payments_list}>
                        {data.payment_options?.map((option) => (
                            <li key={option.key} className={styles.payments_item}>
                                <h3>{option.key}</h3>
                                <p>{option.value}</p>
                            </li>
                        ))}
                    </ul>

                    <div className={styles.notice}>
                        <strong>{data.notice_label}</strong>
                        <p>{data.notice_text}</p>
                    </div>

                    <h3 className={styles.methods_title}>{data.payment_methods_title}</h3>
                    <ul className={styles.methods} aria-label="Способы оплаты">
                        {data.payment_methods?.map((method) => <li key={method.text}>{method.text}</li>)}
                    </ul>
                </section>

                <section className={styles.section}>
                    <div className={styles.section_content}>
                        <h2 className={styles.section_content_title}>{data.delivery_title}</h2>
                        <ol className={styles.section_content_list}>
                            {data.delivery_steps?.map((step) => (
                                <li key={step.key} className={styles.section_content_item}>
                                    <span>{step.key}</span>
                                    <p>{step.value}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                <section className={styles.companies}>
                    <h2>{data.companies_title}</h2>
                    <ul>
                        {data.transport_companies?.map((company) => (
                            <li key={`${company.title}-${company.link}`}>
                                <a
                                    href={company.link}
                                    target={company.isBlank ? '_blank' : undefined}
                                    rel={company.isBlank ? 'noopener noreferrer' : undefined}
                                >
                                    {company.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>

                <FormSection
                    background={2}
                    buttonText="Получить консультацию"
                    title="Хотите задать вопрос?"
                    description="Оставьте ваш телефон, и наш специалист перезвонит Вам в кратчайшие сроки. Мы всегда готовы помочь вам с выбором материала или ответить на любые вопросы по нашей продукции и услугам"
                />
        </main>
    );
}
