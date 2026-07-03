'use client';


import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

import useCartStore from '@/app/store/cartStore';

import styles from './style.module.scss';

// Иван
// ivan@gmail.com
// +79999999999

type FormData = {
    name?: string;
    email: string;
    phone: string;
    customer_type: 'individual' | 'legal';
    delivery_type: 'pickup' | 'delivery';
    company_name?: string;
    inn?: string;
    kpp?: string;
    legal_address?: string;
    orderItems?: OrderItem[];
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
        }
    });

    const customerType = watch('customer_type');
    const deliveryType = watch('delivery_type');
    const cartItems = useCartStore((state) => state.cartItems);
    const clearCart = useCartStore((state) => state.clearCart);


    const [isSending, setIsSending] = useState(false);

    const onSubmit: SubmitHandler<FormData> = async (formData) => {
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

            console.log(response);
            console.log(data);

            if (response.ok) {
                clearCart();
                reset();
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
                </div>

                <div className={styles.total_block}>
                    <button 
                        className={styles.form_button}
                        type="submit"
                        disabled={isSending}
                        >
                            {isSending ? 'Отправка...' : 'Оформить заказ'}
                    </button>
                </div>
            </div>
        </form>
    </div>
    );
}