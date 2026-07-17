'use client'

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { notFound } from 'next/navigation';
import styles from './style.module.scss';


const url = `${process.env.NEXT_PUBLIC_API_SERVER}/api/auth/local/register`;
// zarodiny@yandex.ru
// 123456789

type RegisterFormData = {
    email: string;
    password: string;
};

type RegisterPayload = RegisterFormData & {
    username: string;
};

type RegisterResponseData = {
    error?: {
        message?: string;
    };
};

export async function registerUserService(userData: RegisterPayload) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json() as RegisterResponseData;
        return { response, data }; // возвращаем и response, и data
    } catch (error) {
        console.error("Registration Service Error:", error);
        throw error; // пробрасываем ошибку дальше
    }
}

export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    // const [notification, setNotification] = useState('');
    const [sending, isSending] = useState(false);


    const onSubmit: SubmitHandler<RegisterFormData> = async (formData) => {
        isSending(true);
        setError(null);
        setIsSuccess(false);
        // setNotification('Пройдите капчу');

        // const captureResponse = window.grecaptcha?.getResponse();

        // if (!captureResponse) {
        //     isSending(false);
        //     return;
        // }

        const email = formData.email.trim().toLowerCase();
        const payload = {
            email,
            password: formData.password,
            username: email,
        };

        try {
            // const captchaRes = await fetch('/api/captcha', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ captureResponse }),
            // });
            // const captchaResult = await captchaRes.json();
            // setNotification(captchaResult.message);

            // if (!captchaResult.ok) {
            //     isSending(false);
            //     return;
            // }

            const { response, data } = await registerUserService(payload);
            if (response.ok) {
                setIsSuccess(true);
                setError(null);
                // reset();

                // router.refresh(); // dirty fix, but it works
                // router.push("/dashboard");
                // window.location.href = '/dashboard';
            } else {
                setError(data?.error?.message || 'Что-то пошло не так');
                // window.grecaptcha?.reset();
                console.error('Статус ошибки:', response.status, data);
            }
        } catch (err) {
            setError('Ошибка запроса, попробуйте позже');
            // window.grecaptcha?.reset();
            console.error('Fetch error:', err);
        } finally {
            isSending(false);
        }
    };



    return notFound();

    //return (
        // <div className={styles.page_wrapper}>
        //     <div className="container">
        //         <div>
        //             <h1 className={styles.title}>Регистрация</h1>
        //             <p className={styles.sub_title}>Для регистрации на сайте введите вашу электронную почту</p>
        //             <div className={styles.form_wrapper}>
        //                 <form onSubmit={handleSubmit(onSubmit)}>
        //                     <div className={styles.form_item}>
        //                         <label htmlFor="email">Email</label>
        //                         <input
        //                             id="email"
        //                             type="text"
        //                             placeholder="Введите email"
        //                             className={`${errors.email ? styles.error : ''}`}
        //                             {...register('email', { required: { value: true, message: 'Введите email' } })}
        //                         />
        //                         <div className={styles.input_text_error}>{errors.email?.message}</div>
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

        //                     {/* <div className={styles.captcha_wrapper}>
        //                         <div className="g-recaptcha" data-sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}></div>
        //                         <div className={styles.input_text_error}>{notification}</div>
        //                     </div> */}

        //                     <button className={styles.form_button}>
        //                         зарегистрироваться
        //                         {!sending &&
        //                             <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        //                                 <path d="M4.05507 1.43907L17.1536 1.43888M17.1536 1.43888L17.1536 14.3511M17.1536 1.43888L1.93782 16.6546" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        //                             </svg>
        //                         }

        //                         {sending &&
        //                             <svg width="25" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><radialGradient id="a9" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)"><stop offset="0" stopColor="#000000"></stop><stop offset=".3" stopColor="#000000" stopOpacity=".9"></stop><stop offset=".6" stopColor="#000000" stopOpacity=".6"></stop><stop offset=".8" stopColor="#000000" stopOpacity=".3"></stop><stop offset="1" stopColor="#000000" stopOpacity="0"></stop></radialGradient><circle fill="none" stroke="url(#a9)" strokeWidth="15" strokeLinecap="round" strokeDasharray="200 1000" strokeDashoffset="0" cx="100" cy="100" r="70"><animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform></circle><circle fill="none" opacity=".2" stroke="#000000" strokeWidth="15" strokeLinecap="round" cx="100" cy="100" r="70"></circle></svg>
        //                         }
        //                     </button>

        //                     {error && <div className={styles.input_text_error}>{error}</div>}
        //                     {isSuccess && <div className={styles.success_message}>Регистрация успешно выполнена вы будете перенаправлены на страницу авторизации войдите в систему используя вашу электронную почту и пароль
        //                     </div>}
        //                 </form>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    //);
}