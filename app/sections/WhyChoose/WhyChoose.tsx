'use client';

import styles from "./style.module.scss";

const CARDS = [
    {
        value: ">15 лет",
        text: "компания работает на рынке. Обслуживается в ДВ банке. Предоставляем всю необходимую документацию о компании",
    },
    {
        value: "90%",
        text: (
            <>
                клиентов становятся нашими постоянными покупателями. Лучшее соотношение —{" "}
                <span className={styles.cardAccent}>цена | качество | срок</span>
            </>
        ),
    },
    {
        value: "за 1 час",
        text: "производим точный расчёт материалов с использованием фирменного программного обеспечения. Точное соответствие расчета техническому заданию",
    },
    {
        value: "Бесплатно",
        text: (
            <>
                отвозим ваш заказ
                <br />
                до транспортной компании
                <br />
                в кротчайший срок, и информируем Вас об этом с помощью СМС
            </>
        ),
    },
] as const;

export default function WhyChoose() {
    return (
        <section className={styles.whyChoose} aria-labelledby="why-choose-title">
            <div className={styles.panel}>
                <h2 id="why-choose-title" className={styles.title}>
                    Почему выбирают РИФ
                </h2>

                <div className={styles.intro}>
                    <p className={styles.introText}>
                        Наш ассортимент смол и стеклотканей позволит вам воспроизвести в стеклопластике любые
                        задуманные вами изделия
                    </p>
                    <p className={styles.headline}>
                        Мы <strong>гарантируем качество</strong> наших смол и имеем лабораторные исследования на
                        каждую партию товара
                    </p>
                    <p className={styles.introText}>
                        Все полиэфирные смолы и гелькоуты марки Polysystem разработаны специально для суровых
                        погодных условий России, и получили высокую оценку наших потребителей
                    </p>
                </div>

                <ul className={styles.cards}>
                    {CARDS.map((card) => (
                        <li key={card.value} className={styles.card}>
                            <p className={styles.cardValue}>{card.value}</p>
                            <p className={styles.cardText}>{card.text}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
