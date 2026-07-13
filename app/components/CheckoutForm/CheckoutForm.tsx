'use client';


import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, type SubmitHandler } from 'react-hook-form';

import CartItem from "@/app/components/CartItem/CartItem";
import useCartStore from "@/app/store/cartStore";

import styles from './style.module.scss';
import Link from 'next/link';

// Иван
// ivan@gmail.com
// +79999999999

type FormData = {
    name?: string;
    email: string;
    phone: string;
    customer_type: 'individual' | 'legal';
    delivery_type: 'pickup' | 'delivery';
    payment_method: 'order' | 'online' | 'cash';
    company_name?: string;
    inn?: string;
    kpp?: string;
    legal_address?: string;
    orderItems?: OrderItem[];
    comment?: string;
    policy_agreement?: boolean;
    oferta_agreement?: boolean;
};

type OrderItem = {
    productId: number;
    documentId?: string;
    title: string;
    sku?: string;
    id1c?: string;
    quantity: number;
    price: number;
    priceSales?: number | null;
    total: number;
};

const url = `${process.env.NEXT_PUBLIC_API_SERVER}/api/zakazies`;

export async function sendOrderService(orderData: FormData) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: { ...orderData } }),
        });

        const data = await response.json();
        return { response, data };
    } catch (error) {
        console.error("sendOrder Service Error:", error);
        throw error;
    }
}

