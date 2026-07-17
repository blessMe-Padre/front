import fetchData from '@/app/utils/fetchData';
import Image from 'next/image';
import { Breadcrumbs } from '@/app/components';
import { FormSection, WhyChoose } from '@/app/sections';
import type { StrapiSingleResponse } from '@/app/types/types';
import styles from './style.module.scss';


type AboutData = {
    id: number;
    meta_title?: string;
    meta_description?: string;
    hero_image?: {
        url: string;
    };
    features?: {
        key: string;
        value: string;
    }[];
};

const imageServer = process.env.NEXT_PUBLIC_IMAGE_SERVER ?? "";

export async function generateMetadata() {
    const response = await fetchData<StrapiSingleResponse<AboutData>>('/api/stranicza-o-kompanii?populate=*');
    const aboutData = response.data;

    return {
        title: aboutData.meta_title ?? 'О компании | RiftVL',
        description: aboutData.meta_description ?? 'Торговая компания РИФ — материалы для производства изделий из стеклопластика',

        og: {
            title: aboutData.meta_title ?? 'О компании | RiftVL',
            description: aboutData.meta_description ?? 'Торговая компания РИФ — материалы для производства изделий из стеклопластика',
            image: aboutData.hero_image?.url
            ? `${imageServer}${aboutData.hero_image.url}`
            : "/placeholder.svg",
        },
    };
}

export default async function About() {
    const response = await fetchData<StrapiSingleResponse<AboutData>>('/api/stranicza-o-kompanii?populate=*');
    const aboutData = response.data;

    const imageSrc = aboutData.hero_image?.url
    ? `${imageServer}${aboutData.hero_image.url}`
    : "/placeholder.svg";

    return (
        <>
            <Breadcrumbs secondLabel="О компании" />
            <main className={`container ${styles.about}`}>
                <h1 className={styles.title}>Торговая компания «РИФ»</h1>

                <div className={styles.imageWrap}>
                    <Image
                        src={imageSrc}
                        alt={aboutData.meta_title ?? ''}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, 1000px"
                    />
                </div>
                <WhyChoose />

                <section className={styles.values} aria-labelledby="values-title">
                    <h2 id="values-title" className={styles.valuesTitle}>Для нас важно</h2>
                    <ul className={styles.valuesGrid}>
                        {aboutData.features?.map((value) => (
                            <li key={value.key} className={styles.valueCard}>
                                <h3>{value.key}</h3>
                                <p>{value.value}</p>
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
        </>
    );
}
