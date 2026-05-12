'use client';

import { useForm, type SubmitHandler } from 'react-hook-form';
import styles from './style.module.scss';
import { useEffect, useState } from 'react';
import Link from 'next/link';

type FormData = {
    phone: string;
    checkbox: boolean;
};

type FormProps = {
    active: boolean;
};

export default function Form({ active }: FormProps) {
    const { register, handleSubmit, formState: { errors }, setFocus } = useForm<FormData>();
    //const [isSuccess, setIsSuccess] = useState(false); если response.ok
    const [error, setError] = useState<string | null>(null);
    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        if (active) {
            setFocus('phone');
        }
    }, [active, setFocus]);

    const onSubmit: SubmitHandler<FormData> = async () => {
        setIsSending(true);
        setError(null);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="Введите ваш номер телефона" {...register('phone', { required: { value: true, message: 'Введите ваш номер телефона' } })} />
            <div className={styles.input_text_error}>{errors.phone?.message}</div>

            <div className={styles.form_item_checkbox}>
                <div className={styles.checkbox_wrapper}>
                    <input
                        id="checkbox"
                        type="checkbox"
                        className={`${styles.checkbox} ${errors.checkbox ? styles.error : ''}`}
                        {...register('checkbox', { required: { value: true, message: 'Подтвердите согласие' } })}
                    />
                    <div>
                        Нажимая кнопку, даю согласие на <Link href='/policy'>обработку персональных данных</Link>
                    </div>
                </div>

                <div className={styles.input_text_error}>{errors.checkbox?.message}</div>
            </div>

            <button type="submit">Отправить</button>
            {error && <div className={styles.error_message}>{error}</div>}
            {isSending && <div className={styles.sending_message}>Отправка...</div>}
        </form>
    );
}