export default function CheckoutForm() {
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<FormData>({
        // Задаем значение по умолчанию для поля customer_type
        defaultValues: {
            customer_type: 'individual', 
            delivery_type: 'pickup',
            payment_method: 'order',
        }
    });

    const customerType = watch('customer_type');
    const deliveryType = watch('delivery_type');
    const payment_method = watch('payment_method');

    const [isSending, setIsSending] = useState(false);
    const router = useRouter();


    const cartItems = useCartStore((state) => state.cartItems);
    const increaseQuantity = useCartStore((state) => state.increaseQuantity);
    const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const clearCart = useCartStore((state) => state.clearCart);

    const { counter, price } = useMemo(() => {
        return cartItems.reduce(
            (totals, item) => ({
                counter: totals.counter + item.quantity,
                price: totals.price + (item.price ?? 0) * item.quantity,
            }),
            { counter: 0, price: 0 }
        );
    }, [cartItems]);

    const isCartEmpty = cartItems.length === 0;

    const onSubmit: SubmitHandler<FormData> = async (formData) => {
        if (isCartEmpty) return;

        setIsSending(true);

        try {
            const orderItems = cartItems.map((item) => {
                const price = item.price ?? 0;

                return {
                    productId: item.id,
                    documentId: item.documentId,
                    title: item.title,
                    sku: item.sku,
                    id1c: item.id1c,
                    quantity: item.quantity,
                    price,
                    priceSales: item.priceSales ?? null,
                    total: price * item.quantity,
                };
            });

            const { response, data } = await sendOrderService({
                ...formData,
                orderItems,
            });

            console.log(data);

            if (response.ok) {
                reset();
                clearCart();
                const orderUnicNumber = data?.data?.orderUnicNumber;
                const successUrl = orderUnicNumber
                    ? `/checkout/success?order=${encodeURIComponent(orderUnicNumber)}`
                    : '/checkout/success';

                router.push(successUrl);
            }
        } finally {
            setIsSending(false);
        }
    };

    return (
    <div className={styles.form}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.form__wrapper}>
                <div className={styles.customer_info_block}>
                    {/* Данные покупателя */}
                    <div className={styles.customer_info}>
                        <h2 className={styles.form_title}>1. Данные покупателя</h2>

                        <div className={styles.buttons_row}>
                            <label htmlFor="individual"
                            className={`${styles.button_label} ${customerType === 'individual' ? styles.isActive : ''}`}>Физическое лицо
                                <input type="radio"  id="individual" {...register('customer_type')} value="individual"/>
                            </label>
 
                            <label htmlFor="legal"
                            className={`${styles.button_label} ${customerType === 'legal' ? styles.isActive : ''}`}
                            >Юридическое лицо
                                <input type="radio" id="legal" {...register('customer_type')} value="legal" />
                            </label>
                        </div>

                        {customerType === 'individual' && (
                        <div className={`${styles.individual_info}`}>
                            <div className={styles.form_item}>
                                <input 
                                    type="text" 
                                    placeholder="ФИО*" 
                                    {...register('name', { required: { value: true, message: 'Укажите ФИО' } })} 
                                    className={`${styles.input} ${errors.name ? styles.error : ''}`}
                                />
                                <div className={styles.error_message}>{errors.name?.message}</div>
                            </div>

                            <div className={styles.form_item}>
                                <input 
                                    type="email" 
                                    placeholder="e-mail*" 
                                    {...register('email', { required: { value: true, message: 'Укажите email' } })} 
                                    className={`${styles.input} ${errors.email ? styles.error : ''}`}
                                />
                                <div className={styles.error_message}>{errors.email?.message}</div>
                            </div>

                            <div className={styles.form_item}>
                                <input 
                                    type="tel" 
                                    placeholder="+ 7 (000) 000 00 00*" 
                                    {...register('phone', { required: { value: true, message: 'Укажите телефон' } })} 
                                    className={`${styles.input} ${errors.phone ? styles.error : ''}`}
                                />
                                <div className={styles.error_message}>{errors.phone?.message}</div>
                            </div>
                        </div>
                        )}

                        {customerType === 'legal' && (
                            <div className={`${styles.legal_info}`}>
                                <div className={styles.form_item}>
                                    <input type="text" placeholder="Название компании*" {...register('company_name', { required: { value: true, message: 'Укажите название компании' } })} className={`${styles.input} ${errors.company_name ? styles.error : ''}`} />
                                    <div className={styles.error_message}>{errors.company_name?.message}</div>
                                </div>
                                <div className={styles.form_item}>
                                    <input type="text" placeholder="Контактное лицо*" {...register('name', { required: { value: true, message: 'Контактное лицо' } })} className={`${styles.input} ${errors.name ? styles.error : ''}`} />
                                    <div className={styles.error_message}>{errors.name?.message}</div>
                                </div>

                                <div className={styles.form_item}>
                                    <input type="text" placeholder="ИНН*" {...register('inn', { required: { value: true, message: 'Укажите ИНН' } })} className={`${styles.input} ${errors.inn ? styles.error : ''}`} />
                                    <div className={styles.error_message}>{errors.inn?.message}</div>
                                </div>
                                <div className={styles.form_item}>
                                    <input type="text" placeholder="КПП*" {...register('kpp', { required: { value: true, message: 'Укажите КПП' } })} className={`${styles.input} ${errors.kpp ? styles.error : ''}`} />
                                    <div className={styles.error_message}>{errors.kpp?.message}</div>
                                </div>
                                <div className={styles.form_item}>
                                    <input type="text" placeholder="Юридический адрес*" {...register('legal_address', { required: { value: true, message: 'Укажите Юридический адрес' } })} className={`${styles.input} ${errors.legal_address ? styles.error : ''}`} />
                                    <div className={styles.error_message}>{errors.legal_address?.message}</div>
                                </div>
                                <div className={styles.form_item}>
                                <input 
                                        type="email" 
                                        placeholder="e-mail*" 
                                        {...register('email', { required: { value: true, message: 'Укажите email' } })} 
                                        className={`${styles.input} ${errors.email ? styles.error : ''}`}
                                    />
                                    <div className={styles.error_message}>{errors.email?.message}</div>
                                </div>

                                <div className={styles.form_item}>
                                    <input 
                                        type="tel" 
                                        placeholder="+ 7 (000) 000 00 00*" 
                                        {...register('phone', { required: { value: true, message: 'Укажите телефон' } })} 
                                        className={`${styles.input} ${errors.phone ? styles.error : ''}`}
                                    />
                                    <div className={styles.error_message}>{errors.phone?.message}</div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Выберете способ доставки */}
                    <div className={styles.delivery_info}>
                        <h2 className={styles.form_title}>2. Выберете способ доставки</h2>

                        <div className={styles.buttons_row}>
                            <label htmlFor="pickup"
                            className={`${styles.button_label} ${deliveryType === 'pickup' ? styles.isActive : ''}`}>Самовывоз
                                <input type="radio" id="pickup" {...register('delivery_type')} value="pickup" />
                            </label>
                            <label htmlFor="delivery"
                            className={`${styles.button_label} ${deliveryType === 'delivery' ? styles.isActive : ''}`}>Транспортная компания
                                <input type="radio" id="delivery" {...register('delivery_type')} value="delivery" />
                            </label>
                        </div>
                        {deliveryType === 'pickup' && (
                            <div className={styles.delivery_info_content}>
                               <p>Вы можете самостоятельно забрать заказ с нашего склада в г. Владивосток</p>
                               <p>Самовывоз осуществляется по адресу: г. Владивосток, ул. Днепровская 21в, 1 этаж</p>
                            </div>
                        )}

                        {deliveryType === 'delivery' && (
                            <div className={styles.delivery_info_content}>
                                <p>Грузовой транспорт компании РИФ бесплатно доставит груз по желанию клиента до любой транспортной компании г. Владивостока.</p>
                                <p>Если же вы не определились с выбором транспортной компании, то менеджеры компании РИФ исходя из опыта (цена и скорость доставки) выберут для вас наиболее подходящую.</p>
                                <p>После отправки груза мы проинформируем Вас через СМС о номере накладной и какой именно транспортной был отправлен груз.</p>
                            </div>
                        )}



                    </div>

                    <div className={`${styles.form_item} ${styles.comment_item}`}>
                        <textarea placeholder="Комментарий к заказу" {...register('comment')} className={`${errors.comment ? styles.error : ''}`} />
                        <div className={styles.error_message}>{errors.comment?.message}</div>
                    </div>

                    {/* Выберете способ оплаты */}
                    <div className={styles.payment_info}>
                        <h2 className={styles.form_title}>3. Выберете способ оплаты</h2>

                        <div className={styles.buttons_row}>
                            <label htmlFor="order"
                            className={`${styles.button_label} ${payment_method === 'order' ? styles.isActive : ''}`}>Счет на оплату
                                <input type="radio" id="order" {...register('payment_method')} value="order" />
                            </label>
                            <label htmlFor="online"
                            className={`${styles.button_label} ${payment_method === 'online' ? styles.isActive : ''}`}>Онлайн оплата
                                <input type="radio" id="online" {...register('payment_method')} value="online" />
                            </label>
                            <label htmlFor="cash"
                            className={`${styles.button_label} ${payment_method === 'cash' ? styles.isActive : ''}`}>Наличный расчет
                                <input type="radio" id="cash" {...register('payment_method')} value="cash" />
                            </label>
                        </div>
                    </div>

                    {/* Товары к оформлению */}
                    <div className={styles.orders_block}>
                        <h2 className={styles.form_title}>4. Товары к оформлению</h2>
                        <div>
                            {cartItems.length > 0 ? (
                                <ul className={styles.cart_list}>
                                    {cartItems.map((item) => (
                                        <CartItem 
                                        key={item.id} 
                                        item={item}
                                        increaseQuantity={increaseQuantity}
                                        decreaseQuantity={decreaseQuantity}
                                        removeFromCart={removeFromCart}
                                    />
                                    ))}
                                </ul>
                            ) : (
                                <p>Товаров нет в корзине, вы не можете оформить заказ, вернитесь на <Link href="/">страницу каталога</Link></p>
                            )}
                        </div>

                    </div>
                </div>

                {/* Итого */}
                <div className={styles.total_block_wrapper}>
                    <div className={styles.total_block}>
                        <div className={styles.total_summary_item}>
                            <span>Итого:</span>
                            <span>{price.toLocaleString('ru-RU')} ₽</span>
                        </div>
                        <div className={styles.total_block_item}>
                            <span>Товаров:</span>
                            <span>{counter}</span>
                        </div>
                        <div className={styles.total_block_item}>
                            <span>Доставка:</span>
                            <span>{deliveryType === 'pickup' ? 'Самовывоз' : 'Транспортная компания'}</span>
                        </div>
                        <button 
                            className={styles.form_button}
                            type="submit"
                            disabled={isSending || isCartEmpty}
                            >
                                {isSending ? 'Отправка...' : 'Оформить заказ'}
                        </button>

                        <div className={`${styles.form_item} ${styles.agreement_item}`}>
                            <div className={styles.agreement_item_row}>
                                <input 
                                type="checkbox" 
                                {...register('policy_agreement', { required: { value: true, message: 'Укажите согласие с политикой конфиденциальности' } })} 
                                className={`${styles.input} ${errors.policy_agreement ? styles.error : ''}`}
                                />
                                <label htmlFor="policy_agreement">Я согласен с <Link href="/policy" target="_blank">политикой конфиденциальности</Link></label>
                            </div>
                            <div className={styles.error_message}>{errors.policy_agreement?.message}</div>
                        </div>

                        <div className={`${styles.form_item} ${styles.agreement_item}`}>
                            <div className={styles.agreement_item_row}>
                                <input 
                                type="checkbox" 
                                {...register('oferta_agreement', { required: { value: true, message: 'Укажите согласие с публичной офертой' } })} 
                                className={`${styles.input} ${errors.oferta_agreement ? styles.error : ''}`}
                                />
                                <label htmlFor="oferta_agreement">Я согласен с <Link href="/oferta" target="_blank">публичной офертой</Link></label>
                            </div>
                            <div className={styles.error_message}>{errors.oferta_agreement?.message}</div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
    );
}