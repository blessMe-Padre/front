'use client'
import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import styles from './style.module.scss';

import Link from 'next/link';
import useUserStore from '@/app/store/userStore';
import { notFound } from 'next/navigation';

const url = `${process.env.NEXT_PUBLIC_API_SERVER}/api/auth/local/`;
// Иван
// zarodiny@yandex.ru
// 123456789

type LoginFormData = {
    identifier: string;
    password: string;
    checkbox: boolean;
};

type LoginResponseData = {
    jwt?: string;
    user?: {
        username?: string;
        [key: string]: unknown;
    };
    error?: {
        message?: string;
    };
};

function setAuthCookie(jwt: string) {
    document.cookie = `jwt=${jwt}; path=/; max-age=${60 * 60 * 24 * 7}; Secure; SameSite=Strict`;
}

export async function loginUserService(userData: LoginFormData) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    const data = await response.json() as LoginResponseData;
    return { response, data };
}

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
    //const [isSuccess, setIsSuccess] = useState(false); если response.ok
    const [error, setError] = useState<string | null>(null);
    const [isSending, setIsSending] = useState(false);
    const setUserData = useUserStore((state) => state.setUserData);

    const userData = useUserStore((state) => state.userData);
    console.log('userData', userData);

    const onSubmit: SubmitHandler<LoginFormData> = async (formData) => {
        setIsSending(true);
        setError(null);

        try {
            const { response, data } = await loginUserService(formData);
            if (response.ok) {
                setUserData(data.user);
                if (data.jwt) {
                    setAuthCookie(data.jwt);
                }
                console.log('Успешный вход', data?.user?.username);
                console.log('Данные пользователя', data);

                // router.refresh(); // dirty fix, but it works
                // router.push("/dashboard");
                // window.location.href = '/dashboard';

            } else {
                setError('Ошибка входа: неверный логин/пароль');
            }
        } catch {
            setError('Ошибка запроса, попробуйте позже');
        } finally {
            setIsSending(false);
        }
    };

    return notFound();

    // return (
    //     <div className={styles.page_wrapper}>
    //         <div className="container">
    //             <h1 className={styles.title}>Авторизация</h1>
    //             <p className={styles.sub_title}>Для входа на сайт введите вашу электронную почту</p>
    //             <div className={styles.form_wrapper}>
    //                 <form onSubmit={handleSubmit(onSubmit)}>
    //                     <div className={styles.form_item}>
    //                         <label htmlFor="identifier">Email</label>
    //                         <input
    //                             id="identifier"
    //                             type="text"
    //                             placeholder="Введите email"
    //                             className={`${errors.identifier ? styles.error : ''}`}
    //                             {...register('identifier', { required: { value: true, message: 'Введите email' } })}
    //                         />
    //                         <div className={styles.input_text_error}>{errors.identifier?.message}</div>
    //                     </div>

    //                     <div className={styles.form_item}>
    //                         <label htmlFor="password">Пароль</label>
    //                         <input
    //                             id="password"
    //                             type="password"
    //                             placeholder='Введите пароль'
    //                             className={`${errors.password ? styles.error : ''}`}
    //                             {...register('password', { required: { value: true, message: 'Введите пароль' } })}
    //                         />
    //                         <div className={styles.input_text_error}>{errors.password?.message}</div>
    //                     </div>

    //                     <div className={styles.form_item_checkbox}>
    //                         <div className={styles.checkbox_wrapper}>
    //                             <input
    //                                 id="checkbox"
    //                                 type="checkbox"
    //                                 className={`${styles.checkbox} ${errors.checkbox ? styles.error : ''}`}
    //                                 {...register('checkbox', { required: { value: true, message: 'Подтвердите согласие' } })}
    //                             />
    //                             <div>
    //                                 Нажимая кнопку, даю согласие на <Link href='/policy'>обработку персональных данных</Link>
    //                             </div>
    //                         </div>

    //                         <div className={styles.input_text_error}>{errors.checkbox?.message}</div>
    //                     </div>

    //                     <button className={styles.form_button}>
    //                         Войти
    //                         {!isSending &&
    //                             <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    //                                 <path d="M4.05507 1.43907L17.1536 1.43888M17.1536 1.43888L17.1536 14.3511M17.1536 1.43888L1.93782 16.6546" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    //                             </svg>
    //                         }

    //                         {isSending &&
    //                             <svg width="25" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><radialGradient id="a9" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)"><stop offset="0" stopColor="#000000"></stop><stop offset=".3" stopColor="#000000" stopOpacity=".9"></stop><stop offset=".6" stopColor="#000000" stopOpacity=".6"></stop><stop offset=".8" stopColor="#000000" stopOpacity=".3"></stop><stop offset="1" stopColor="#000000" stopOpacity="0"></stop></radialGradient><circle fill="none" stroke="url(#a9)" strokeWidth="15" strokeLinecap="round" strokeDasharray="200 1000" strokeDashoffset="0" cx="100" cy="100" r="70"><animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform></circle><circle fill="none" opacity=".2" stroke="#000000" strokeWidth="15" strokeLinecap="round" cx="100" cy="100" r="70"></circle></svg>
    //                         }
    //                     </button>
    //                     {error && <div className={styles.error_message}>{error}</div>}
    //                 </form>
    //                 <a className={styles.register_link} href="/register">Нет аккаунта? <span>Зарегистрироваться</span></a>
    //             </div>
    //         </div>
    //     </div>
    // )
}

export default Login;