

import { Metadata } from 'next';
import { StrapiSingleResponse, Dostavka } from '@/app/types/types';
import Breadcrumbs from '@/app/components/Breadcrumbs/Breadcrumbs';
import ContentPage from './ContentPage';
import fetchData from '@/app/utils/fetchData';
import styles from './style.module.scss';


const url = '/api/stranicza-dostavka-i-oplata?populate=*';
const response = await fetchData<StrapiSingleResponse<Dostavka>>(url);
const data = response?.data;

export const metadata: Metadata = {
    title: response?.data?.title ? `${response?.data?.title} | RiftVL` : 'RiftVL | Доставка и оплата',
    description: response?.data?.description ? response?.data?.description : 'Доставка и оплата в RiftVL',
    keywords: response?.data?.keywords ? response?.data?.keywords : 'Доставка и оплата, RiftVL',
    openGraph: {
        title: 'RiftVL | Доставка и оплата',
        description: 'Доставка и оплата в RiftVL',
        url: 'https://riftvl.ru/dostavka-i-oplata',
    },
};  

export default async function DostavkaIPlata() {

    return (
        <>
            <Breadcrumbs secondLabel='Доставка и оплата' />
            <ContentPage data={data} />
        </>
    );
}