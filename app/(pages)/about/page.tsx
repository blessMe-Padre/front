import { ViewTransition } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Breadcrumbs } from '@/app/components';
import { FormSection, WhyChoose } from '@/app/sections';
import styles from './style.module.scss';

export const metadata: Metadata = {
    title: 'О компании | RiftVL',
    description: 'Торговая компания РИФ — материалы для производства изделий из стеклопластика',
};

const values = [
    {
        title: 'Качество',
        text: 'Мы тщательно контролируем каждый этап поставки, чтобы наши материалы соответствовали самым высоким стандартам',
    },
    {
        title: 'Надёжность',
        text: 'Мы работаем с проверенными производителями, а также предоставляем полный спектр услуг, включая консультации и подбор материалов под задачи клиента',
    },
    {
        title: 'Инновации',
        text: 'Мы следим за новыми тенденциями и постоянно совершенствуем наш ассортимент, чтобы предоставлять вам только самые передовые решения',
    },
    {
        title: 'Партнёрство',
        text: 'Стремимся к долгосрочным и взаимовыгодным отношениям с каждым клиентом. Наша цель — быть не просто поставщиком, а надёжным партнёром',
    },
] as const;

export default function About() {
    return (
        <ViewTransition name="about">
            <Breadcrumbs secondLabel="О компании" />
            <main className={`container ${styles.about}`}>
                <h1 className={styles.title}>Торговая компания «РИФ»</h1>

                <div className={styles.imageWrap}>
                    <Image
                        src="/about.webp"
                        alt="Склад торговой компании РИФ"
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, 1400px"
                    />
                </div>

                <WhyChoose />

                <section className={styles.values} aria-labelledby="values-title">
                    <h2 id="values-title" className={styles.valuesTitle}>Для нас важно</h2>
                    <ul className={styles.valuesGrid}>
                        {values.map((value) => (
                            <li key={value.title} className={styles.valueCard}>
                                <h3>{value.title}</h3>
                                <p>{value.text}</p>
                            </li>
                        ))}
                    </ul>
                </section>

                <FormSection
                    background={1}
                    title="Хотите задать вопрос?"
                    description="Оставьте ваш телефон, и наш специалист перезвонит Вам в кратчайшие сроки. Мы всегда готовы помочь вам с выбором материала или ответить на любые вопросы по нашей продукции и услугам"
                />
            </main>
        </ViewTransition>
    );
}
