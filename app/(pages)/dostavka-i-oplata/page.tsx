

import type { Metadata } from 'next';
import type { StrapiSingleResponse, Dostavka } from '@/app/types/types';
import Breadcrumbs from '@/app/components/Breadcrumbs/Breadcrumbs';
import ContentPage from './ContentPage';
import fetchData from '@/app/utils/fetchData';
const url = '/api/stranicza-dostavka-i-oplata?populate=*';

export async function generateMetadata(): Promise<Metadata> {
    const response = await fetchData<StrapiSingleResponse<Dostavka>>(url);
    const data = response.data;

    return {
        title: data.meta_title ?? 'RiftVL | Доставка и оплата',
        description: data.description ?? 'Доставка и оплата в RiftVL',
        keywords: data.keywords ?? 'Доставка и оплата, RiftVL',
        openGraph: {
            title: data.meta_title ?? 'RiftVL | Доставка и оплата',
            description: data.description ?? 'Доставка и оплата в RiftVL',
            url: 'https://riftvl.ru/dostavka-i-oplata',
        },
    };
}

export default async function DostavkaIPlata() {
    const response = await fetchData<StrapiSingleResponse<Dostavka>>(url);
    const data = response.data;

    return (
        <>
            <Breadcrumbs secondLabel={data.title ?? 'Доставка и оплата'} />
            <ContentPage data={data} />
        </>
    );
}
