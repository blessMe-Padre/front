'use client';

import { useEffect, useState } from 'react';

type PaymentStatusResult = {
    orderNumber: string;
    status: 'pending' | 'succeeded' | 'canceled';
};

export default function PaymentStatus({ orderId }: { orderId: string }) {
    const [order, setOrder] = useState<PaymentStatusResult>();
    const [message, setMessage] = useState('Проверяем статус оплаты…');
    const [resuming, setResuming] = useState(false);
    const [resumeError, setResumeError] = useState('');

    useEffect(() => {
        const controller = new AbortController();
        let timer: ReturnType<typeof setTimeout>;

        async function checkStatus() {
            try {
                const response = await fetch(`/api/payments/status/${encodeURIComponent(orderId)}`, {
                    cache: 'no-store',
                    signal: controller.signal,
                });
                if (response.status === 404) {
                    setMessage('Заказ недоступен. Откройте страницу в браузере, в котором вы оформили заказ.');
                    return;
                }
                if (!response.ok) throw new Error('Ошибка проверки статуса');
                const result: PaymentStatusResult = await response.json();
                if (controller.signal.aborted) return;
                setOrder(result);
                if (result.status === 'succeeded') {
                    setMessage('Заказ оплачен.');
                } else if (result.status === 'canceled') {
                    setMessage('Платёж отменён. Заказ не оплачен.');
                } else {
                    setMessage('Ожидаем подтверждения оплаты.');
                    timer = setTimeout(checkStatus, 5_000);
                }
            } catch {
                if (controller.signal.aborted) return;
                setMessage('Не удалось проверить статус. Повторяем запрос…');
                timer = setTimeout(checkStatus, 5_000);
            }
        }

        void checkStatus();
        return () => {
            controller.abort();
            clearTimeout(timer);
        };
    }, [orderId]);

    async function resumePayment() {
        setResuming(true);
        setResumeError('');
        try {
            const response = await fetch('/api/payments/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId }),
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.message ?? 'Не удалось открыть страницу оплаты');
            if (result.confirmationUrl) {
                window.location.assign(result.confirmationUrl);
            } else if (result.status !== 'succeeded' && result.status !== 'canceled') {
                setResumeError('Страница оплаты сейчас недоступна.');
            }
        } catch (error) {
            setResumeError(error instanceof Error ? error.message : 'Не удалось открыть страницу оплаты');
        } finally {
            setResuming(false);
        }
    }

    return (
        <div aria-live="polite">
            {order && <p>Номер заказа: <strong>{order.orderNumber}</strong></p>}
            <p>{message}</p>
            {order?.status === 'pending' && (
                <>
                    <button type="button" className="button_primary" onClick={resumePayment} disabled={resuming}>
                        {resuming ? 'Открываем оплату…' : 'Продолжить оплату'}
                    </button>
                    {resumeError && <p role="alert">{resumeError}</p>}
                </>
            )}
        </div>
    );
}
