import { Fragment, ViewTransition } from 'react';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/app/components';
import fetchData from '@/app/utils/fetchData';
import type { StrapiSingleResponse } from '@/app/types/types';
import styles from './style.module.scss';
import { FormSection } from '@/app/sections';

type WholesalePageData = {
    id: number;
    title: string;
    section_title: string;
    intro: string;
    benefits?: {
        key: string;
        value: string;
    }[];
    notice_label: string;
    notice_text: string;
    meta_title: string;
    meta_description: string;
};

const pageUrl = '/api/stranicza-optovym-klientam?populate=*';

export async function generateMetadata(): Promise<Metadata> {
    const response = await fetchData<StrapiSingleResponse<WholesalePageData>>(pageUrl);

    return {
        title: response.data.meta_title,
        description: response.data.meta_description,
    };
}

export default async function OptovymKlientam() {
    const response = await fetchData<StrapiSingleResponse<WholesalePageData>>(pageUrl);
    const page = response.data;

    return (
        <ViewTransition name="optovymKlientam">
            <div className={styles.content}>
                <Breadcrumbs secondLabel={page.title} />
                <div className="container">
                    <h1 className={styles.title}>{page.title}</h1>

                    <section className={styles.panel} aria-labelledby="wholesale-title">
                        <div className={styles.panelHeader}>
                            <h2 id="wholesale-title" className={styles.heading}>
                                {page.section_title.split('\n').map((line, index) => (
                                    <Fragment key={`${line}-${index}`}>
                                        {index > 0 && <br />}
                                        {line}
                                    </Fragment>
                                ))}
                            </h2>
                            <p className={styles.intro}>
                                {page.intro.split('\n').map((line, index) => (
                                    <Fragment key={`${line}-${index}`}>
                                        {index > 0 && <br />}
                                        {line}
                                    </Fragment>
                                ))}
                            </p>
                        </div>

                        <ul className={styles.cards}>
                            {page.benefits?.map((benefit) => (
                                <li key={benefit.key} className={styles.card}>
                                    <p className={styles.cardTitle}>{benefit.key}</p>
                                    <p className={styles.cardText}>{benefit.value}</p>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <div className={styles.notice}>
                        <span className={styles.noticeLabel}>{page.notice_label}</span>
                        <p className={styles.noticeText}>{page.notice_text}</p>
                    </div>

                    <FormSection 
                        background={1} 
                        title="Заявка на оптовое сотрудничество" 
                        description="Оставьте ваш телефон, и наш специалист перезвонит Вам в кратчайшие сроки. Подберем лучшие условия для наших оптовых клиентов,  и подготовим предложение под ваше производство" 
                    />
                </div>
            </div>
        </ViewTransition>
    );
}
