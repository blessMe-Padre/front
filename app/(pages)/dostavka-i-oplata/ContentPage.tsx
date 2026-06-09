
import { ViewTransition } from 'react';
import { Dostavka } from '@/app/types/types';

import styles from './style.module.scss';

export default function ContentPage({ data }: { data?: Dostavka }) {
    console.log('data:', data);

    return (
        <ViewTransition name="dostavka-i-oplata">
            <div className="container">
                <h1>{data?.title}</h1>
            </div>

            <section className={styles.section}>
                <div className="container">
                    <div className={styles.section_content}>
                        <h2 className={styles.section_content_title}>Как сделать заказ?</h2>
                        <ul className={styles.section_content_list}>
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
                        </ul>
                    </div>
                </div>
            </section>

            <section className={styles.payments}>
                <div className="container">
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
                </div>
            </section>

            <section className={styles.section}>
                <div className="container">
                    <div className={styles.section_content}>
                        <h2 className={styles.section_content_title}>Доставка</h2>
                        <ul className={styles.section_content_list}>
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
                        </ul>
                    </div>
                </div>
            </section>
        </ViewTransition>
    );
}