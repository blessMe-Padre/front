'use client';

import { useForm, type SubmitHandler } from 'react-hook-form';
import styles from './style.module.scss';
import { type CSSProperties, useEffect, useId, useState } from 'react';
import Link from 'next/link';

type FormData = {
    phone: string;
    checkbox: boolean;
};

const url = `${process.env.NEXT_PUBLIC_API_SERVER}/api/contact-form/send`;

async function sendContactFormService(formData: FormData) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            data: {
                contact: formData.phone,
                consent: formData.checkbox,
            },
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.error?.message || 'Не удалось отправить заявку');
    }

    return data;
}

type FormProps = {
    active?: boolean;
    submitLabel?: string;
    formStyle?: CSSProperties;
    buttonStyle?: CSSProperties;
    buttonClassName?: string;
};

export default function Form({
    active = false,
    submitLabel = 'Отправить',
    formStyle,
    buttonClassName,
}: FormProps) {
    const { register, handleSubmit, formState: { errors }, setFocus, reset } = useForm<FormData>();
    const [error, setError] = useState<string | null>(null);
    const [isSending, setIsSending] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const checkboxId = useId();

    useEffect(() => {
        if (active) {
            setFocus('phone');
        }
    }, [active, setFocus]);

    const onSubmit: SubmitHandler<FormData> = async (formData) => {
        setIsSending(true);
        setError(null);
        setIsSuccess(false);

        try {
            await sendContactFormService(formData);
            reset();
            setIsSuccess(true);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Не удалось отправить заявку');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
            <div className={styles.form_item}>
                <input 
                    type="text" 
                    placeholder="Укажите телефон или email" 
                    {...register('phone', { required: { value: true, message: 'Укажите телефон или email' } })} 
                    className={`${styles.input} ${errors.phone ? styles.error : ''}`}
                />
                <div className={styles.error_message}>{errors.phone?.message}</div>
            </div>

            <button 
                className={`${styles.form_button} ${buttonClassName ?? ''}`}
                type="submit"
                disabled={isSending}
                >
                    {isSending ? 'Отправка...' : submitLabel}
            </button>

            <div className={styles.form_item_checkbox}>
                <div className={styles.checkbox_wrapper}>
                    <input
                        id={checkboxId}
                        type="checkbox"
                        className={`${styles.checkbox} ${errors.checkbox ? styles.error : ''}`}
                        {...register('checkbox', { required: { value: true, message: 'Подтвердите согласие' } })}
                    />
                    <span>
                        Нажимая кнопку, даю согласие на <Link href='/policy'>обработку персональных данных</Link>
                    </span>
                </div>

                <div className={styles.error_message}>{errors.checkbox?.message}</div>
            </div>

            {error && <div className={styles.error_message}>{error}</div>}
            {isSuccess && <div className={styles.success_message}>Ваша заявка успешно отправлена. В ближайшее время с вами свяжется наш менеджер для уточнения деталей.
            </div>}
        </form>
    );
}

