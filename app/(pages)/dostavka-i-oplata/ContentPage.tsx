
import { ViewTransition } from 'react';
import { Dostavka } from '@/app/types/types';
import { FormSection } from '@/app/sections';

import styles from './style.module.scss';

export default function ContentPage({ data }: { data?: Dostavka }) {
    return (
        <ViewTransition name="dostavka-i-oplata">
            <main className={`container ${styles.page}`}>
                <h1 className={styles.page_title}>{data?.title || 'Доставка и оплата'}</h1>

                <section className={styles.section}>
                    <div className={styles.section_content}>
                        <h2 className={styles.section_content_title}>Как сделать заказ?</h2>
                        <ol className={styles.section_content_list}>
                            <li className={styles.section_content_item}>
                                <span>1 шаг</span>
                                <p>Выбрать товар на сайте: Перейдите в наш каталог, выберите нужный материал, добавьте его в корзину и оформите заказ</p>
                            </li>
                            <li className={styles.section_content_item}>
                                <span>2 шаг</span>
                                <p>Менеджер свяжется с вами: После оформления заказа наш менеджер свяжется с вами для уточнения всех деталей и, если необходимо, скорректирует ваш выбор</p>
                            </li>
                            <li className={styles.section_content_item}>
                                <span>3 шаг</span>
                                <p>Получите ссылку на оплату: Мы отправим вам ссылку для онлайн-оплаты или сформируем счет, который можно оплатить через банк или систему «банк-клиент»</p>
                            </li>
                        </ol>
                    </div>
                </section>

                <section className={styles.payments}>
                    <h2 className={styles.payments_title}>Как оплатить заказ?</h2>
                    <ul className={styles.payments_list}>
                        <li className={styles.payments_item}>
                            <h3>Для физических лиц</h3>
                            <p>Оплатить счет можно в любом банке, Сберкассе или через систему «банк-клиент». Если Вы выбрали оплату наличными, оплатите заказ при получении </p>
                        </li>
                        <li className={styles.payments_item}>
                            <h3>Для юридических лиц</h3>
                            <p>Выставляется счет на оплату, который необходимо погасить через расчетный счет вашей компании</p>
                        </li>
                    </ul>

                    <div className={styles.notice}>
                        <strong>Важно</strong>
                        <p>Мы не работаем с наложенным платежом, не принимаем и не отправляем деньги с карты на карту</p>
                    </div>

                    <h3 className={styles.methods_title}>Способы оплаты</h3>
                    <ul className={styles.methods} aria-label="Способы оплаты">
                        <li>Наличные</li>
                        <li>Счёт на оплату</li>
                        <li>Онлайн оплата</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <div className={styles.section_content}>
                        <h2 className={styles.section_content_title}>Доставка</h2>
                        <ol className={styles.section_content_list}>
                            <li className={styles.section_content_item}>
                                <span>1 шаг</span>
                                <p>Выбор транспортной компании по Вашему желанию. Если вы не выбрали транспортную компанию, наши менеджеры порекомендуют вам подходящий вариант исходя из цены 
                                и скорости доставки</p>
                            </li>
                            <li className={styles.section_content_item}>
                                <span>2 шаг</span>
                                <p>Отправка товара. Отправка осуществляется 
2 раза в неделю — по вторникам и четвергам. До любой транспортной компании в пределах города Владивостока доставка заказа -бесплатно. После отправки груза мы уведомим вас через СМС с номером накладной и названием транспортной компании</p>
                            </li>
                            <li className={styles.section_content_item}>
                                <span>3 шаг</span>
                                <p>Получение товара. Когда ваш товар прибудет в пункт назначения, транспортная компания уведомит вас о дате и месте для получения груза. Обычно за доставку оплачивает клиент при получении товара.</p>
                            </li>
                        </ol>
                    </div>
                </section>

                <section className={styles.companies}>
                    <h2>Транспортные компании, с которыми мы сотрудничаем</h2>
                    <ul>
                        <li>ООО Алатан</li>
                        <li>ООО Солнечный Магадан</li>
                        <li>ООО ЖелДорЭкспедиция</li>
                        <li>ООО Баграм</li>
                        <li>ООО Автотрейдинг</li>
                        <li>ООО ВЛ-Лоджистик</li>
                        <li>ООО СПСР-Экспресс</li>
                        <li>BUS-Курьер</li>
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
