
import Breadcrumbs from '@/app/components/Breadcrumbs/Breadcrumbs';
import CheckoutForm from '@/app/components/CheckoutForm/CheckoutForm';
import { Metadata } from 'next';

import styles from './style.module.scss';

export const metadata: Metadata = {
    title: 'RiftVL | Оформление заказа',
    description: 'Оформление заказа на RiftVL',
    keywords: 'Оформление заказа, RiftVL',
}; 

export default function Checkout() {
    return (
        <>
        <Breadcrumbs secondLink='/cart' secondLabel='Корзина' thirdLabel="Оформление заказа" />

        <div className="container">
            <h1 className={styles.title}>Оформление заказа</h1>

            <CheckoutForm />
        </div>
        </>
    );
}