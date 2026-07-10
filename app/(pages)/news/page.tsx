import Breadcrumbs from '@/app/components/Breadcrumbs/Breadcrumbs';
import ContentPage from './ContentPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'RiftVL | Новости',
    description: 'Новости и статьи о RiftVL',
    keywords: 'Новости, статьи, RiftVL',
}; 



export default async function NewsPage() {

    return (
        <>
            <Breadcrumbs secondLabel='Новости' />
            <ContentPage />
        </>
    )
}


