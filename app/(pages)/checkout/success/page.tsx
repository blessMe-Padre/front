import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import Image from "next/image";

import styles from './styles.module.scss';

type SuccessPageProps = {
    searchParams: Promise<{
        order?: string;
    }>;
};

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
    const { order } = await searchParams;

    return (
        <>
            <Breadcrumbs secondLink="/catalog" secondLabel='Каталог' thirdLabel='Заказ оформлен' />
            <div className="container">
                <h1 className={styles.title}>Заказ оформлен</h1>
                <div>
                <div className={styles.success_wrapper}>
                    <Image src="/icons/success.svg" alt="Заказ оформлен" width={85} height={85} />
                    <p>Благодарим за доверие нашей компании!</p>
                    <p>Ваш заказ успешно оформлен, менеджер свяжется с Вами в ближайшее время! </p>
                    {order && <p>Номер заказа: <strong>{order}</strong></p>}
                </div>
                </div>
            </div>
        </>
    );
}