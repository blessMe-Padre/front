import PaymentStatus from './PaymentStatus';

export default async function PaymentReturnPage({
    searchParams,
}: {
    searchParams: Promise<{ order?: string | string[] }>;
}) {
    const { order } = await searchParams;

    return (
        <div className="container">
            <h1>Статус оплаты</h1>
            {typeof order === 'string' && /^[a-z0-9]{1,64}$/i.test(order)
                ? <PaymentStatus orderId={order} />
                : <p>Заказ не найден.</p>}
        </div>
    );
}
